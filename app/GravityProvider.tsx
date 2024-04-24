"use client"
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import { ReactNode } from 'react';

interface IGravityProviderProps {
    children: ReactNode
}
export default function GravityProvider({ children }: IGravityProviderProps) {
    return (
        <ThemeProvider>
            <ToasterProvider>
                {children}
                <ToasterComponent className="optional additional classes" />
            </ToasterProvider>
        </ThemeProvider>
    )
}
