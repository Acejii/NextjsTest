import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slider.scss';
// import required modules
import { Pagination, Navigation } from 'swiper';

interface Props {
    photos: string[];
    onClickImage: (index: number) => void;
}

const Slider = ({ photos, onClickImage }: Props) => {
    return (
        <Swiper
            pagination={{
                type: 'custom',
                renderCustom: (_: any, current: any, total: any) => {
                    return ReactDOMServer.renderToStaticMarkup(
                        <div className='fraction-wrapper'>
                            <div className='fraction-number'>{current + '/' + total}</div>
                            <div className='fraction-icon'>
                                <Image
                                    src='/assets/images/gallery.png'
                                    alt='gallery'
                                    width={100}
                                    height={100}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </div>
                        </div>
                    );
                },
            }}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='img-slider'
        >
            {photos && photos.length > 0 ? (
                photos.map((photo, index) => {
                    return (
                        <SwiperSlide key={photo}>
                            <Image
                                src={photo}
                                alt='slider'
                                // width={100}
                                // height={100}
                                fill={true}
                                // style={{ width: '100%', height: '100%' }}
                                onClick={() => onClickImage(index)}
                            />
                        </SwiperSlide>
                    );
                })
            ) : (
                <SwiperSlide>
                    <Image
                        src='https://resource.resales-online.com/images/property-default.jpg'
                        alt='noImage'
                        // width={100}
                        // height={100}
                        fill={true}
                    />
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default Slider;
