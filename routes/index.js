var express = require("express");
var router = express.Router();
var student = require("../controller/con-student");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/missingStudent", student.missingStudent);

module.exports = router;
