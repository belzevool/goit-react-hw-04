import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard/ImageCard';

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
  console.log('images: ', images);
  return (
    <ul className="gallery" ref={ref}>
      {images.map(image => (
        <li key={image.id} className="thumb" onClick={() => onImageClick(image)}>
          <ImageCard info={image} />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;