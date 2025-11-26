import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './VisualGallery.module.css';

interface VisualGalleryProps {
  images: string[];
  hotelName: string;
}

const VisualGallery: React.FC<VisualGalleryProps> = ({ images, hotelName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setIsOpen(true);
  };

  const slides = images.map((url) => ({ src: url }));

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.mainImageWrapper} onClick={() => openLightbox(0)}>
          <img src={images[0]} alt={`${hotelName} main view`} className={styles.mainImage} />
          <div className={styles.overlay}>View Gallery</div>
        </div>
        <div className={styles.thumbnailGrid}>
          {images.slice(1, 5).map((image, i) => (
            <div key={i} className={styles.thumbnailWrapper} onClick={() => openLightbox(i + 1)}>
              <img src={image} alt={`${hotelName} view ${i + 2}`} className={styles.thumbnail} />
              {i === 3 && images.length > 5 && (
                <div className={styles.morePhotosOverlay}>
                  +{images.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .9)' } }}
      />
    </>
  );
};

export default VisualGallery;
