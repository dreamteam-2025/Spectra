"use client";

import { useState } from "react";
import s from "./ImageSlider.module.scss";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  slides: Record<"url", string>[];
};

export const ImageSlider = ({ slides = [] }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Полная валидация слайдов
  const validSlides = slides.filter(slide => {
    if (!slide || typeof slide !== "object") return false;
    if (!slide.url || typeof slide.url !== "string") return false;
    return slide.url.trim() !== "";
  });

  // Если нет валидных слайдов или ошибка загрузки
  if (!validSlides.length || hasError) {
    return (
      <div className={clsx(s.imageContainer, s.empty)}>
        <Image src="icons/image-outline.svg" alt="no image" width={48} height={48} />
        <p>{hasError ? "Image failed to load" : "No image"}</p>
      </div>
    );
  }

  // Если больше 1 фото
  const hasMultipleImages = slides.length > 1;

  const goToPreviousHandler = () => setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNextHandler = () => setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));

  const goToSlideHandler = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={s.imageContainer}>
      <div className={s.slider}>
        {/* Непосредственно изображение */}
        <div
          className={s.slide}
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          role="img"
          aria-label={`Slide ${currentIndex + 1} of ${validSlides.length}`}
        />

        {/* Условный рендеринг: отрисовка кнопок "пролистывания" фотографий, если загружено > 1 фото*/}
        {hasMultipleImages && (
          <>
            {/* Кнопки "перелистывания" изображений */}
            <button type="button" className={s.left} onClick={goToPreviousHandler} aria-label="Previous slide">
              <img src={"icons/arrow-ios-back-outline.svg"} alt="previous" />
            </button>
            <button type="button" className={s.right} onClick={goToNextHandler} aria-label="Next slide">
              <img src={"icons/arrow-ios-forward.svg"} alt="next" />
            </button>
            {/* "Точки" для переключения на конкретное изображение из серии */}
            <div className={s.dotsContainer}>
              {validSlides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  className={clsx(s.dot, slideIndex === currentIndex && s.active)}
                  onClick={() => goToSlideHandler(slideIndex)}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                  aria-current={slideIndex === currentIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
