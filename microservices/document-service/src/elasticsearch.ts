import { Client } from "@elastic/elasticsearch";
import { ClusterHealthResponse, CountResponse, GetResponse } from "@elastic/elasticsearch/lib/api/types";
// import { config } from "@document/config";
import { IDocument } from "@chrisgriffithpsu/colab-shared/src";
// import { Logger } from "winston";

// const log: Logger = winstonLogger(`http://elasticsearch_container:9200`, 'documentElasticSearchServer', 'debug');

const elasticSearchClient = new Client({ node: `http://localhost:9200` });

const checkConnection = async (): Promise<void> => {
    let isConnected = false;
    while (!isConnected) {
        try {
            const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
            console.log("Document Service Elasticsearch connection success! " + health.status);
            // log.info(`Document Service Elasticsearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            console.log("Document Service Elasticsearch connection failure!");
            // log.error('Connection to Elasticsearch failed. Retrying...');
            // log.log('error', 'Document Service checkConnection() method:', error);
        }
    }
};

async function checkIfIndexExists(indexName: string): Promise<boolean> {
    const result: boolean = await elasticSearchClient.indices.exists({ index: indexName });
    return result;
};

async function createIndex(indexName: string): Promise<void> {
    try {
        const alreadyExists: boolean = await checkIfIndexExists(indexName);
        if (alreadyExists) {
            // log.info(`Index ${indexName} already exists.`);
            console.log(`Index ${indexName} already exists.`)
        } else {
            await elasticSearchClient.indices.create({ index: indexName });
            await elasticSearchClient.indices.refresh({ index: indexName });
            console.log("Created index!")
            // log.info(`Created index ${indexName}`);
        }
    } catch (error) {
        console.log("Failed to create index");
        // log.error(`An error occured while creating the index ${indexName}`);
        // log.log('error', 'Document Service createIndex() method error:', error);
    }
};

const getDocumentCount = async (index: string): Promise<number> => {
    try {
        const result: CountResponse = await elasticSearchClient.count({ index });
        return result.count;
    } catch (error) {
        // log.log('error', 'Document Service getDocumentCount() method error:', error);
        return 0;
    }
};

const getIndexData = async (index: string, itemId: string): Promise<IDocument> => {
    try {
        const result: GetResponse = await elasticSearchClient.get({ index, id: itemId });
        return result._source as IDocument;
    } catch(error) {
        // log.log('error', 'Document Service getIndexData() method error:', error);
        return {} as IDocument;
    }
};

const addDataToIndex = async (index: string, itemId: string, document: unknown): Promise<void> => {
    try {
        await elasticSearchClient.index({ index, id: itemId, document });
    } catch (error) {
        // log.log('error', 'Document Service addDataToIndex() method error:', error);
    }
};

const updateIndexData = async (index: string, itemId: string, document: unknown): Promise<void> => {
    try {
        await elasticSearchClient.update({ index, id: itemId, doc: document });
    } catch (error) {
        // log.log('error', 'Document Service updateIndexData() method error:', error);
    }
};

const deleteIndexData = async (index: string, itemId: string): Promise<void> => {
    try {
        await elasticSearchClient.delete({ index, id: itemId });
    } catch (error) {
        // log.log('error', 'Document Service deleteIndexData() method error', error);
    }
};

export { elasticSearchClient, checkConnection, createIndex, checkIfIndexExists, getDocumentCount, getIndexData, addDataToIndex, updateIndexData, deleteIndexData };