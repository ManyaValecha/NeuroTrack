
---

# 🧠 NeuroTrack X

### **Next-Gen Clinical Workstation for Early Cognitive Risk Detection**

*Built for the Microsoft Imagine Cup*

[![Azure OpenAI](https://img.shields.io/badge/Azure-OpenAI-blue?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/services/cognitive-services/openai-service/)
[![Azure Machine Learning](https://img.shields.io/badge/Azure-ML-0078D4?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/services/machine-learning/)
[![Azure Speech](https://img.shields.io/badge/Azure-Speech-blue?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/)
[![Deployed on Azure](https://img.shields.io/badge/Deployment-Live-success?logo=microsoftazure&logoColor=white)](https://neurotrackx-ahhyd7hfbrerd5cu.southeastasia-01.azurewebsites.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🔗 Live Demo & Repository

- **🚀 Live Deployment:** [Click here to launch NeuroTrack X](https://neurotrackx-ahhyd7hfbrerd5cu.southeastasia-01.azurewebsites.net/)
- **💻 GitHub Repository:** [github.com/ManyaValecha/NeuroTrack](https://github.com/ManyaValecha/NeuroTrack)

---
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 24 AM" src="https://github.com/user-attachments/assets/e8dacdf0-f8a6-48de-b070-7cfe8d5b02e0" />
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 34 AM" src="https://github.com/user-attachments/assets/d718d84e-a2c5-46bc-952b-396002a6339a" />
<img width="1710" height="1107<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 55 AM" src="https://github.com/user-attachments/assets/f1a4fb2f-ebcc-4e64-ab4e-a7d36ec9b020" />
" alt="Screenshot 2026-01-07 at 11 29 42 AM" src="https://github.com/user-attachments/assets/d4b7eefa-f52b-4415-af1a-1f0388fde6cc" />
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 50 05 AM" src="https://github.com/user-attachments/assets/3daf2bfc-b5ae-408a-8c24-6d70c3941bb0" />
https://youtu.be/UmNk-j0OPgQ?si=pVNCvKTdhk9tN1mN
## 🌟 Vision

Cognitive decline develops gradually, yet most diagnoses occur only after irreversible damage. Traditional screening methods are episodic, invasive, and difficult to scale.

**NeuroTrack X** leverages **Microsoft Azure AI** to detect early cognitive risk through **speech-based biomarkers**, enabling proactive, continuous, and non-invasive screening. By analyzing subtle changes in language, acoustics, and prosody, NeuroTrack X supports earlier clinical intervention and long-term patient monitoring.

---

## 🚀 Key Features

### 💎 Clinical-Grade UI/UX

NeuroTrack X is designed as a modern **Clinical Heads-Up Display (HUD)** optimized for neurologists, psychiatrists, and researchers:

* **Neural Visualizer**: Real-time audio frequency visualization using HTML5 Canvas
* **Live Neural Stream**: Dynamic background simulating continuous patient telemetry
* **Motion Orchestration**: Smooth page transitions and micro-interactions using Framer Motion
* **AI Assistant**: Integrated Floating Chatbot powered by **Azure OpenAI** & **Google Gemini** for instant clinical support.

---

### 🤖 Azure-Native Intelligence

The platform is built end-to-end on **Microsoft Azure**, ensuring scalability, reliability, and enterprise-grade security:

* **Azure OpenAI (GPT-4o)**: Extracts linguistic and semantic biomarkers from speech
* **Azure Speech SDK**: Neural-quality transcription and acoustic feature analysis
* **Azure Machine Learning**: Real-time cognitive risk classification via managed endpoints
* **Azure Data Lake Gen2**: Secure storage for longitudinal patient data
* **Azure App Service**: High-performance hosting for the clinical dashboard

---

## 🏗️ System Architecture

```mermaid
graph TD
    User((Clinician)) --> Dashboard[HUD Dashboard]
    Dashboard --> Assessment[Neural Assessment]

    subgraph Azure Cloud
        Assessment --> SpeechSDK[Azure Speech Services]
        SpeechSDK --> AOAI[Azure OpenAI GPT-4o]
        AOAI --> AML[Azure Machine Learning]
        AML --> ADLS[(Azure Data Lake Gen2)]
    end

    ADLS --> Dashboard
    AOAI --> Analytics[Clinical Analytics]
```

---

## 🛠️ Technical Stack

* **Framework**: React 19 + Vite
* **Styling**: TailwindCSS 4.0 (Glassmorphism, Neon Clinical Theme)
* **Animation**: Framer Motion
* **Charts**: Recharts
* **State Management**: React Context API
* **AI Services**: Azure OpenAI, Azure Speech, Azure Machine Learning, Google Gemini
* **Storage**: Azure Data Lake Gen2
* **Deployment**: Azure App Service (CI/CD via GitHub Actions)

---

## 💼 Business Model

### 🏥 B2B SaaS for Healthcare Providers

NeuroTrack X is offered as a **subscription-based SaaS platform** to hospitals, clinics, and telehealth providers.

* Pricing based on clinician seats or patient volume
* Enterprise plans for hospital networks and research institutions
* Enables scalable cognitive screening with minimal operational overhead

---

### 🧪 Licensing for Research & Pharma

* Licensing anonymized, aggregated speech biomarkers
* Cognitive monitoring for clinical trials
* Longitudinal digital endpoints for neurodegenerative research

---

### 🏛️ Public Health & Institutional Partnerships

* Population-level cognitive screening programs
* Government and NGO healthcare initiatives
* Remote access for underserved and aging populations

---

## 💻 Getting Started

### Prerequisites

* Node.js v20+
* Azure subscription with:
  * Azure OpenAI
  * Azure Speech Services
  * Azure Machine Learning

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ManyaValecha/NeuroTrack.git
   cd NeuroTrack
   ```

2. **Configure environment variables**
   Create a `.env` file in the root directory (see `.env.example`):

   ```bash
   VITE_AZURE_OPENAI_KEY=your_key
   VITE_AZURE_OPENAI_ENDPOINT=your_endpoint
   VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4o

   VITE_AZURE_SPEECH_KEY=your_key
   VITE_AZURE_SPEECH_REGION=your_region
   
   VITE_GEMINI_API_KEY=your_gemini_key
   ```

3. **Install dependencies and run**

   ```bash
   npm install
   npm run dev
   ```

---

## 🛤️ Future Roadmap

* Multimodal analysis (speech + facial micro-expressions)
* Federated learning across clinical institutions
* Mobile clinician companion for real-time alerts
* Regulatory readiness (HIPAA, GDPR alignment)

---

## 📜 License

MIT License © 2026 NeuroTrack X

---

*Proudly developed for the **Microsoft Imagine Cup**.
Advancing early detection through responsible, scalable AI.*
