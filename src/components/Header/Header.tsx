import React from 'react';
import './header.scss';

const Header: React.FC = () => {
    return (
        <div className='header-wrapper'>
            <div className='header-title'>Search</div>
            <div className='header-tools'>
                <div className='search-all'>Input</div>
                <div className='help'>Help</div>
                <div className='language'>Language</div>
            </div>
        </div>
    );
};

export default Header;
