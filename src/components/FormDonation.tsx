import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })

export function FormDonation() {

    async function donateSubmit(formData: FormData) {
        'use server'

        const message = formData.get('message') as string;
        const amount = formData.get('amount');

        const preference = new Preference(client);

        const compra = await preference.create({
            body: {
                items: [
                    {
                        id: 'donation',
                        title: message,
                        quantity: 1,
                        unit_price: Number(amount)
                    }
                ],
                back_urls: {
                    success: 'https://api-donations-thomi.vercel.app/',
                    pending: 'https://api-donations-thomi.vercel.app/',
                }
            },
        });

        redirect(compra?.sandbox_init_point!);
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Girame Cash</h2>
            <form action={donateSubmit}>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-white font-bold mb-2">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full border rounded-md p-2 bg-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-white font-bold mb-2">Total a Donar:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="w-full border rounded-md p-2 bg-gray-700"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}