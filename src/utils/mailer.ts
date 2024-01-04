import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
})

export const sendMagicLink = async (email: string, link: string) => {
    await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Magic Link',
        html: `This is your sign in link: <a href="${link}">Sign In</a>`
    })
}