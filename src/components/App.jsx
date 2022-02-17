import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { searchImages } from '../shared/services/images';

import { Hearts } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

import styles from './app.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    error: null,
    loading: false,
    totalHits: null,
    modalOpen: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.setState({
        loading: true,
      });
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page } = this.state;
    try {
      const { totalHits, hits } = await searchImages(page, search);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          loading: false,
          error: null,
          totalHits,
        };
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  changeSearch = newSearch => {
    const { search } = this.state;
    if (newSearch === search) {
      return;
    }
    this.setState({
      search: newSearch,
      page: 1,
      images: [],
    });
  };

  showModal = (image, alt)=> {
    this.setState({
        modalOpen: true,
        modalContent: {
          image,
          alt,
        }
    })
}

hideModal = ()=> {
    this.setState({
        modalOpen: false,
        modalContent: null
    })
}


  render() {
    const { images, error, search, loading, totalHits, modalContent, modalOpen } = this.state;
    const { changeSearch, loadMore, showModal , hideModal} = this;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={changeSearch} />
        {error && <p>Ошибка поиска</p>}
        {!images.length && search && !loading && !error && (
          <p>По запросу {search} ничего не найдено</p>
        )}
        {modalOpen && <Modal handleClose={hideModal}><img src={modalContent.image} alt={modalContent.alt} /></Modal>}
        {Boolean(images.length) && <ImageGallery images={images} handleClick={showModal}/>}
        <div className={styles.wrapperButton}>
        {loading && <Hearts color="#3f51b5" height={80} width={80} />}
        {images.length < totalHits && !loading && <Button onClick={loadMore} text='Load more' />}
        </div>
      </div>
    );
  }
}
