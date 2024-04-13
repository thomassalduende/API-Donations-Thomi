import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN!, options: { integratorId: process.env.INTEGRATOR_ID! } })

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
                        unit_price: Number(amount),
                        picture_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB98zj8YaRzjuIe5H_Is1kcdFxpjAJw6oN1IQthf-nXA&s"
                    }
                ],
                back_urls: {
                    success: 'https://api-donations-thomi.vercel.app/',
                    pending: 'https://api-donations-thomi.vercel.app/',
                    failure: 'https://api-donations-thomi.vercel.app'
                },
                payer: {
                    name: 'Enzo Bua',
                    phone: {
                        area_code: '3446',
                        number: '377934'
                    },
                    email: 'enzobua86@gmail.com',
                },
                auto_return: 'approved',
                notification_url: 'https://1c8c-190-17-57-6.ngrok-free.app/pagos',
                payment_methods: {
                    installments: 6,

                }
            }
        });

        redirect(compra.init_point!);
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