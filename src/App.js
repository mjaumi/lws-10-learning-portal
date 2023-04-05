import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import AdminLogin from './pages/admin/AdminLogin';
import Assignment from './pages/admin/Assignment';
import AssignmentMark from './pages/admin/AssignmentMark';
import Dashboard from './pages/admin/Dashboard';
import Quizzes from './pages/admin/Quizzes';
import Videos from './pages/admin/Videos';
import CoursePlayer from './pages/student/CoursePlayer';
import LeaderBoard from './pages/student/LeaderBoard';
import Quiz from './pages/student/Quiz';
import StudentLogin from './pages/student/StudentLogin';
import StudentRegistration from './pages/student/StudentRegistration';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import QuizRoute from './components/Route/QuizRoute';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  // integration of custom hooks here
  const authChecked = useAuthCheck();

  return (
    <HelmetProvider>
      {
        !authChecked ?
          <div>Checking Authentication</div>
          :
          <>
            <Router>
              <Routes>
                {/* student routes */}
                < Route path='/' element={
                  <PublicRoute>
                    <StudentLogin />
                  </PublicRoute>
                } />
                <Route path='/registration' element={
                  <PublicRoute>
                    <StudentRegistration />
                  </PublicRoute>
                } />
                <Route path='/leader-board' element={
                  <PrivateRoute>
                    <LeaderBoard />
                  </PrivateRoute>
                } />
                <Route path='/course-player/:videoId' element={
                  <PrivateRoute>
                    <CoursePlayer />
                  </PrivateRoute>
                } />
                <Route path='/quiz/:videoId' element={
                  <PrivateRoute>
                    <QuizRoute>
                      <Quiz />
                    </QuizRoute>
                  </PrivateRoute>
                } />

                {/* admin routes */}
                <Route path='/admin'>
                  <Route index element={
                    <PublicRoute>
                      <AdminLogin />
                    </PublicRoute>
                  } />
                  <Route path='dashboard' element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path='videos' element={
                    <PrivateRoute>
                      <Videos />
                    </PrivateRoute>
                  } />
                  <Route path='assignment' element={
                    <PrivateRoute>
                      <Assignment />
                    </PrivateRoute>
                  } />
                  <Route path='quizzes' element={
                    <PrivateRoute>
                      <Quizzes />
                    </PrivateRoute>
                  } />
                  <Route path='assignment-mark' element={
                    <PrivateRoute>
                      <AssignmentMark />
                    </PrivateRoute>
                  } />
                </Route>
              </Routes>
            </Router>
            <ToastContainer position='top-center' theme='dark' />
          </>
      }
    </HelmetProvider>
  );
}

export default App;
