import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout/Layout';
import { Booking } from './pages/Booking/Booking';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
