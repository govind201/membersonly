const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  messageController.getAllMessages
);

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", authController.signup);


router.get("/login", (req, res) => {
  res.render("login", {error: req.flash('error') });
});
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/new-message", authMiddleware.isAuthenticated, (req, res) => {
  res.render("new-message");
});

router.post(
  "/new-message",
  authMiddleware.isAuthenticated,
  messageController.createMessage
);

router.post(
  "/messages/delete/:id",
  authMiddleware.isAuthenticated,
  authController.isAdmin,
  messageController.deleteMessage
);

router.get("/join-club", authMiddleware.isAuthenticated, authController.isNotMember, authController.renderJoinClubForm);
router.post("/join-club", authMiddleware.isAuthenticated, authController.isNotMember, authController.joinClub);

module.exports = router;
