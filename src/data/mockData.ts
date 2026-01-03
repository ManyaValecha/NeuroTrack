export const MOCK_USER = {
    name: "Sarah Chen",
    age: 64,
    baselineDate: "2023-01-15",
    totalAssessments: 42,
};

// Azure Cognitive Services Analysis Simulation
export const CRI_HISTORY = [
    { date: 'Jan', score: 12, status: 'Healthy' },
    { date: 'Feb', score: 14, status: 'Healthy' },
    { date: 'Mar', score: 13, status: 'Healthy' },
    { date: 'Apr', score: 18, status: 'Monitoring' },
    { date: 'May', score: 24, status: 'Elevated Risk' },
    { date: 'Jun', score: 32, status: 'Warning' },
];

export const RECENT_ACTIVITY = [
    { id: 1, type: 'assessment', date: '2023-06-12', result: 'Elevated (32)', delta: '+8%' },
    { id: 2, type: 'intervention', date: '2023-06-10', result: 'Completed Memory Game', delta: null },
    { id: 3, type: 'assessment', date: '2023-05-28', result: 'Moderate (24)', delta: '+6%' },
];

export const RISK_FACTORS = [
    { name: 'Speech Rate', value: 85, fullMark: 100, label: 'Slower than baseline' },
    { name: 'Pause Duration', value: 45, fullMark: 100, label: 'Increased frequency' },
    { name: 'Vocab Richness', value: 92, fullMark: 100, label: 'Stable' },
    { name: 'Semantic Density', value: 78, fullMark: 100, label: 'Slight decline' },
    { name: 'Phonation Time', value: 65, fullMark: 100, label: 'Reduced' },
];
