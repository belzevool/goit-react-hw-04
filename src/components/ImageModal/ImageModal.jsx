import { useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.overlay}
      className={s.modal}
      shouldCloseOnOverlayClick={true}
    >
      <div onClick={handleOverlayClick} className={s.container}>
        <img src={image?.urls?.regular} alt={image?.alt_description} className={s.image} />
        <p className={s.info}>Author: {image?.user?.name}</p>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};

export default ImageModal;