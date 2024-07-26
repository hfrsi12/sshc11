const mailgun = require('mailgun-js');

// إعداد عميل Mailgun
const mg = mailgun({ apiKey: 'YOUR_MAILGUN_API_KEY', domain: 'YOUR_DOMAIN_NAME' }); // استبدل بمفتاح API ونطاقك

exports.handler = async function(event, context) {
    const data = {
        from: 'your-email@your-domain.com', // عنوان البريد الإلكتروني الذي سترسل منه الرسائل
        to: 'nwralhb1556@gmail.com', // البريد الإلكتروني الذي ستتلقى الإشعارات عليه
        subject: 'New Registration Notification',
        text: 'A new user has registered on your site.'
    };

    try {
        await mg.messages().send(data);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email', error: error.message })
        };
    }
}
