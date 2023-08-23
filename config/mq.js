const amqp = require("amqplib/callback_api");

let channel = null;

// Inicializa a conexão com o RabbitMQ
const connectMQ = () => {
  amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1;
      }
      channel = ch;
      console.log("RabbitMQ connected...");
    });
  });
};

module.exports = { connectMQ, channel };
