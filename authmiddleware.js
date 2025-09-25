const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
        const ext=path.extname(file.originalname);
        cb(null, Date.now() + '-'+file.fieldname+ext);
    }
});

const upload = multer({ storage });
module.exports=upload;