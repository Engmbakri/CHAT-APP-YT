import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Set up the transporter using your Gmail credentials from the .env file
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Make sure you're using 'gmail'
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address (your email)
        to: options.email, // Recipient's email
        subject: options.subject, // Subject of the email
        text: options.message, // Plain text body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
