const pool = require("../database");

exports.renderAddLink = (req, res) => {
  res.render("links/add");
};

exports.addLink = async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links SET ?", [newLink]);
  res.redirect("/links");
};

exports.getLinks = async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
};

exports.renderUpdateLink = async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  const link = links[0];
  res.render("links/update", { link });
};

exports.updateLink = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  /* await pool.query(
      'UPDATE links SET title = "", url= "" , url= "" WHERE id = ?',
      [id]
    ); */
  res.redirect("/links");
};

exports.deleteLink = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id = ?", [id]);
  res.redirect("/links");
};
