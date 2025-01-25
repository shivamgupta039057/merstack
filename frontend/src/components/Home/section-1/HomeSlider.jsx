import React, { Suspense, useMemo } from 'react';
import { getAPIAuth } from '../../../apiservices/ApiServies';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import SpinnerLoading from '../../../utils/SpinnerLoding';
import { API_GET_BANNER } from '../../../utils/APIConstant';

function HomeSlider() {
    const { data: bannerData, isLoading, isError } = useQuery({
        queryKey: ["banner-images"],
        queryFn: () => getAPIAuth(API_GET_BANNER),
        staleTime: 5 * 60 * 1000,
    });

    const autoplaySettings = useMemo(() => ({
        delay: 1000,
        disableOnInteraction: false,
    }), []);

    if(isLoading) return <SpinnerLoading />
    if (isError) return <div> Error loading banners </div>;

    return (
        bannerData?.data?.data?.length > 0 ? (
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                autoplay={autoplaySettings}
                modules={[Autoplay]}
            >
                {bannerData.data.data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-banner">
                            <img src={item.images} alt={`Banner ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        ) : (
            <div>No banners available</div>
        )
    );
}

export default HomeSlider;
