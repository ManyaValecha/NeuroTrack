import React, { createContext, useContext, useState } from 'react';

export interface CRIRecord {
    score: number;
    date: string;
    assessmentId?: string;
}

export interface UserData {
    name: string;
    age: number;
    gender: string;
    id: string;
    role: 'admin' | 'user';
    criHistory: CRIRecord[];
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData) => void;
    clearUser: () => void;
    addCRIRecord: (score: number) => void;
    getCurrentCRI: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<UserData | null>(() => {
        const saved = localStorage.getItem('neurotrack_user');
        return saved ? JSON.parse(saved) : null;
    });

    const setUser = (userData: UserData) => {
        setUserState(userData);
        localStorage.setItem('neurotrack_user', JSON.stringify(userData));
    };

    const clearUser = () => {
        setUserState(null);
        localStorage.removeItem('neurotrack_user');
    };

    const addCRIRecord = (score: number) => {
        if (!user) return;

        const newRecord: CRIRecord = {
            score,
            date: new Date().toISOString().split('T')[0],
            assessmentId: `ASS-${Date.now()}`
        };

        const updatedUser = {
            ...user,
            criHistory: [...(user.criHistory || []), newRecord]
        };

        setUser(updatedUser);
    };

    const getCurrentCRI = (): number => {
        if (!user || !user.criHistory || user.criHistory.length === 0) {
            return 0; // Default for new users
        }
        // Return the most recent CRI score
        return user.criHistory[user.criHistory.length - 1].score;
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, addCRIRecord, getCurrentCRI }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

// Helper function to calculate CRI from assessment data
export function calculateCRI(status: number, duration: number, chunkCount: number): number {
    // CRI Score Formula (0-100, lower is better):
    // - status (0 or 1) heavily impacts score
    // - longer duration slightly increases risk
    // - more chunks indicates hesitation/pauses
    const baseScore = status * 50; // 0 for healthy, 50 for positive
    const durationFactor = Math.min((duration / 60) * 10, 20); // up to 20 points
    const chunkFactor = Math.min(chunkCount * 1.5, 30); // up to 30 points

    const totalScore = baseScore + durationFactor + chunkFactor;
    return Math.round(Math.min(totalScore, 100)); // Cap at 100
}
