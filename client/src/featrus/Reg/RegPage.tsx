import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function RegPage(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [modalIsOpen, setIsOpen] = useState(false);

  type ResMessage = {
    message: string;
  };

  type IFormInput = {
    id: number;
    name: string;
    email: string;
    password: string;
  };
  
  const handleOpenModal = (): void => {
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: { email: '', name: '', password: '' },
  });
  const onSumbit: SubmitHandler<IFormInput> = (data: IFormInput, e) => {
    e?.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res: ResMessage) => {
        setMessage(res.message);
        setName(data.name);
      })
      .catch((error) => console.log(error));
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


  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <h2>Регистрация</h2>
      <div>
        <label>
          Имя
          <input type="text" {...register('name')} />
        </label>
      </div>
      <div>
        <label>
          Email
          <input type="email" {...register('email')} />
        </label>
      </div>
      <div>
        <label>
          Пароль
          <input type="password" {...register('password')} />
        </label>
      </div>
      <div id="error-message" />
      <button type="submit" onClick={handleOpenModal}>
        Зарегистрироваться
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
        <div>{message}</div>
        <button type="button" onClick={handleCloseModal}>
          {message === `Пользователь ${name} успешно зарегистрирован` ? (
            <Link to="/log">Войти</Link>
          ) : (
            <>Закрыть</>
          )}
        </button>
      </Modal>
    </form>
  );
}
