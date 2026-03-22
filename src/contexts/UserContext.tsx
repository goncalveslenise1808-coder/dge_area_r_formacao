'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserProfile = 'jovem' | 'empresa' | 'entidade';

interface User {
  id: string;
  name: string;
  email: string;
  profile: UserProfile;
  nif?: string;
  phone?: string;
  instagram?: string;
  csu?: string;
  habilitacoes?: Array<{
    curso: string;
    grau: string;
    media: number;
    ano: number;
    certificado?: string;
  }>;
}

interface UserContextType {
  user: User | null;
  switchProfile: (profile: UserProfile) => void;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    profile: 'jovem',
    nif: '123456789',
    phone: '912345678',
    instagram: '@joaosilva',
    csu: 'CSU123456',
    habilitacoes: [
      {
        curso: 'Ensino Secundário',
        grau: '12º ano',
        media: 14.5,
        ano: 2023,
        certificado: 'certificado_secundario.pdf'
      }
    ]
  });

  const switchProfile = (profile: UserProfile) => {
    if (user) {
      setUser({ ...user, profile });
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <UserContext.Provider value={{ user, switchProfile, updateUser }}>
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