"use client";

import { useState } from "react";
import s from "./ImageSlider.module.scss";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

type PostImages = {
  id: number;
  postImage: string | StaticImageData;
};

type Props = {
  slides: PostImages[];
  variant?: "small" | "big";
};

export const ImageSlider = ({ slides, variant = "small" }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [hasError, setHasError] = useState(false);

  // Сброс ошибки при смене слайда
  // useEffect(() => {
  //   setHasError(false);
  // }, [currentIndex]);

  // Полная валидация слайдов
  const validSlides = slides.filter(slide => {
    if (!slide || typeof slide !== "object" || !slide.postImage) return false;

    // Если postImage - строка (URL)
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

  // Обработка ошибок
  // Если нет валидных слайдов
  if (!validSlides.length) {
    return (
      <div className={clsx(s.imageContainer, s[variant])}>
        <div className={s.empty}>
          <Image src="/icons/image-outline.svg" alt="no image" width={64} height={64} />
          <p>"No image"</p>
        </div>
      </div>
    );
  }

  // Если больше 1 фото
  const hasMultipleImages = validSlides.length > 1;

  const goToPreviousHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? validSlides.length - 1 : prev - 1));
  };

  const goToNextHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === validSlides.length - 1 ? 0 : prev + 1));
  };

  const goToSlideHandler = (slideIndex: number) => setCurrentIndex(slideIndex);

  return (
    <div className={clsx(s.imageContainer, s[variant])}>
      <div className={s.slider}>
        {/* Непосредственно изображение */}
        <Image
          fill
          sizes={"(max-width: 768px) 100vw, 1440px"}
          className={s.slide}
          src={validSlides[currentIndex].postImage}
          alt={`Slide ${currentIndex + 1}`}
          aria-label={`Slide ${currentIndex + 1} of ${validSlides.length}`}
          priority={currentIndex === 0}
          objectFit="cover"
          //onError={() => setHasError(true)}
        />

        {/* Условный рендеринг: отрисовка кнопок "пролистывания" фотографий, если загружено > 1 фото*/}
        {hasMultipleImages && (
          <>
            {/* Кнопки "перелистывания" изображений */}
            <button type="button" className={s.left} onClick={goToPreviousHandler} aria-label="Previous slide">
              <img src={"/icons/arrow-ios-back-outline.svg"} alt="previous" />
            </button>
            <button type="button" className={s.right} onClick={goToNextHandler} aria-label="Next slide">
              <img src={"/icons/arrow-ios-forward.svg"} alt="next" />
            </button>
            {/* "Точки" для переключения на конкретное изображение из серии */}
            <div className={s.dotsContainer}>
              {validSlides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  className={clsx(s.dot, slideIndex === currentIndex && s.active)}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    goToSlideHandler(slideIndex);
                  }}
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
