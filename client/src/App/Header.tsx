import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';


export default function Header(): JSX.Element {
  // достаем глобальные переменные, которые лежат в value внутри AppContext.Provider
  const user = useSelector((store: RootState) => store.userReducer.user);
  let contentNavBar;
  if (user) {
    contentNavBar = (
      <>
        <div className="nav-item nav-link">{`Привет, ${user.name}!`}</div>
        <Link to="/addBook">
          <button type="button">Добавить книгу</button>
        </Link>
        <a className="btn btn-outline-secondary" href="/auth/logout">
          Выйти
        </a>
      </>
    );
  } else {
    contentNavBar = (
      <>
        <Link to="/reg">
          <a className="btn btn-sm btn-outline-primary">Регистрация</a>
        </Link>
        <Link to="/log">
          <a className="btn btn-sm btn-outline-primary" href="/auth/login">
            Авторизация
          </a>
        </Link>
      </>
    );
  }

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to="/">
          <p>Мои книги</p>
        </Link>
        <div className="navbar-nav">{contentNavBar}</div>
      </div>
    </nav>
  );
}
