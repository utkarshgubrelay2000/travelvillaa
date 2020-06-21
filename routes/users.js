var express = require('express')
var router = express.Router();
const userRouter=require('../controller/usercontroller')
const chatRouter=require('../controller/chatController')
const detailsRouter=require('../controller/customerController')
/* GET users listing. */
router.use('/user',userRouter)
router.use('/',detailsRouter)
router.use('/',chatRouter)

module.exports = router;
