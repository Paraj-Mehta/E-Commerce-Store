const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mehta.paraj007@gmail.com",
    pass: "ojbw uscs cacb pfqn",
  },
});

const sendEmail = (to, subject, text) =>{ 
    const mailOptions = {
        from: "mehta.paraj007@gmail.com",
        to : "mehta.paraj007@gmail.com",
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info)=>{ 
        if(error) {

            console.log(error);

        }else{

            console.log("Email sent to: " + info.response);

        }
    });
}

module.exports = sendEmail;