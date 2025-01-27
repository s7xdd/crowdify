const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");


router.get("/", campaignController.getActivities);

module.exports = router;
