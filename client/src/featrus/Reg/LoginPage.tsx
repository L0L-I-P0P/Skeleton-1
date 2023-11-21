import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../store';

export default function LoginPage(): JSX.Element {
  const dispath = useAppDispatch();
  type IFormInput = {
    id: number;
    name: string;
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput, e) => {
    e?.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(data);
        dispath({ type: 'user/auth', payload: data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Авторизация</h2>
      <div className="mb-3">
        <label className="form-label">
          Email
          <input type="email" {...register('email')} />
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Пароль
          <input type="password" {...register('password')} />
        </label>
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
