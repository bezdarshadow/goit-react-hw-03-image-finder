import PropTypes from 'prop-types';
import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ image, alt, handleClick, largeImage }) => {
  return (
    <li className={styles.item} onClick={()=>handleClick(largeImage, alt)}>
      <img className={styles.itemImage} src={image} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
}


