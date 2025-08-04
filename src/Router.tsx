import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout/Layout';
import { AuthGuard } from './components/common/AuthGuard/AuthGuard';
import { Booking } from './pages/Booking/Booking';
import { Login } from './pages/Login/Login';
import { Main } from './pages/Main/Main';
import { Profile } from './pages/Profile/Profile';
import { Tickets } from './pages/Tickets/Tickets';
import { Refund } from './pages/Refund/Refund';
import { TicketDistribution } from './pages/TicketDistribution/TicketDistribution';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 不需要認證的路由 */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        {/* 需要認證的路由都包在 AuthGuard 中 */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Layout>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route
                    path="/distribution"
                    element={<TicketDistribution />}
                  />
                </Routes>
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
