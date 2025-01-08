const express = require('express');
const { uploadBill } = require('../controllers/billController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/'});

router.post('/upload', upload.single('bill'), uploadBill);

module.exports = router;
