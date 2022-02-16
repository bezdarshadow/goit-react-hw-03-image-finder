import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';
import styles from './image-gallery.module.css';

const ImageGallery = ({ images, handleClick }) => {
  const elements = images.map(image => (
    <ImageGalleryItem
      key={image.id}
      image={image.webformatURL}
      alt={image.tags}
      handleClick={handleClick}
      largeImage={image.largeImageURL}
    />
  ));

  return <ul className={styles.gallery}>{elements}</ul>;
};

export default ImageGallery;


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        alt: PropTypes.string,
        largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
    handleClick: PropTypes.func.isRequired,
}