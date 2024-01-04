import { NR } from "@/utils/network-manager"
import { NextRequest, NextResponse } from "next/server"
import { validateEmailAndSendMagicLink } from "../services/login-services"

export async function POST(req: NextRequest) {

    const data = await req.json()

    try {
        await validateEmailAndSendMagicLink(data)
        return NextResponse.json(NR.success('Email has been sent to you'), {status: 200})
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(NR.fail(err), {status: 500})
    }
}