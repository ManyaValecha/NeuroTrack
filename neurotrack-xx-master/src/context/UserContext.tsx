import React, { createContext, useContext, useState } from 'react';

export interface UserData {
    name: string;
    age: number;
    gender: string;
    id: string;
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData) => void;
    clearUser: () => void;
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

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
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
