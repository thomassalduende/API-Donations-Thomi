import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json().then(data => data);
    console.log(body)

    // const payment = await new Payment(client_mp).get({ id: body.data.id })

    // const donation = {
    //     id: payment.id,
    //     amount: payment.transaction_amount,
    //     message: payment.description
    // };

    // await supabase.from('donations').insert(donation);

    return Response.json({ success: true })
}