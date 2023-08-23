const Url = require("../models/url");
const envs = process.env;
// Cria uma nova URL encurtada
exports.createShortUrl = async (req, res) => {
  const originalUrl = req.params.id;
  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.render("exist", { url, envs });
    } else {
      url = new Url({ originalUrl });
      await url.save();
      res.render("done", { url, envs });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Obtém a URL original a partir do código encurtado
exports.getOriginalUrl = async (req, res) => {
  const { shortUrlCode } = req.params;
  console.log("Recuperando a url: ", shortUrlCode);
  try {
    const url = await Url.findOne({ shortUrlCode });
    if (url) {
      url.clicks++;
      await url.save();
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
