import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import FetchImages from './API/UnsplashAPI';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import customToast from './ErrorMessages/Toast/ToastMessage';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessages/API/ErrorMessage';
import s from './App.module.css';
import ImageModal from './ImageModal/ImageModal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const renderGallery = async () => {
      try {
        setIsLoading(true);
        const res = await FetchImages(query, page);

        if (res.results.length === 0) {
          setIsShowButton(false);
          customToast('warn', 'Sorry, there are no images matching your search');
          setIsLoading(false);
          return;
        }

        setImages(prev => [...prev, ...res.results]);
        setIsShowButton(page < Math.ceil(res.total / 12) ? true : false);
        setIsLoading(false);
      } catch (_) {
        // eslint-disable-next-line no-unused-vars
        setError('Something went wrong! Please try again later.');
        setIsLoading(false);
      }
    };

    renderGallery();
  }, [query, page]);

  const getInputValue = newQuery => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useLayoutEffect(() => {
    if (galleryRef.current && images.length > 0) {
      const { height: cardHeight } = galleryRef.current.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1,
        behavior: 'smooth',
      });
    }
  }, [images]);

  return (
    <>
      <SearchBar onSubmit={getInputValue} />
      <Toaster />
      <div className={s.container}>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          images.length > 0 && (
            <ImageGallery images={images} ref={galleryRef} onImageClick={handleImageClick} />
          )
        )}
      </div>
      {isLoading && <Loader />}
      {isShowButton && <LoadMoreBtn onClick={() => setPage(page => page + 1)} />}
      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
    </>
  );
};

export default App;