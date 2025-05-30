import Home from './pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, useEffect, Suspense } from 'react';
import { fetchBaseCurrency } from './redux/operations';
import { setBaseCurrency } from './redux/currencySlice';
import { useDispatch } from 'react-redux';

const Header = lazy(() => import('./components/Header/Header'));
const Heading = lazy(() => import('./components/Heading/Heading'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccurancy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const sucess = ({ coords }) => {
      dispatch(fetchBaseCurrency(coords));
    };

    const error = () => {
      dispatch(setBaseCurrency('USD'));
    };

    navigator.geolocation.getCurrentPosition(sucess, error, options);
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Header />
        <Heading title="Just do it!" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
