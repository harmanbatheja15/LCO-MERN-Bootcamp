var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');

// Signup Route
router.post('/signup', [
    check("name", "Name should be at least 2 characters long!").isLength({ min: 2 }),
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Password should be at least 3 characters long!").isLength({ min: 3 }),
], signup);

// Signin Route
router.post('/signin', [
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Enter a valid password").isLength({ min: 1 }),
], signin);

// Signout Route
router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;
