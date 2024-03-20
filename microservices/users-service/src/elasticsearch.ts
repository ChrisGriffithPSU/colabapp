import { Client } from "@elastic/elasticsearch";
import { ClusterHealthResponse } from "@elastic/elasticsearch/lib/api/types";

const elasticSearchClient = new Client({ node: `http://elastic:admin1234@localhost:9200` });

const checkConnection = async (): Promise<void> => {
    let isConnected = false;
    while (!isConnected) {
        try {
            const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
            console.log(`User service Elasticsearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            console.log('Connection to Elasticsearch failed. Retrying...');
            console.log('User service checkConnection() method error: ' + error);
        }
    }
};

export { checkConnection };