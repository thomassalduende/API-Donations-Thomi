import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const client_mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const supabase = createClient(process.env.URL_SUPABASE!, process.env.KEY_SUPABASE_SECRET!)

type Data = {
    data: {
        id: string
    }
}


export async function POST(request: NextRequest) {
    const body = await request.json().then(data => data as Data);

    const payment = await new Payment(client_mp).get({ id: body.data.id })

    const donation = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description
    };

    await supabase.from('donations').insert(donation);

    return Response.json({ success: true })
}