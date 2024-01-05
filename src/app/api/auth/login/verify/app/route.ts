import { NR } from "@/utils/network-manager"
import { NextRequest, NextResponse } from "next/server"
import { verifyMagicLinkAndGenerateJWT } from "../../../services/login-services"

export async function GET(req: NextRequest) {

    const url = new URL(req.url)
    const magicLinkToken = url.searchParams.get('token')

    if (!magicLinkToken) {
        return NextResponse.json(NR.fail('Invalid token'), {status: 400})
    }

    try {
        const jwtToken = await verifyMagicLinkAndGenerateJWT(magicLinkToken)
        return NextResponse.json(jwtToken, {status: 200})
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(NR.fail(err), {status: 500})
    }
}