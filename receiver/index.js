const amqp = require('amqplib');

const getConnection = async () => await amqp.connect('amqp://luiz:12345678@localhost:5672');

const createChannel = async (connection) => connection.createChannel();

const tasks = 'tasks';

const receive = async () => {
    try {
        const connection = await getConnection();
        const channel = await createChannel(connection);
        await channel.assertQueue(tasks);
        return channel.consume(tasks, function(msg) {
            if (msg !== null) {
                console.log(" [x] Received %s", msg.content.toString());
                channel.ack(msg);
            }
        }, {noAck: false});
    } catch (err) {
        throw err;
    }
};

receive().then(done => {
    return done
}).catch(err => {
    return err
})