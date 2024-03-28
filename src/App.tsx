import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import useLoadKakao from './hooks/useLoadKakao'

const Test = lazy(() => import('./pages/Test'))
const HotelList = lazy(() => import('./pages/HotelList'))
const HotelPage = lazy(() => import('./pages/Hotel'))
const MyPage = lazy(() => import('./pages/My'))
const SigninPage = lazy(() => import('./pages/Signin'))
const AuthGuard = lazy(() => import('./components/auth/AuthGuard'))
const Navbar = lazy(() => import('./components/shared/Navbar'))
const SettingsPage = lazy(() => import('./pages/settings'))
const LikePage = lazy(() => import('./pages/settings/like'))
const PrivateRoute = lazy(() => import('./components/auth/PrivateRoute'))
const SchedulePage = lazy(() => import('./pages/Schedule'))
const ReservationPage = lazy(() => import('./pages/Reservation'))
const ReservationDonePage = lazy(() => import('./pages/ReservationDone'))
const ReservationListPage = lazy(() => import('./pages/ReservationList'))

function App() {
  useLoadKakao()
  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  )
}

export default App
