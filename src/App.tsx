import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import HotelList from './pages/HotelList'
import HotelPage from './pages/Hotel'
import useLoadKakao from './hooks/useLoadKakao'
import MyPage from './pages/My'
import SigninPage from './pages/Signin'
import AuthGuard from './components/auth/AuthGuard'
import Navbar from './components/shared/Navbar'
import SettingsPage from './pages/settings'
import LikePage from './pages/settings/like'
import PrivateRoute from './components/auth/PrivateRoute'
import SchedulePage from './pages/Schedule'
import ReservationPage from './pages/Reservation'
import ReservationDonePage from './pages/ReservationDone'
import ReservationListPage from './pages/ReservationList'
function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/test" element={<Test />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/done"
            element={
              <PrivateRoute>
                <ReservationDonePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/list"
            element={
              <PrivateRoute>
                <ReservationListPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
