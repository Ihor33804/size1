import React from 'react';
import Slider from "react-slick";
import styles from './styles/index.module.scss';

import { APPLE_IPHONE, AIRPODS, PRODUCT, OZON_CARD, } from "../../styles/images";

const MobileSlider = () => {


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 0,
        arrows: false,
    responsive: [
    {
       breakpoint: 992,
        settings: {
            centerMode: true,
            centerPadding: '150px',
            slidesToShow: 2,
            arrows: true,
            initialSlide: 2,
            
        }
    },
    {
        breakpoint: 900,
         settings: {
             centerMode: true,
             centerPadding: '130px',
             slidesToShow: 2,
             arrows: true,
             initialSlide: 2,
         }
     },
    {
      breakpoint: 767,
      settings: {
        centerMode: true,
        centerPadding: '190px',
        slidesToShow: 1,
        arrows: true,
        initialSlide: 0,
        }
    },
    {
        breakpoint: 667,
        settings: {
          centerMode: true,
          centerPadding: '150px',
          slidesToShow: 1,
          arrows: true,
       }
      },
    {
      breakpoint: 568,
      settings: {
        centerMode: true,
        centerPadding: '120px',
        slidesToShow: 1,
        arrows: true,
     }
    },
    {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 1,
           arrows: true,
       }
      },
      {
        breakpoint: 380,
        settings: {
          centerMode: true,
          centerPadding: '80px',
          slidesToShow: 1,
           arrows: true,
       }
      }
  ]
    };

    return (
    
        <div className={styles["products-mobile-slider"]} >
            <Slider {...settings} >
                <div>
                    <img src={APPLE_IPHONE} className={styles["item-image"]} alt="iphone"/> 
                    <div className={styles["item-title"]}>Apple iPhone XS64G </div>
                    <div className={styles["item-friends"]}>10 друзей </div>
                </div>
                <div>
                     <img src={AIRPODS} className={styles["item-image"]} alt="airpods"/> 
                    <div className={styles["item-title"]}>AirPods </div>
                    <div className={styles["item-friends"]}>7-9 друзей </div>
                </div>
                <div>
                     <img src={PRODUCT} className={styles["item-image"]} alt="yandex station"/> 
                    <div className={styles["item-title"]}>Яндекс.Станция </div>
                    <div className={styles["item-friends"]}>4-6 друзей </div>
                </div>
                <div>
                    <img src={OZON_CARD} className={styles["item-image"]} alt="iphone"/> 
                    <div className={styles["item-title"]}>сертификат Ozon </div>
                    <div className={styles["item-friends"]}>1-3 друга </div>
                </div>
               
            </Slider>

        </div>
       
        
    );

}

export default MobileSlider;

