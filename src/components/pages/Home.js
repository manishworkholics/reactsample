import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ImageFilter from 'react-image-filter';

const Home = () => {
  const [lightbox, setLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (event, obj) => {
    setCurrentImage(obj.index);
    setLightbox(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightbox(false);
  };

  const photos = [
    {
      src: 'https://api.pinkspot.cc/uploads/530c229c497e0e4962749cc16a8b793f.jpeg',
      width: 4,
      height: 3,
    },
    // Add more images with src, width, and height properties
  ];
  const imageFilters = [
    { name: 'Original', filter: 'none' },
    { name: 'Grayscale', filter: 'grayscale(100%)' },
    { name: 'Sepia', filter: 'sepia(100%)' },
    // Add more filters as needed
  ];

  const [activeFilter, setActiveFilter] = useState(imageFilters[0].filter);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12 mt-5'>
            <div>
              <ImageFilter
                filter={activeFilter}
                preserveSize
                src={photos[currentImage].src}
              />

              <Gallery photos={photos} onClick={openLightbox} />

              <Lightbox
                images={photos.map((photo) => ({ ...photo, src: photo.src }))}
                onClose={closeLightbox}
                onClickPrev={() => setCurrentImage((prev) => prev - 1)}
                onClickNext={() => setCurrentImage((prev) => prev + 1)}
                currentImage={currentImage}
                isOpen={lightbox}
              />

              <div>
                {imageFilters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => handleFilterChange(filter.filter)}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
