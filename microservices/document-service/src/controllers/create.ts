import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createDocumentService } from '@document/services/document.service';
import { ICreateDocument } from '@chrisgriffithpsu/colab-shared/src';

const createDocument = async (req: Request, res: Response): Promise<void> => {
    // Error handling
    const document: ICreateDocument = {
        ownerId: req.body.ownerId,
        title: req.body.title,
        privacy: req.body.privacy,
        theme: req.body.theme,
        turnStyle: req.body.turnStyle,
        adminIds: req.body.adminIds,
        invitedUserIds: req.body.invitedUserIds,
    }

    const createdDocument = createDocumentService(document);

    res.status(StatusCodes.CREATED).json({message: 'Successfully Created Document', document: createdDocument});
}

export { createDocument };