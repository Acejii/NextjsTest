import { useState } from 'react';
import Image from 'next/image';
import './thumbSlider.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

interface Props {
    photos: string[];
    imgIndex: number;
}

const ThumbSlider = (props: Props) => {
    const { photos, imgIndex } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className='thumb-slider-wrapper'>
            <Swiper
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className='main-slider'
                loop={true}
                initialSlide={imgIndex}
            >
                {photos && photos.length > 0 ? (
                    photos.map(photo => (
                        <SwiperSlide id={photo}>
                            <div className='image-wrapper'>
                                <Image
                                    src={photo.replace('w400', 'w800')}
                                    alt='callery'
                                    fill={true}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className='image-wrapper'>
                            <Image
                                src='/assets/images/home.svg'
                                alt='noImage'
                                width={100}
                                height={100}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`thumb-slider ${photos.length < 8 ? 'center' : ''}`}
            >
                {photos && photos.length > 0 ? (
                    photos.map(photo => (
                        <SwiperSlide id={photo}>
                            <div className='thumb-image-wrapper'>
                                <Image
                                    src={photo}
                                    alt='callery'
                                    width={100}
                                    height={100}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className='thumb-image-wrapper'>
                            <Image
                                src='https://resource.resales-online.com/images/property-default.jpg'
                                alt='noImage'
                                width={100}
                                height={100}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default ThumbSlider;
