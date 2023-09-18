const express = require("express");
const itemsRouter = require("./itemsRouter");

const router = express.Router();

router.use('/items', itemsRouter)

module.exports = router;
