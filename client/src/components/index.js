import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from '../pages';
import Login from '../pages/login';
import Comp from '../pages/privComp';
import Dashboard from '../pages/dashboard';
import NotFound from '../pages/404';
import PrivateRoute from '../utils/privateRoute';
import LoginRoute from '../utils/loginRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginRoute component={<Login />} />} />
        <Route path="/comp" element={<PrivateRoute component={<Comp />} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}