const twilio = require('twilio');
require('dotenv');
// Create a Twilio client
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.sendMessage = (to, otp) => {
    // Use the Twilio client to send an SMS
    client.messages
        .create({
            body: `welcome from wholesale app!!!your temporary password is ${otp}. You can use this to login or use forgot password to reset password`,
            to: '+91' + to,
            from: process.env.PHONE_NUMBER, // Twilio phone number
        })
        .then(() => {
            console.log(`Message sent`);
        })
        .catch((error) => {
            console.error('Error sending SMS:', error);
        });
};
