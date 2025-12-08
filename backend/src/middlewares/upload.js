import sharp from 'sharp';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const {filename, destination} = req.file;
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);

    const newFilename = `${base}_thumb${ext}`;
    const newPath = path.join(destination, newFilename);

    await sharp(req.file.path).resize(600, 400).toFormat('png').toFile(newPath);
    req.file.thumbFilename = newFilename; // save thumbnail to file object
  } catch (err) {
    console.error('Thumbnail creation failed:', err);
    req.file.thumbFilename = null; // Null, if thumbnail fails
  }

  next();
};

export {upload, createThumbnail};
