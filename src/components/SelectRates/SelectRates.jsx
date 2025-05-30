import Select from 'react-select';
import { useSelector } from 'react-redux';
import currencyOptions from './symbols.json';
import styles from './SelectRates.module.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/currencySlice';
import './ReactSelect.css';
import {
  selectBaseCurrency,
  selectError,
  selectIsLoading,
} from '../../redux/selectors';

const SelectRates = () => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  console.log('error: ', error);

  const handleChange = selectedOption => {
    if (selectedOption) {
      dispatch(setBaseCurrency(selectedOption.value));
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
        isLoading={isLoading}
        options={currencyOptions}
        value={{ label: baseCurrency, value: baseCurrency }}
        onChange={handleChange}
      />
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default SelectRates;
