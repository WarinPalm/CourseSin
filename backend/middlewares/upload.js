const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirProfile = path.join(__dirname, '../uploads/profile');
const uploadDirVideo = path.join(__dirname, '../uploads/Video');

if( !fs.existsSync(uploadDirProfile)){
    fs.mkdirSync(uploadDirProfile, { recursive: true });
}
if( !fs.existsSync(uploadDirVideo)){
    fs.mkdirSync(uploadDirVideo, { recursive: true });
}

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirProfile);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirVideo);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storageProfile });
const uploadVideo = multer({ storage: storageVideo });

exports.uploadProfile = (req , res , next) => {
    upload.single('profile') (req , res , (err) => {
        if(err){
            return res.status(500).json({ message : 'Error uploading file' , error : err });
        }
        next();
    })
}

exports.uploadVideo = (req , res , next) => {
    uploadVideo.single('video') (req , res , (err) => {
        if(err){
            return res.status(500).json({ message : 'Error uploading file' , error : err });
        }
        if(!req.file){
            return res.status(400).json({ message : 'No file uploaded' });
        }
        next();
    })
}


