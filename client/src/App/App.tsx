import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import FormAddBook from '../featrus/FormAddBook';
import Layout from './Layout';
import Main from './Main';
import RegPage from '../featrus/Reg/RegPage';
import LoginPage from '../featrus/Reg/LoginPage';
import { useAppDispatch } from '../store';
import type User from '../types/User';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch('/api/auth/check')
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          const userData: User = data.user;
          dispatch({ type: 'user/auth', payload: userData });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/reg" element={<RegPage />} />
          <Route path="/log" element={<LoginPage />} />
          <Route path="/addBook" element={<FormAddBook />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
