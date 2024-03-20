import { ICreateDocument, IDocument, IReportUser } from '@chrisgriffithpsu/colab-shared/src';
import { addDataToIndex, deleteIndexData, getIndexData, updateIndexData } from '@document/elasticsearch';
import { DocumentModel } from '@document/models/document.schema';
import { publishMessage } from '@document/queues/producer';
import { documentChannel } from '@document/server';
import { ObjectId } from 'mongoose';

interface IUpdateDocumentSettings {
    title: string,
    privacy: string,
    theme: string[],
    turnStyle: string,
}

/**
 * 
 * @param document 
 * @returns The document that was created
 */
const createDocumentService = async(document: ICreateDocument): Promise<IDocument> => {
    // Add document to database. If added successfully, push notification to invited users and admins and add to elasticsearch. Return createdDocument.
    const invitedUsers: string[] = document.invitedUserIds;
    const invitedAdmins: string[] = document.adminIds;
    const createdDocument: IDocument = await DocumentModel.create(document);

    if (createdDocument) {
        const data: IDocument = createdDocument.toJSON?.() as IDocument;
        const documentId: string | ObjectId = data.id!;
        if (invitedUsers.length !== 0) {
            invitedUsers.forEach((user) => inviteMember(documentId, user, false));
        }

        if (invitedAdmins.length !== 0) {
            invitedAdmins.forEach((user) => inviteMember(documentId, user, true));
        }

        await addDataToIndex('document', documentId.toString(), data)
    }
    return createdDocument;
}

/**
 * 
 * @param id The id of the document to be searched for
 * @returns The requested document
 */
const getDocumentByIdService = async(id: string): Promise<IDocument> => {
    const document: IDocument = await getIndexData('document', id);
    return document;
}

// /**
//  * 
//  * @param userId The id of the user
//  * @returns The documents created by the user
//  */
// const getUsersCreatedDocuments = async(userId: string): Promise<IDocument[]> => {

// }

/**
 * 
 * @param id The id of the document
 */
const deleteDocumentService = async(id: string): Promise<void> => {
    await DocumentModel.deleteOne({ _id: id }).exec();
    // Publish message to delete the document from all of the user's databases
    await deleteIndexData('document', id);
}

/**
 * 
 * @param id The id of the document to be updated
 * @param data The data to update the document with
 * @returns The updated document settings
 */
const updateDocumentSettingsService = async(id: string, data: IUpdateDocumentSettings): Promise<IDocument> => {
    const document: IDocument = await DocumentModel.findOneAndUpdate(
        { _id: id }, data, { new: true }
    ).exec() as IDocument;

    if (document) {
        const data: IDocument = document.toJSON?.() as IDocument;
        await updateIndexData('document', `${document._id}`, data);
    }
    return document;
}

/**
 * Emit an event to the notification service to notify a user of an invite to a document sent by currentUser
 * @param id The id of the document to invite the user to
 * @param userId The id of the user to be invited to the document
 */
const inviteMember = async(id: string | ObjectId, userId: string, isAdmin: boolean): Promise<void> => {
    await publishMessage( documentChannel, 'document.events', 'invite.user', JSON.stringify({ type: 'send-invite', document: id, userId, isAdmin }) );
    console.log(`Inviting user ${userId} to document ${id}. Is Admin: ${isAdmin}`);
}

// /**
//  * If currentUser is an admin or owner of the document, set halloffame to true
//  * @param id The id of the document to be closed
//  */
// const closeDocument = async(id: string): Promise<void> => {

// }

// /**
//  * If currentUser is an admin or owner of the document, remove a given user from the document
//  * @param id The id of the document the user is to be removed from
//  * @param userId The id of the user to remove
//  */
// const removeMember = async(id: string, userId: string): Promise<void> => {

// }

/** 
 * Get the id of the owner and admins of the document
 * Emit a rabbitMQ event to the notification service to notify them of the report
 * @param id The id of the document where issues occurred
 * @param report The report data
 */
const reportMember = async(id: string | ObjectId, report: IReportUser): Promise<void> => {
    // Get the admin and owner ids of the document
    await publishMessage( documentChannel, 'document.events', 'report.user', JSON.stringify({ type: 'send-report', document: id, report }) )
}

export { createDocumentService, inviteMember, reportMember, getDocumentByIdService, deleteDocumentService, updateDocumentSettingsService };