
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'nayakkusum47@gmail.com', // your email
            pass: 'hlxy sxhn uvjv bwmq' // your email password or app-specific password within 2step-vareification
        }
    });

    const mailOptions = {
        from: 'nayakkusum47@gmail.com',
        to: 'nkusum850@gmail.com',
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
