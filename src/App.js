import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* student routes */}
        <Route path='/' element={
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
        <Route path='/course-player' element={
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        } />
        <Route path='/quiz' element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        } />

        {/* admin routes */}
        <Route path='/admin' element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        } />
        <Route path='/admin/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/admin/videos' element={
          <PrivateRoute>
            <Videos />
          </PrivateRoute>
        } />
        <Route path='/admin/assignment' element={
          <PrivateRoute>
            <Assignment />
          </PrivateRoute>
        } />
        <Route path='/admin/quizzes' element={
          <PrivateRoute>
            <Quizzes />
          </PrivateRoute>
        } />
        <Route path='/admin/assignment-mark' element={
          <PrivateRoute>
            <AssignmentMark />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
