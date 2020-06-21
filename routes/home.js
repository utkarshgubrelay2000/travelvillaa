var express = require('express');
var router = express.Router();
var signRouter=require("../controller/authcontroller")
var homeRouter=require("../controller/homecontroller")
var passportRouter=require("../controller/passportcontroller");

/* GET home page. */
router.use('/',homeRouter)
router.use('/',signRouter)
router.use('/',passportRouter)

//router.use('/',passportRoute)


module.exports = router;
