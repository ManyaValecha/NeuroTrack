


# 🧠 NeuroTrack X

### **Next-Gen Clinical Workstation for Early Cognitive Risk Detection**

*Built for the AI for Bharat Hackathon* 


---

## 🔗  Repository

- **💻 GitHub Repository:** [github.com/ManyaValecha/NeuroTrack](https://github.com/ManyaValecha/NeuroTrack)

---
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 24 AM" src="https://github.com/user-attachments/assets/e8dacdf0-f8a6-48de-b070-7cfe8d5b02e0" />
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 34 AM" src="https://github.com/user-attachments/assets/d718d84e-a2c5-46bc-952b-396002a6339a" />
<img width="1710" height="1107<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 29 55 AM" src="https://github.com/user-attachments/assets/f1a4fb2f-ebcc-4e64-ab4e-a7d36ec9b020" />
" alt="Screenshot 2026-01-07 at 11 29 42 AM" src="https://github.com/user-attachments/assets/d4b7eefa-f52b-4415-af1a-1f0388fde6cc" />
<img width="1710" height="1107" alt="Screenshot 2026-01-07 at 11 50 05 AM" src="https://github.com/user-attachments/assets/3daf2bfc-b5ae-408a-8c24-6d70c3941bb0" />
DEMO VIDEO - 
https://youtu.be/UmNk-j0OPgQ?si=pVNCvKTdhk9tN1mN


## 🌟 Vision

Cognitive decline develops gradually, yet most diagnoses occur only after irreversible damage. Traditional screening methods are episodic, invasive, and difficult to scale.

**NeuroTrack X** leverages ** AWS AI** to detect early cognitive risk through **speech-based biomarkers**, enabling proactive, continuous, and non-invasive screening. By analyzing subtle changes in language, acoustics, and prosody, NeuroTrack X supports earlier clinical intervention and long-term patient monitoring.

---

## 🚀 Key Features

### 💎 Clinical-Grade UI/UX

NeuroTrack X is designed as a modern **Clinical Heads-Up Display (HUD)** optimized for neurologists, psychiatrists, and researchers:

* **Neural Visualizer**: Real-time audio frequency visualization using HTML5 Canvas
* **Live Neural Stream**: Dynamic background simulating continuous patient telemetry
* **Motion Orchestration**: Smooth page transitions and micro-interactions using Framer Motion
* **AI Assistant**: Integrated Floating Chatbot powered by **Amazon Bedrock (Claude 3.5 Sonnet** for instant clinical support.

---

### 🤖 AWS-Native Intelligence

The platform is built end-to-end on Amazon AWS, ensuring scalability, reliability, and enterprise-grade security:
Amazon Bedrock (Claude 3.5 Sonnet): Extracts linguistic and semantic biomarkers from speech
Amazon Transcribe: Neural-quality transcription and acoustic feature analysis
Amazon SageMaker: Real-time cognitive risk classification via managed endpoints
Amazon S3 + DynamoDB: Secure storage for longitudinal patient data and session metadata
AWS Amplify / Elastic Beanstalk: High-performance hosting for the clinical dashboard

---

## 🏗️ System Architecture

graph TD
    User((Clinician)) --> Dashboard[HUD Dashboard]
    Dashboard --> Assessment[Neural Assessment]

    subgraph AWS Cloud
        Assessment --> Transcribe[Amazon Transcribe]
        Transcribe --> Bedrock[Amazon Bedrock (Claude 3.5 Sonnet)]
        Bedrock --> SageMaker[Amazon SageMaker]
        SageMaker --> Storage[(Amazon S3 + DynamoDB)]
    end

    Storage --> Dashboard
    Bedrock --> Analytics[Clinical Analytics]
---

## 🛠️ Technical Stack

* **Framework**: React 19 + Vite
* **Styling**: TailwindCSS 4.0 (Glassmorphism, Neon Clinical Theme)
* **Animation**: Framer Motion
* **Charts**: Recharts
* **State Management**: React Context API
AI Services: Amazon Bedrock (Claude 3.5 Sonnet), Amazon Transcribe, Amazon SageMaker
Storage: Amazon S3 + DynamoDB
Deployment: AWS Amplify / Elastic Beanstalk (CI/CD via GitHub Actions)
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

Node.js v20+
AWS account with access to:
Amazon Bedrock
Amazon Transcribe
Amazon SageMaker
Amazon S3 and DynamoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ManyaValecha/NeuroTrack.git
   cd NeuroTrack
   ```

2. **Configure environment variables**
  # Amazon Bedrock
VITE_AWS_BEDROCK_KEY=your_key
VITE_AWS_BEDROCK_REGION=your_region
VITE_AWS_BEDROCK_MODEL=claude-3.5-sonnet

# Amazon Transcribe
VITE_AWS_TRANSCRIBE_KEY=your_key
VITE_AWS_TRANSCRIBE_REGION=your_region

# Amazon SageMaker
VITE_AWS_SAGEMAKER_ENDPOINT=your_endpoint

# AWS Storage / DynamoDB (if needed)
VITE_AWS_S3_BUCKET=your_bucket_name
VITE_AWS_DYNAMODB_TABLE=your_table_name
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
