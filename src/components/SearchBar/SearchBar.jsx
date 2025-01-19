import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';
import customToast from '../ErrorMessages/Toast/ToastMessage';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      customToast('warn', 'Oops... Enter something');
      return;
    }

    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          type="text"
          name="query"
          className={s.searchInput}
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />
        <button type="submit" className={s.searchBtn}>
          <FcSearch size={20} />
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;