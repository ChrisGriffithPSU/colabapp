import client, { Channel, Connection } from "amqplib";

async function createConnection(): Promise<Channel | undefined> {
    try {
        const connection: Connection = await client.connect(`amqp://colabapp:colab@localhost:5672`);
        const channel: Channel = await connection.createChannel();
        console.log('Users service connected to queue successfully...');
        closeConnection(channel, connection);
        return channel;
    } catch (error) {
        console.log('Users service createConnection() method error: ' + error);
        return undefined;
    }
}

function closeConnection(channel: Channel, connection: Connection): void {
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });
}

export { createConnection };