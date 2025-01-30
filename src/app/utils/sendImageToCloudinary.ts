import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    // upload image
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
        transformation: [
          {
            crop: 'auto',
            gravity: 'auto',
          },
          {
            fetch_format: 'auto',
            quality: 'auto',
          },
        ],
      },
      function (error, result) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result as UploadApiResponse);

        // delete local file asynchronously after upload
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('File removed successfully');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
