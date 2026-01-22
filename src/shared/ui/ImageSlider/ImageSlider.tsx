"use client";

import { useState } from "react";
import s from "./ImageSlider.module.scss";
import clsx from "clsx";

type Props = {
  slides: Record<"url", string>[];
};

export const ImageSlider = ({ slides = [] }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={s.imageContainer}>
      <div className={s.slider}>
        <button type="button" className={s.left} onClick={goToPrevious}>
          <img src={"icons/arrow-ios-back-outline.svg"} alt="previous" />
        </button>
        <button type="button" className={s.right} onClick={goToNext}>
          <img src={"icons/arrow-ios-forward.svg"} alt="next" />
        </button>
        <div className={s.slide} style={{ backgroundImage: `url(${slides[currentIndex].url})` }}></div>

        <div className={s.dotsContainer}>
          {slides.map((_, slideIndex: any) => (
            <button
              key={slideIndex}
              className={clsx(s.dot, slideIndex === currentIndex && s.active)}
              onClick={() => goToSlide(slideIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
