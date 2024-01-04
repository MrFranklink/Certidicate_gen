const xlsx = require('xlsx');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const ExcelModel = require('../models/excelModel.cjs');

async function uploadExcelData(buffer) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const certificates = data.map((row) => ({
        name: row.name,
        email: row.email,
        mobile: row.mobile,
        amount: row.amount,
        numberoftree: row.numberoftree,
    }));

    const existingData = await ExcelModel.find({ email: { $in: certificates.map(cert => cert.email) } });
    const newData = certificates.filter(cert => !existingData.some(existingCert => existingCert.email === cert.email));

    if (newData.length > 0) {
        await ExcelModel.create(newData);
        console.log("Uploaded");
    } else {
        console.log("No new data to upload");
    }
}

async function sendEmails() {
    
    const mongoData = await ExcelModel.find();

    
    const mongoEmails = new Set(mongoData.map(dbData => dbData.email));

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

   
    const matchingUsers = mongoData.filter(userData => mongoEmails.has(userData.email));

   
    for (const userData of matchingUsers) {
        const pdfDoc = new PDFDocument({ margin: 10, size: [1273, 771] });

        const backgroundImagePath = './public/custom.jpg';
        pdfDoc.image(backgroundImagePath, 0, 0, { width: 1273, height: 771 });
        pdfDoc.font('./public/segoesc.ttf').fontSize(50);
        pdfDoc.text(`${userData.name}`, 600, 300);
        pdfDoc.font('./public/segoesc.ttf').fontSize(20);
        pdfDoc.text(` ${userData.numberoftree}`, 658, 394);
        pdfDoc.fontSize(12).font('Helvetica');

        
        const pdfFilePath = `./public/certificates_${userData.name}.pdf`;
        pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
        pdfDoc.end();

        const pdfBuffer = await new Promise((resolve) => {
            const chunks = [];
            pdfDoc.on('data', (chunk) => chunks.push(chunk));
            pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        });

   
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: 'Tree Planting Report',
            text: `Dear ${userData.name},\n\nAttached is your Tree Planting Report.\n\nRegards,\nYour Organization`,
            attachments: [
                {
                    filename: 'Tree_Planting_Report.pdf',
                    content: pdfBuffer,
                },
            ],
        };

        // Send email
        await transporter.sendMail(mailOptions);
    }
}

module.exports = { uploadExcelData, sendEmails };
