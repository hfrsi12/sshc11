const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com', // استبدل هذا بالبريد الإلكتروني الخاص بك
            pass: 'yourpassword'         // استبدل هذا بكلمة مرور البريد الإلكتروني الخاص بك
        }
    });

    let info = await transporter.sendMail({
        from: '"Your Name" <youremail@gmail.com>', // استبدل هذا بالبريد الإلكتروني الخاص بك
        to: 'admin@example.com', // البريد الإلكتروني الذي تريد إرسال الإشعار إليه
        subject: 'New Registration',
        text: 'A new user has registered on your site.'
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent' })
    };
}
