const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");

router.post("/", campaignController.postCampaigns);
router.get("/", campaignController.getCampaigns);
// router.get("/:id", campaignController.getCampaignsb);
router.delete("/:id", campaignController.deleteCampaign);
router.put("/:id", campaignController.updateCampaign);
router.put("/users/:id", campaignController.updateUser);

module.exports = router;
