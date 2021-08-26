/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

const Card = require("../models/card");
const BAD_REQUEST = require("../errors/BAD_REQUEST");
const FORBIDDEN = require("../errors/FORBIDDEN");
const NOT_FOUND = require("../errors/NOT_FOUND");

const OK = 200;
const CREATED = 201;

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NOT_FOUND("Карточка с указанным _id не найдена");
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        next(new FORBIDDEN("Чужие карточки удалять нельзя"));
      } else {
        card.remove();
        res.status(OK).send({
          message: "Карточка успешно удалена",
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else {
        next(err);
      }
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные при создании карточки: ${err}`
          )
        );
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные для постановки лайка: ${err}`
          )
        );
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Карточка с указанным _id не найдена: ${err}`));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные для снятия лайка: ${err}`
          )
        );
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Карточка с указанным _id не найдена: ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
