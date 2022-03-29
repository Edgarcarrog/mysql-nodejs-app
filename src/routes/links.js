const express = require("express");
const router = express.Router();

const pool = require("../database");

const {
  renderAddLink,
  addLink,
  getLinks,
  renderUpdateLink,
  updateLink,
  deleteLink,
} = require("../controllers/linksController");

router.get("/add", renderAddLink);

router.post("/add", addLink);

router.get("/", getLinks);

router.get("/update/:id", renderUpdateLink);

router.post("/update/:id", updateLink);

router.get("/delete/:id", deleteLink);

module.exports = router;
