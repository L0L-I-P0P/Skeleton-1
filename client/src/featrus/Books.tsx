import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../store';
import type Book from '../types/Book';
import BookItem from './BookItem';

export default function Books(): JSX.Element {
  const books = useSelector((store: RootState) => store.booksReduser.books);
  const dispath = useAppDispatch();
  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newBooks: Book[] = data;
        dispath({ type: 'books/load', payload: newBooks });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container book-container">
      {books.map((book, index) => (
        <BookItem book={book} key={index} />
      ))}
      <br></br>
    </div>
  );
}
