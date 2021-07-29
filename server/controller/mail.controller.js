// const nodemailer = require("nodemailer");

// async function main() {

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         port: 465,
//         auth: {
//             user: "huynhminhdanh1110@gmail.com",
//             pass: "ujhennqthvpkvdyp",
//         },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Minh danh" <huynhminhdanh1110@gmail.com>', // sender address
//         to: "", // list of receivers
//         subject: "anonymous", // Subject line
//         text: "Hello", // plain text body
//         html: "<b style='font-size:200px;'>chi</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// module.exports = main;