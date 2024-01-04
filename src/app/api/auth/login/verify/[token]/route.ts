import { NR } from "@/utils/network-manager";
import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkAndGenerateJWT } from "../../../services/login-services";

export async function GET(req: NextRequest, {params}: {params: {token: string}}) {

    const magicLinkToken = params.token

    try {
        const jwtToken = await verifyMagicLinkAndGenerateJWT(magicLinkToken)
        let response = NextResponse.redirect(new URL('/home', req.url), {status: 302})
        response.cookies.set('jwt', jwtToken, {httpOnly: true})
        return response
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(NR.fail('Internal Server Error'), {status: 500})
    }
}