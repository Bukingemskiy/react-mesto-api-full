/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BAD_REQUEST = require("../errors/BAD_REQUEST");
const UNAUTHORIZED = require("../errors/UNAUTHORIZED");
const NOT_FOUND = require("../errors/NOT_FOUND");
const CONFLICT = require("../errors/CONFLICT");

const OK = 200;
const CREATED = 201;
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по указанному _id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

const getOwnerUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по указанному _id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, about, email, password } = req.body;
  if (!email || !password) {
    next(new BAD_REQUEST("Поля email и пароль должны быть заполнены"));
    return;
  }
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, about, email, password: hash })
      .then((user) =>
        res.status(CREATED).send({
          user,
        })
      )
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          next(new CONFLICT("Пользователь с таким email уже существует"));
        } else if (err.name === "ValidationError") {
          next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BAD_REQUEST("Поля email и пароль должны быть заполнены"));
    return;
  }
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        next(new UNAUTHORIZED("Такого пользователя не существует"));
        return;
      }
      bcrypt.compare(password, user.password, (error, isValid) => {
        if (!isValid) {
          next(new UNAUTHORIZED("Неверный email или пароль"));
          return;
        }
        if (error) {
          next(new BAD_REQUEST(error));
          return;
        }
        if (isValid) {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production"
              ? JWT_SECRET
              : "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b",
            {
              expiresIn: "7d",
            }
          );
          res
            .cookie("jwt", token, {
              maxAge: 3600000 * 24 * 90,
              httpOnly: true,
            })
            .status(OK)
            .send({ token });
        }
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else {
        next(err);
      }
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные при обновлении профиля: ${err}`
          )
        );
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по указанному _id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные при обновлении аватара: ${err}`
          )
        );
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по указанному _id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  getOwnerUser,
  createUser,
  login,
  updateProfileUser,
  updateAvatarUser,
};
