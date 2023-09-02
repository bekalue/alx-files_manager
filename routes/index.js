import express from 'express';
import AppController from '../controllers/AppController';
// import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
// import FilesController from '../controllers/FilesController';
// import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
// import { APIError, errorResponse } from '../middlewares/error';

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// router.get('/connect', basicAuthenticate, AuthController.getConnect);
// router.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

router.post('/users', UsersController.postNew);
// router.get('/users/me', xTokenAuthenticate, UsersController.getMe);

// router.post('/files', xTokenAuthenticate, FilesController.postUpload);
// router.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
// router.get('/files', xTokenAuthenticate, FilesController.getIndex);
// router.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
// router.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
// router.get('/files/:id/data', FilesController.getFile);

// router.all('*', (req, res, next) => {
// errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
// });
// router.use(errorResponse);

export default router;
