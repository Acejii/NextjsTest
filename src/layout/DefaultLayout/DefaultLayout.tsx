'use client';

import React, { useState, useRef, Suspense } from 'react';
import './defaultLayout.scss';

import NavBar from '@/components/NavBar/Navbar';
import Header from '@/components/Header/Header';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(true);
    const navbarRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        navbarRef.current?.classList.toggle('collapse');
        mainRef.current?.classList.toggle('collapse');
    };
    return (
        <div className='default-layout'>
            <div
                className='navbar collapse'
                ref={navbarRef}
            >
                <Suspense>
                    <NavBar
                        collapsed={collapsed}
                        toggleCollapsed={toggleCollapsed}
                    />
                </Suspense>
            </div>
            <div
                className='main collapse'
                ref={mainRef}
            >
                <div className='header'>
                    <Suspense>
                        <Header />
                    </Suspense>
                </div>
                <div className='content'>
                    <Suspense>{children}</Suspense>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
