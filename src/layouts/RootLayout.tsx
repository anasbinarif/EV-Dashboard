import { ReactNode } from 'react';
import { Navbar } from '@features/index';

interface RootLayoutProps {
    children: ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-gray-200">
        <Navbar />

        <main className="flex-1 p-8">
            {children}
        </main>
    </div>
);

export default RootLayout;
