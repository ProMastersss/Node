import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(path.resolve(), 'app/public/images/avatars/'));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

export const fileMiddleware = multer({
  storage,
}).single('avatar');
