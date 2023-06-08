import React from 'react';
import './loading.scss';
import Image from 'next/image';

const Loading = () => {
    return (
        <div className='loading-wrapper'>
            <div className='loading-icon'>
                <Image
                    src="/assets/images/loading.gif"
                    alt='loading'
                    width={100}
                    height={100}
                    style={{width: 'auto', height: 'auto'}}
                />
            </div>
        </div>
    );
};

export default Loading;
