import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })

export function FormDonation() {

    async function donateSubmit(formData: FormData) {
        'use server'

        const message = formData.get('message');
        const amount = formData.get('amount');

        const preference = await new Preference(client)
            .create({
                body: {
                    items: [
                        {
                            id: 'donation',
                            title: message as string,
                            quantity: 1,
                            unit_price: Number(amount)
                        }
                    ]
                }
            })

        redirect(preference.sandbox_init_point!);
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Formulario</h2>
            <form action={donateSubmit}>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Total a Donar:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    />
                </div>
            </form>
        </div>
    )
}