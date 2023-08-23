const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const urlController = require("./controllers/urlController");
const rateLimit = require("./middlewares/rateLimit");

// Carregar configuração de variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Conectar ao MongoDB e ao RabbitMQ
connectDB();

// Middlewares
app.use(express.json());

// Rota principal na raiz
app.get("/", (req, res) => {
  res.render("index");
});

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Endpoint para criar uma nova URL encurtada
app.get("/s/:id", rateLimit, urlController.createShortUrl);

// Endpoint para redirecionar para a URL original
app.get("/:shortUrlCode", urlController.getOriginalUrl);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
