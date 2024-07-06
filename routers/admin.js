const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const { adminloginpage, adminlogincheck, admindashboard } = require('../controllers/regcontroller');
const { adminbannerpage, adminbannerupdateform, adminbannerupdate } = require('../controllers/bannercontroller');
const { adminservice, adminserviceaddform, adminserviceadd, adminservicedelete, adminservicestatusupdate } = require('../controllers/servicescontroller');
const { admintesti, admintestistatusupdate } = require('../controllers/testicontroller');
const { adminquery, adminqueryreply } = require('../controllers/querycontroller');
const Query = require('../models/query');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 } // corrected limits key
});

router.get('/', adminloginpage);
router.post('/', adminlogincheck);
router.get('/dashboard', admindashboard);
router.get('/banner', adminbannerpage);
router.get('/bannerupdate/:id', adminbannerupdateform);
router.post('/bannerupdate/:id', upload.single('img'), adminbannerupdate);
router.get('/service', adminservice);
router.get('/serviceadd', adminserviceaddform);
router.post('/serviceadd', upload.single('img'), adminserviceadd);
router.get('/servicedelete/:id', adminservicedelete);
router.get('/servicestatusupdate/:id', adminservicestatusupdate);
router.get('/testi', admintesti);
router.get('/testistatusupdate/:id', admintestistatusupdate);
router.get('/query', adminquery);
router.get('/reply/:id', adminqueryreply);

router.post('/reply/:id', upload.single('attachment'), async (req, res) => {
    try {
        const id = req.params.id;
        const path = req.file.path;
        const { emailto, emailfrom, Subject, body } = req.body;
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        console.log('Connected to SMTP server');
        
        const info = await transporter.sendMail({
            from: emailfrom,
            to: emailto,
            subject: Subject,
            text: body,
            attachments: [{ path: path }]
        });
        
        console.log('Email sent');
        await Query.findByIdAndUpdate(id, { status: 'replied' });
        res.redirect('/admin/query');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router;
