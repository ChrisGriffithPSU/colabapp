import { Channel } from "amqplib";
import { createConnection } from "@auth/queues/connection";

export async function publishDirectMessage(
    channel: Channel,
    exchangeName: string,
    routingKey: string,
    message: string
): Promise<void> {
    try {
        if (!channel) {
            channel = await createConnection() as Channel;
        }
        
        await channel.assertExchange(exchangeName, 'direct');
        channel.publish(exchangeName, routingKey, Buffer.from(message));
    } catch (error) {
        console.log('AuthService Provider publishDirectMessage() method error: ' + error);
    }
}