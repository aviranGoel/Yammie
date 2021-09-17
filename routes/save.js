var express = require("express");
var router = express.Router();

const saveUtils = require("./utils/saveUtils");

/**
 * Case of post request which begin with "/save".
 * If it has no paramters (the parameters in the body request), using "saveOrder" function of saveUtils.js.
 * Show the response (answer or error) in the internet browser.
 */
router.post("", (req, res) => {
  saveUtils
    .saveOrder(req.body)
    .then((details) => res.send(details))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
