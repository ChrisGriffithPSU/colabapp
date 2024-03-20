import { IDocument } from '@chrisgriffithpsu/colab-shared/src';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse, GetResponse } from '@elastic/elasticsearch/lib/api/types';

const elasticSearchClient = new Client({ node: 'http://elastic:admin1234@localhost:9200' });

async function checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
        console.log('AuthService connecting to ElasticSearch');

        try {
            const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
            console.log(`AuthService ElasticSearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            console.log("Connection to Elasticsearch failed... " + error);
        }
    }
}

async function checkIfIndexExists(indexName: string): Promise<boolean> {
    const result: boolean = await elasticSearchClient.indices.exists({ index: indexName });
    return result;
}

async function createIndex(indexName: string): Promise<void> {
    try {
        const result: boolean = await checkIfIndexExists(indexName);
        if (result) {
            console.log(`Index ${indexName} already exists`);
        } else {
            await elasticSearchClient.indices.create({ index: indexName });
            await elasticSearchClient.indices.refresh({ index: indexName });
            console.log(`Created index ${indexName}`);
        }
    } catch (error) {
        console.log(`An error occurred when creating the index ${indexName}: ${error}`);
    }
}

async function getDocumentById(index: string, documentId: string): Promise<IDocument> {
    try {
        const result: GetResponse = await elasticSearchClient.get({ index, id: documentId });
        return result._source as IDocument;
    } catch (error) {
        console.log('AuthService elasticsearch getDocumentById() method error ' + error);
        return {} as IDocument;
    }
}

export { elasticSearchClient, checkConnection, createIndex, getDocumentById }