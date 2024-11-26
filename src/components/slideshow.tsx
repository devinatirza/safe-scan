import React, { useState, useEffect } from 'react';

interface SlideShowProps {
  images: string[];
  interval?: number;
}

const SlideShow: React.FC<SlideShowProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-800">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: index === currentIndex ? 1 : 0 }}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => console.error(`Error loading image: ${image}`, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default SlideShow;