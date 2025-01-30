import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { IUser } from './user.interface';
import { User } from './user.model';

const createCustomerIntoDB = async (
  file: Express.Multer.File | undefined,
  payload: IUser,
) => {
  const userData: Partial<IUser> = { ...payload };

  try {
    if (file) {
      const imageName = `${payload?.name}${userData.email}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);

      userData.profile = secure_url as string;
    }

    // Save user to DB
    const result = await User.create(userData);

    return result;
  } catch (error: any) {
    throw new Error(`User creation failed: ${error.message}`);
  }
};

export const UserServices = {
  createCustomerIntoDB,
};
