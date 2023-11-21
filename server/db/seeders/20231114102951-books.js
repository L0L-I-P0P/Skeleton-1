'use strict';
const bcrypt = require('bcrypt');
const { User, Book } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.create(
      {
        email: 'ivan@mail.ru',
        name: 'Ivan',
        password: await bcrypt.hash('123', 10),
        Books: [
          {
            title: 'Аллея волшебных книжных лавок',
            img: 'https://www.mann-ivanov-ferber.ru/assets/images/covers/20/31020/1.00x-thumb.png',
            description:
              'В этой книге пять историй от корейских авторов. Вместе с героями читателю предстоит посетить пять необычных книжных магазинов. У кого-то появится надежда, кто-то найдет утешение, кто-то станет смелее, а кто-то обретет уверенность в завтрашнем дне.',
            status: false,
          },
          {
            title: 'Сказочный мир Шута',
            img: 'https://img4.labirint.ru/rc/66f3340153867ea81cec02c966ff543d/363x561q80/books96/959972/cover.jpg?1688711177',
            description:
              'Андрей Князев – участник и один из основателей «Короля и Шута», лидер рок-группы «КняZz», бессменный оформитель альбомов и автор большинства текстов песен обоих коллективов. Его всегда знали как музыканта, но есть и другая сфера искусства, в которой Андрей творил даже больше и дольше, – живопись.',
            status: false,
          },
          {
            title: 'Скоро конец света',
            img: 'https://img4.labirint.ru/rc/96c03e80be490c7e4666e514e8f441d7/363x561q80/books97/964286/cover.jpg?1690810022',
            description:
              'Оливеру одиннадцать лет, и имя себе он выбрал сам — в честь любимого героя Диккенса. Он любит играть в «Змейку» на телефоне и еду «как в Америке»; мечтает победить хулигана Цапу, вылечиться от ВИЧ-инфекции и попасть в настоящую семью. ',
            status: false,
          },
        ],
      },
      {
        include: [Book],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ truncate: { cascade: true } });
  },
};
