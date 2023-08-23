let requestCounter = {};

// Middleware para limitar a taxa de requisições
const rateLimit = (req, res, next) => {
  const { ip } = req;
  if (!requestCounter[ip]) {
    requestCounter[ip] = 0;
  }

  requestCounter[ip]++;

  // Reset counter every hour
  setTimeout(() => {
    requestCounter[ip] = 0;
  }, 3600000);

  if (requestCounter[ip] > 100) {
    // Por exemplo, limita para 100 requisições por hora por IP
    return res
      .status(429)
      .json({ message: "Too many requests. Try again later." });
  }

  next();
};

module.exports = rateLimit;
