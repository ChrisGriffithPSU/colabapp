import { IDocument } from '@chrisgriffithpsu/colab-shared/src';
import { getDocumentByIdService } from '@document/services/document.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const documentById = async (req: Request, res: Response): Promise<void> => {
    const document: IDocument = await getDocumentByIdService(req.params.documentId);
    res.status(StatusCodes.OK).json({ document });
};

export { documentById };