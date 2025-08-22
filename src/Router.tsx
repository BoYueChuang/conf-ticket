import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from './components/common/Layout/Layout';
import { AuthGuard } from './components/common/AuthGuard/AuthGuard';
import { Booking } from './pages/Booking/Booking';
import { Login } from './pages/Login/Login';
import { Main } from './pages/Main/Main';
import { Profile } from './pages/Profile/Profile';
import { Tickets } from './pages/Tickets/Tickets';
import { Refund } from './pages/Refund/Refund';
import { TicketDistribution } from './pages/TicketDistribution/TicketDistribution';
import { SuccessOrError } from './pages/SuccessOrError/SuccessOrError';
import { Payment } from './pages/Payment/Payment';

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
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route path="/refund/success" element={<SuccessOrError />} />
                  <Route path="/refund/error" element={<SuccessOrError />} />
                  <Route
                    path="/distribution"
                    element={<TicketDistribution />}
                  />
                  {/* 捕獲所有未匹配的路由，重定向到首頁 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
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
