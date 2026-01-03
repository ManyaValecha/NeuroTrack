import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import OpenAI from 'openai';

const speechKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
const speechRegion = import.meta.env.VITE_AZURE_SPEECH_REGION;
const openaiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
const openaiEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;

export const isAzureConfigured = () => {
    return !!(speechKey && speechRegion && openaiKey && openaiEndpoint);
};

export const startAzureTranscription = (onResult: (text: string) => void, onError: (error: string) => void) => {
    if (!speechKey || !speechRegion) {
        onError("Speech keys not configured");
        return null;
    }

    try {
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
        speechConfig.speechRecognitionLanguage = "en-US";

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognized = (_, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                onResult(e.result.text);
            }
        };

        recognizer.startContinuousRecognitionAsync(
            () => console.log("Transcription started"),
            (err) => {
                console.error("Transcription error:", err);
                onError(err);
            }
        );
        return recognizer;
    } catch (err: any) {
        onError(err.message || "Failed to initialize Speech SDK");
        return null;
    }
};

export const getAIInsights = async (transcript: string) => {
    if (!openaiKey || !openaiEndpoint) {
        throw new Error("OpenAI keys not configured");
    }

    // Clean endpoint to avoid double slashes
    const cleanEndpoint = openaiEndpoint.endsWith('/') ? openaiEndpoint.slice(0, -1) : openaiEndpoint;

    const deploymentName = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    const client = new OpenAI({
        apiKey: openaiKey,
        baseURL: `${cleanEndpoint}/openai/deployments/${deploymentName}`,
        defaultQuery: { 'api-version': '2024-08-01-preview' },
        defaultHeaders: { 'api-key': openaiKey },
        dangerouslyAllowBrowser: true // Required for client-side usage
    });

    const response = await client.chat.completions.create({
        model: deploymentName,
        messages: [
            { role: 'system', content: 'You are a clinical AI assistant for NeuroTrack X. Analyze the following transcript for cognitive risk factors like speech rate, pauses, and vocabulary complexity. Return a concise clinical summary.' },
            { role: 'user', content: transcript }
        ]
    });

    return response.choices[0].message.content;
};

export const callAzureMLPrediction = async (features: Record<string, number>) => {
    const amlUrl = import.meta.env.VITE_AZURE_ML_URL;
    const amlKey = import.meta.env.VITE_AZURE_ML_KEY;

    // Check if URL is valid REST endpoint (should not be a portal link)
    const isRestEndpoint = amlUrl && amlUrl.startsWith('http') && !amlUrl.includes('ml.azure.com');

    if (!isRestEndpoint || !amlKey) {
        console.warn("Azure ML REST endpoint not configured. Using heuristic simulation.");
        // Simulated clinical logic: faster chunking/duration usually indicates higher risk in cognitive tests
        return (features.chunk_count > 12 || features.duration_sec > 45) ? 1 : 0;
    }

    try {
        const response = await fetch(amlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${amlKey}`
            },
            body: JSON.stringify({
                data: [features]
            })
        });

        const result = await response.json();
        // Handle typical AML response formats
        return result.prediction?.[0] ?? result[0] ?? 0;
    } catch (error) {
        console.error("Azure ML Prediction failed:", error);
        return 0;
    }
};
