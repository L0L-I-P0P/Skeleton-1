import React, { useState } from 'react';
import { type RootState, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';

export default function FormAddBook(): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const dispath = useAppDispatch();
  const user = useSelector((store: RootState) => store.userReducer.user?.id);

  const handleAddBook: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch('/api/books/', {
      method: 'POST',
      body: JSON.stringify({
        userId: user,
        title,
        description,
        img,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispath({ type: 'book/add', payload: data });
        setTitle('');
        setDescription('');
        setImg('');
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <br></br>
      <div>
        <form onSubmit={handleAddBook}>
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
          <button type="submit">Добавить</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}
