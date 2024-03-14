import { useState } from "react";
import { CarouselItems } from './CarouselItems.jsx';
import { imagesList } from '../../../logic/carouselImages.js';

import '../../../styles/Carousel.css'

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  let imageProperties = imagesList.find(object => object.id === activeIndex);

  const selectedImage = (id) => {
    setActiveIndex(id);
  };

  return (
    <div className='carousel-container'>
      <div className="carousel-image">
        <img src={imageProperties.src} alt={imageProperties.alt} />
      </div>
      <div className="carousel-options">
        {imagesList.map(({ id, src, alt }) => (
          <CarouselItems
            key={id}
            src={src}
            alt={alt}
            isActive={activeIndex === id}
            selectedImage={() => selectedImage(id)}
          />
        ))}
      </div>
    </div>
  );
}

