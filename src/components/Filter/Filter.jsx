import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { selectFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filter/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value.toLowerCase()));
  };

  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={handleChange}
    />
  );
};

export default Filter;
