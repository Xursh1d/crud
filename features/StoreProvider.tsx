"use client"
import { store } from '@/features/store';
import { Provider } from 'react-redux';

interface IStoreProviderProps {
    children: React.ReactNode
}
export default function StoreProvider({ children }: IStoreProviderProps) {
    return <Provider store={store}>{children}</Provider>
}