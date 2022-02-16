import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css'

class Searchbar extends Component {
    state = {
        search: ''
    };


    getInputValue = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {search} = this.state;
        this.props.onSubmit(search)
        this.resetSearch();
    }
    
    resetSearch(){
        this.setState({
            search: ''
        })
    }


  render() {
      const {search} = this.state;
      const {getInputValue, handleSubmit} = this;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}> 
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            name='search'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={getInputValue}
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}