// Компонент рендерить поле для пошуку оголошення в категорії по вмісту ключового слова в заголовку оголошення. Якщо поле для пошуку заповнене - поряд з іконкою лупи повинна зʼявлятись кнопка з іконкою хрестика, по кліку на яку, поле для пошуку очищується. Пошук оголошень по вмісту ключового слова в заголовку оголошення відбувається по сабміту або кліку на іконку лупи.
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { SearchButton, SearchInput, SearchWrapper, SearchTitle } from './NoticesSearch.styled'
import CleanInput from '../../images/icons/cross-small.svg'

const NoticesSearch = ({ onSubmit }) => {
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  useEffect(() => {
    if (params.query === undefined) {
      setSearch('');
    }
  }, [params.query]);

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleCleanInput = () => {
    setSearch('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Enter your request, please', {
        icon: '😉',
        style: {
          position: 'top-center',
          duration: 2000,
          autoclose: 1000,
          background: '#54ADFF',
          color: '#fff',
        },
      });
    }
    onSubmit(search)
    setSearch('')
  }

    return (
      <div><SearchTitle>Find your favorite pet</SearchTitle>
      <SearchWrapper>
      <SearchInput placeholder='Search' value={search} onChange={(e) => handleSearch(e)} search={search} />
      <SearchButton search={search} onClick={handleSubmit} />
      {search ? <img src={CleanInput} alt="" onClick={handleCleanInput} /> : null}
            </SearchWrapper>
            </div>
  )
}

export default NoticesSearch;
