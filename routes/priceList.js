const express = require("express");
const router = express.Router();
const {
  updatePriceList,
  getPriceListsAsObs,
} = require("../controllers/priceList-controller");

router.route("/").post(getPriceListsAsObs);
router.route("/:id").put(updatePriceList);

module.exports = router;
