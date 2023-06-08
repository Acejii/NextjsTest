'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import './navbar.scss';

import { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        'Homepage',
        'Homepage',
        <span className='item-icon'>
            <Image
                src='/assets/images/home.svg'
                alt='home'
                width={100}
                height={100}
                style={{ width: 'auto', height: 'auto' }}
            />
        </span>,
        [
            getItem('Dashboard', '/main/home/dashboard'),
            getItem('Calendar', '/main/home/calendar'),
            getItem('Pending task', '/main/home/pendingtask'),
        ]
    ),
    getItem(
        'Property',
        'Property',
        <span className='item-icon'>
            <Image
                src='/assets/images/search.svg'
                alt='search'
                width={100}
                height={100}
                style={{ width: '100%', height: 'auto' }}
            />
        </span>,
        [
            getItem('Search property', '/main/property/search'),
            getItem('Save Search', '/main/property/save'),
            getItem('Add property', '/main/property/add'),
            getItem('Own property', '/main/property/own'),
        ]
    ),
    getItem(
        'Contact',
        'Contact',
        <span className='item-icon'>
            <Image
                src='/assets/images/profile.svg'
                alt='profile'
                width={100}
                height={100}
                style={{ width: '100%', height: 'auto' }}
            />
        </span>,
        [getItem('Search contact', 'main/contact/search'), getItem('Segments', 'main/contact/segment')]
    ),
];

interface NavbarProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

const NavBar = (props: NavbarProps) => {
    const { collapsed, toggleCollapsed } = props;

    const pathname = usePathname();

    const [selectedKey, setSelectedKey] = useState<string>((pathname === '/' || pathname === '/main/home') ? 'main/property/search' : pathname);

    const router = useRouter();
    const handleSelectMenuItem = (e: MenuItem) => {
        if (e) {
            router.push(e.key as string);
        }
    };

    return (
        <>
            <div className='navbar-logo'>
                <Link href='/'>
                    <Image
                        src={collapsed ? '/assets/images/logo.svg' : '/assets/images/expanse-logo.svg'}
                        alt='logo'
                        width={100}
                        height={100}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>
            </div>

            <Menu
                defaultSelectedKeys={[selectedKey]}
                mode='inline'
                inlineCollapsed={collapsed}
                items={items}
                className='menu-wrapper'
                onSelect={handleSelectMenuItem}
                getPopupContainer={node => node.parentNode as HTMLElement}
            />

            <div className='auth-wrapper collapse'>
                <Link
                    href='/profile'
                    className='account-info'
                >
                    <div className='avatar'>
                        <Image
                            src='/assets/images/avatar.svg'
                            alt='avatar'
                            width={100}
                            height={100}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className='info'>
                        <div className='name'>Hoang Thu</div>
                        <div className='email'>thu.hoang@codeforcevina.com</div>
                    </div>
                </Link>
                <Link
                    href='/auth/login'
                    className='log-out'
                >
                    <Image
                        src='/assets/images/logout.svg'
                        alt='logout'
                        width={100}
                        height={100}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>
            </div>

            <div
                className='collapse-icon'
                onClick={toggleCollapsed}
            >
                <Image
                    src={collapsed ? '/assets/images/arrow-right.svg' : '/assets/images/arrow-left.svg'}
                    alt='collapse'
                    width={100}
                    height={100}
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
        </>
    );
};

export default NavBar;
