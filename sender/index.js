const amqp = require('amqplib');

const getConnection = async () => await amqp.connect('amqp://luiz:12345678@localhost:5672');

const createChannel = async (connection) => connection.createChannel();

const tasks = 'tasks';

const send = async () => {
  try {
      const connection = await getConnection();
      const channel = await createChannel(connection);
      await channel.assertQueue(tasks, {durable: true});

      for(let i = 0; i < 10; i++){
          const message = await channel.sendToQueue(tasks, Buffer.from(`Message ${i}`), {persistent: true});

          console.log(message)
      }
  } catch (err) {
      throw err;
  }
};

send().then(done => {
    return done
}).catch(err => {
    return err
})