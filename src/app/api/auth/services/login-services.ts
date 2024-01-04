import prisma from "@/lib/db"
import { sendMagicLink } from "@/utils/mailer"
import jwt from 'jsonwebtoken'

export async function validateEmailAndSendMagicLink(data: any) {
    
    try {
        const emailExists = await prisma.account.findUnique({
            where: {
                email: data.email
            }
        })

        if (!emailExists) {
            throw new Error('Email does not exist')
        }


        const magicLinkToken = jwt.sign({email: data.email}, process.env.JWT_SECRET!, {expiresIn: 60 * 5})
        let link = `${process.env.APP_URL}/api/auth/login/verify/${magicLinkToken}`

        await sendMagicLink(data.email, link)
    } catch (err: any) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}

export async function verifyMagicLinkAndGenerateJWT(token: string): Promise<string> {
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if (!decoded) {
            throw new Error('Invalid token')
        }

        const email: string = (decoded as any).email

        const user = await prisma.account.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('User does not exist')
        }

        const jwtToken = jwt.sign(user, process.env.JWT_SECRET!, {expiresIn: 60 * 60 * 24 * 7})

        return jwtToken

    } catch (err: any) {
        console.log(err)
        throw new Error('Internal Server Error')
    }

}