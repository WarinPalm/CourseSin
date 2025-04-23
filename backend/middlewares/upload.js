const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirProfile = path.join(__dirname, '../uploads/profile');
const uploadDirVideo = path.join(__dirname, '../uploads/Video');
const uploadDirThumbnail = path.join(__dirname, '../uploads/video/thumbnail');

if( !fs.existsSync(uploadDirProfile)){
    fs.mkdirSync(uploadDirProfile, { recursive: true });
}
if( !fs.existsSync(uploadDirVideo)){
    fs.mkdirSync(uploadDirVideo, { recursive: true });
}
if( !fs.existsSync(uploadDirThumbnail)){
    fs.mkdirSync(uploadDirThumbnail, { recursive: true });
}

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirProfile);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})


const uploadProfile = multer({ storage: storageProfile });


exports.uploadProfile = (req , res , next) => {
    uploadProfile.single('profile') (req , res , (err) => {
        if(err){
            return res.status(500).json({ message : 'Error uploading file' , error : err });
        }
        next();
    })
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'video') {
        cb(null, uploadDirVideo);
      } else if (file.fieldname === 'thumbnail') {
        cb(null, uploadDirThumbnail);
      } else {
        cb(new Error('Invalid file field'), false);
      }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'thumbnail' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed for thumbnail'), false);
    }
    if (file.fieldname === 'video' && !file.mimetype.startsWith('video/')) {
      return cb(new Error('Only video files allowed for video'), false);
    }
    cb(null, true);
  };
const upload = multer({ storage, fileFilter });

exports.uploadCourseFiles = (req, res, next) => {
    const multiUpload = upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'video', maxCount: 1 }
    ]);
  
    multiUpload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file', error: err.message });
      }
  
      if (!req.files || !req.files['thumbnail'] || !req.files['video']) {
        return res.status(400).json({ message: 'Missing thumbnail or video file' });
      }
  
      next();
    });
  };




