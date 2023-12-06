import './App.css';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import the styles

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Your image URLs
  const images = [
    'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg',
    "https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg"
    // Add more image URLs as needed
  ];

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${index + 1}`}
            onClick={() => openLightbox(index)}
            style={{width: 100}}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </div>
  );
};

export default ImageGallery;


// npm install react-image-lightbox