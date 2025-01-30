import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createCustomer,
);

export const UserRoutes = router;
