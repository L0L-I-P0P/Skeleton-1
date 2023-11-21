import React, { useState } from 'react';
import Modal from 'react-modal';
import type Book from '../types/Book';
import { RootState, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';

type BookPropsType = {
  book: Book;
};

export default function BookItem({ book }: BookPropsType): JSX.Element {
  const dispath = useAppDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [img, setImg] = useState(book.img);

  const user = useSelector((store: RootState) => store.userReducer.user);

  const handleChange = async (
    id: Book['id'],
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const res = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: e.target.checked,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);

    dispath({ type: 'book/update/checked', payload: id });
  };

  const handleRemove = async (id: Book['id']): Promise<void> => {
    const res = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });
    await res.json();
    if (res.ok) {
      dispath({ type: 'book/remove', payload: id });
    }
  };

  const customStyles: Modal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30 27 27 / 77%)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#242424',
    },
  };

  const handleOpenModal = (): void => {
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  const handleChangeBook = async (
    id: Book['id'],
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const res = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        img,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = res.json();
    console.log(data);

    if (res.ok) {
      const updatedBook: Book = {
        id: book.id,
        userId: user?.id,
        title,
        description,
        img,
        status: book.status,
      };

      dispath({ type: 'book/update', payload: updatedBook });
      setIsOpen(false);
    }
  };

  Modal.setAppElement('body');

  return (
    <div className="book-card" key={book.id}>
      <img src={book.img} alt={book.title} className={book.status ? 'img' : ''}></img>
      <h1 className={book.status ? 'text' : ''}>{book.title}</h1>
      <p className={book.status ? 'text' : ''}>{book.description}</p>
      <input type="checkbox" checked={book.status} onChange={(e) => handleChange(book.id, e)} /> Уже
      прочитано
      <br></br>
      <div>
        <button className="btn btn-secondary" type="button" onClick={() => handleRemove(book.id)}>
          Удалить
        </button>
        <button className="btn btn-secondary" type="button" onClick={handleOpenModal}>
          Изменить
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
          <div>
            <form onSubmit={(e) => handleChangeBook(book.id, e)}>
              <label>
                Введи название:
                {/* контролируемый инпут */}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <br></br>
              <label>
                Введи описание:
                {/* контролируемый инпут */}
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <br></br>
              <label>
                Введи картинку:
                {/* контролируемый инпут */}
                <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
              </label>
              <br></br>
              <button type="submit">Изменить</button>
              <button type="button" onClick={handleCloseModal}>
                Закрыть
              </button>
            </form>
            <br></br>
          </div>
        </Modal>
      </div>
    </div>
  );
}
