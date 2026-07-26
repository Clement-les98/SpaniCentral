const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

exports.sendMessage = async (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;

    try {

        // Email to you
        await brevo.transactionalEmails.sendTransacEmail({

            sender: {
                name: process.env.SENDER_NAME,
                email: process.env.SENDER_EMAIL
            },

            to: [
                {
                    email: process.env.SENDER_EMAIL,
                    name: process.env.SENDER_NAME
                }
            ],

            replyTo: {
                email: email,
                name: name
            },

            subject: `New Contact Form: ${subject}`,

            htmlContent: `
                <h2>New Contact Form Submission</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });

        // Confirmation email
        await brevo.transactionalEmails.sendTransacEmail({

            sender: {
                name: process.env.SENDER_NAME,
                email: process.env.SENDER_EMAIL
            },

            to: [
                {
                    email: email,
                    name: name
                }
            ],

            subject: "We've received your message",

            htmlContent: `
                <h2>Thank you for contacting SpaniCentral!</h2>

                <p>Hello ${name},</p>

                <p>
                    We have successfully received your message.
                    Our team will respond as soon as possible.
                </p>

                <p>
                    Thank you for choosing
                    <strong>SpaniCentral</strong>.
                </p>

                <br>

                <p>
                    Regards,<br>
                    SpaniCentral Team
                </p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully."
        });

    }
    catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to send email."
        });

    }

};