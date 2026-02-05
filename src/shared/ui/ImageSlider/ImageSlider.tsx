"use client";

import { useState } from "react";
import s from "./ImageSlider.module.scss";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

type MockPostImages = {
  id: number;
  postImage: string | StaticImageData;
};

type Props = {
  slides: MockPostImages[];
};

export const ImageSlider = ({ slides }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Полная валидация слайдов
  const validSlides = slides.filter(slide => {
    if (!slide || typeof slide !== "object") return false;
    if (!slide.postImage) return false;

    //Если postImage - строка (URL)
    if (typeof slide.postImage === "string") {
      return slide.postImage.trim() !== "";
    }

    const hasSrc = "src" in slide.postImage && slide.postImage.src;
    const hasWidth = "width" in slide.postImage;
    const hasHeight = "height" in slide.postImage;

    // Проверяем основные свойства StaticImageData
    if (hasSrc && hasWidth && hasHeight) {
      // Дополнительная проверка типа src
      return typeof slide.postImage.src === "string" && slide.postImage.src.trim() !== "";
    }

    return false;
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
  const hasMultipleImages = validSlides.length > 1;

  const goToPreviousHandler = () => setCurrentIndex(prev => (prev === 0 ? validSlides.length - 1 : prev - 1));
  const goToNextHandler = () => setCurrentIndex(prev => (prev === validSlides.length - 1 ? 0 : prev + 1));

  const goToSlideHandler = (slideIndex: number) => setCurrentIndex(slideIndex);

  return (
    <div className={s.imageContainer}>
      <div className={s.slider}>
        {/* Непосредственно изображение */}
        <Image
          fill
          sizes="240px"
          className={s.slide}
          src={validSlides[currentIndex].postImage}
          alt={`Slide ${currentIndex + 1}`}
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
              {validSlides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
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
