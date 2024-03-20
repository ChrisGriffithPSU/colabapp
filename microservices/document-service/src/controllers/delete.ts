import { deleteDocumentService } from "@document/services/document.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const deleteDocument = async (req: Request, res: Response): Promise<void> => {
    await deleteDocumentService(req.params.documentId);
    res.status(StatusCodes.OK).json({ message: `Document ${req.params.documentId} deleted successfully` });
};

export { deleteDocument };