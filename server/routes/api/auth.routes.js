const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');

// аутентицикация существующего пользователя
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // проверить, есть ли такой юзер в бд
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Такого пользователя не существует',
      });
    }

    //  проверить пароли
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(404).json({
        success: false,
        message: 'Неправильный пароль',
      });
    }

    // сгенерируем jwt токены
    const { accessToken, refreshToken } = generateTokens({
      user: { id: user.id, name: user.name, email: user.email },
    });

    // устанавливаем куки
    res.cookie('access', accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie('refresh', refreshToken, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    });

    // отправляем ответ
    return res.json({
      success: true,
      message: `Аутентификация ${user.name} прошла успешно`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// создание нового пользователя
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (name === '' || email === '' || password === '') {
    return res
      .status(400)
      .json({ success: false, message: 'Заполните все поля' });
  }

  try {
    // если пользователь с таким email уже есть, возвращаем ошибку
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Такой пользователь уже существует' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.json({
      success: true,
      message: `Пользователь ${user.name} успешно зарегистрирован`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ошибка на сервере' });
  }
});

router.get('/check', async (req, res) => {
  const { user } = res.locals; // ищем активную сессию
  const userData = await User.findByPk(user?.id); // ищем пользователя в бд(чтобы подтнуть информацию о его профиле)
  if (user && userData) {
    delete userData.password; //  чтобы не отправлять пароль на клиент
    res.json({
      isLoggedIn: true,
      user: userData,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;
