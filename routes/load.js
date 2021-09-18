var express = require("express");
var router = express.Router();

const loadUtils = require("./utils/loadUtils");

/**
 * Case of get request which begin with "/load".
 * If it has no paramters (the parameters in the body request), using "loadPerviousDayOrders" function of loadUtils.js.
 * Show the orders from the pervius day (or error) in the internet browser.
 */
router.get("", (req, res) => {
  loadUtils
    .loadPerviousDayOrders()
    .then((details) => res.send(details))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
