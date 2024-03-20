import express, { Router } from 'express';
import { createDocument } from '@document/controllers/create';
import { documentById } from '@document/controllers/get';
import { deleteDocument } from '@document/controllers/delete';

const router: Router = express.Router();

const documentRoutes = (): Router => {
    router.post('/create', createDocument);
    router.get('/:documentId', documentById);
    router.delete('/:documentId', deleteDocument);

    return router;
};

export { documentRoutes };