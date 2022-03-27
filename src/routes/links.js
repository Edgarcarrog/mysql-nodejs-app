const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links SET ?", [newLink]);
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  const link = links[0];
  res.render("links/update", { link });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id = ?", [id]);
  res.redirect("/links");
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  /* await pool.query(
    'UPDATE links SET title = "", url= "" , url= "" WHERE id = ?',
    [id]
  ); */
  res.redirect("/links");
});

module.exports = router;
