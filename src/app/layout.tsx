import React from 'react';
import '../../public/antd.min.css';
import '@/styles/globals.scss';
import {StateProvider} from '@/redux/provider';

const metadata = {
    title: 'PropQ',
    description: 'Real Estate',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <StateProvider>{children}</StateProvider>
            </body>
        </html>
    );
};

export default RootLayout;
