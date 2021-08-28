/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  signOut,
  getUsers,
  getUser,
  getOwnerUser,
  updateProfileUser,
  updateAvatarUser,
} = require("../controllers/users");

router.get("/signout", signOut);
router.get("/", getUsers);
router.get("/me", getOwnerUser);
router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfileUser
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
        ),
    }),
  }),
  updateAvatarUser
);

module.exports = router;
