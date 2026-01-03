export interface PatientRecord {
    id: string;
    name: string;
    age: number;
    gender: 'M' | 'F';
    duration_sec: number;
    chunk_count: number;
    mfcc_1: number;
    mfcc_2: number;
    mfcc_3: number;
    mfcc_4: number;
    mfcc_5: number;
    // ... representing 66 columns in simplified form for the UI
    status: number; // 0: Healthy, 1: Alzheimer's
    lastAssessment: string;
}

export const patientData: PatientRecord[] = [
    {
        id: "P-1001",
        name: "James Wilson",
        age: 72,
        gender: "M",
        duration_sec: 45.2,
        chunk_count: 12,
        mfcc_1: -250.4,
        mfcc_2: 120.1,
        mfcc_3: -15.2,
        mfcc_4: 45.6,
        mfcc_5: -5.1,
        status: 1,
        lastAssessment: "2023-06-12"
    },
    {
        id: "P-1002",
        name: "Elena Rodriguez",
        age: 68,
        gender: "F",
        duration_sec: 32.8,
        chunk_count: 8,
        mfcc_1: -180.2,
        mfcc_2: 145.5,
        mfcc_3: 10.1,
        mfcc_4: 38.2,
        mfcc_5: 2.4,
        status: 0,
        lastAssessment: "2023-06-10"
    },
    {
        id: "P-1003",
        name: "Robert Chang",
        age: 75,
        gender: "M",
        duration_sec: 58.4,
        chunk_count: 18,
        mfcc_1: -310.8,
        mfcc_2: 105.2,
        mfcc_3: -22.4,
        mfcc_4: 52.1,
        mfcc_5: -12.8,
        status: 1,
        lastAssessment: "2023-06-08"
    },
    {
        id: "P-1004",
        name: "Margaret Smith",
        age: 81,
        gender: "F",
        duration_sec: 28.5,
        chunk_count: 6,
        mfcc_1: -165.1,
        mfcc_2: 152.3,
        mfcc_3: 15.6,
        mfcc_4: 32.8,
        mfcc_5: 8.2,
        status: 0,
        lastAssessment: "2023-06-05"
    }
];
