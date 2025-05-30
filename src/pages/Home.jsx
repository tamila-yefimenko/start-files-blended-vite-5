import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import {
  selectError,
  selectExchangeInfo,
  selectIsLoading,
} from '../redux/selectors';
import { useSelector } from 'react-redux';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';

const Home = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <ExchangeForm />
        {!exchangeInfo && (
          <Heading info title="What currencies do you want to exchange?🙂" />
        )}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}

        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
