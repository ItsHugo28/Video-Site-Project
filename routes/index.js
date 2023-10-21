var express = require('express');
var {isLoggedIn} = require("../middleware/auth");
const {getRecentPosts, getPostById} = require("../middleware/post");
var router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index',  { title: 'CSC 317 App', name:"Hugo Gomez", session: req.session});
});





router.get("/login", function (req, res){
  res.render('login', {title: 'Login', css:["formstyle.css"]});
})

router.get("/registration", function (req, res){
  res.render('registration',{title: 'Register', css:["formstyle.css"]});
})

router.get("/postvideo", isLoggedIn,function (req, res){
  res.render('postvideo', {title: 'Post a Video', css:["formstyle.css"]});
})



module.exports = router;
