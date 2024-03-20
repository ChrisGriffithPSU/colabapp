import { createConnection } from "@document/queues/connection";
import { Channel, ConsumeMessage, Replies } from "amqplib";

export const consumeMessages = async (channel: Channel, exchangeName: string, routingKey: string, queueName: string): Promise<string | null> => {
    let msgData: string | null = null;
    try {
        if (!channel) {
            channel = await createConnection() as Channel;
        }
        await channel.assertExchange(exchangeName, 'direct');
        const q: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(q.queue, exchangeName, routingKey);
        channel.consume(q.queue, async (msg: ConsumeMessage | null) => {
            const { data } = JSON.parse(msg!.content.toString());
            msgData = data;
            channel.ack(msg!);
        });
    } catch (error) {
        console.log("Error consuming data " + error);
    }
    return msgData;
}

// Handle consuming events for updating elo, views, topContributors, currentlyOnline, isTodaysTopColab, wordCount