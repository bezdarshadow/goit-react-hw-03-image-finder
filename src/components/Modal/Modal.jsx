import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close);
  }

  close = event => {
    const { handleClose } = this.props;
    if (event.code === 'Escape') {
      handleClose();
    }
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  render() {
    const { content, } = this.props;
    const { close } = this;

    return createPortal(
      <div className={styles.overlay} onClick={close}>
        <div className={styles.modal}>
          <img src={content.image} alt={content.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;


Modal.propTypes = {
    content: PropTypes.shape({
        image: PropTypes.string.isRequired,
        alt: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired
}