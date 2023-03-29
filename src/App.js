import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Route path='/' element={<StudentLogin />} />
        <Route path='/registration' element={<StudentRegistration />} />
        <Route path='/leader-board' element={<LeaderBoard />} />
        <Route path='/course-player' element={<CoursePlayer />} />
        <Route path='/quiz' element={<Quiz />} />

        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/videos' element={<Videos />} />
        <Route path='/admin/assignment' element={<Assignment />} />
        <Route path='/admin/quizzes' element={<Quizzes />} />
        <Route path='/admin/assignment-mark' element={<AssignmentMark />} />
      </Routes>
    </Router>
  );
}

export default App;
