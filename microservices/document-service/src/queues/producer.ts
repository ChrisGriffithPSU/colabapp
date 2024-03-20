import { createConnection } from "@document/queues/connection";
import { Channel } from "amqplib";

const publishMessage = async (channel: Channel, exchangeName: string, routingKey: string, message: string): Promise<void> => {
    try {
        if (!channel) {
            channel = await createConnection() as Channel;
        }
        await channel.assertExchange(exchangeName, 'direct');
        channel.publish(exchangeName, routingKey, Buffer.from(message));
    } catch (error) {
        console.log("Error publishing message: " + error);
    }
};

export { publishMessage };