const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
};

module.exports = config;
