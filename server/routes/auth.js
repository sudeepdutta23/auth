const express = require("express");
const { signup, signin, getUser, signout } = require("../controllers/auth");
const { requireSignin } = require("../middleware");
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/signout', signout);

router.get('/getUser', requireSignin, getUser);

module.exports = router;