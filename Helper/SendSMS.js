// require('dotenv').config();

// const acccountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require('twilio')(acccountSid, authToken);

// const sendSMS = async (body,phoneNumbers) =>{

//     if (!Array.isArray(phoneNumbers)) {
//         console.log('phoneNumbers should be an array of phone numbers.');
//         return;
//     }

// let msgOption ={
//     from: process.env.TWILIO_FROM,
//     // to: process.env.TWILIO_TO,
//     body: body
// };

// for (let number of phoneNumbers){
//     msgOption.to = number;
// try{
//     const message = await client.messages.create(msgOption);
//     console.log(`Message sent to ${number}:`,message.sid);
//     }catch(err){
//         console.log(`Error sending message to ${number}:`, err);
// }
// }
// }
// const phoneNumbers = ['+918847853348','+919348586355'];
// sendSMS('Hello ',phoneNumbers);

// module.exports = sendSMS;