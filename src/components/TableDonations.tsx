import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.URL_SUPABASE!, process.env.KEY_SUPABASE_PUBLIC!)

type Donations = {
    id: number;
    created_at: number;
    amount: number;
    message: string;
}[]

export const TableDonations = async () => {

    const donations = await supabase.from('donations').select('*').then(({ data }) => data as unknown as Promise<Donations>)

    return (
        <div className="max-w-[600px] mx-auto bg-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Donaciones</h2>
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Message</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4">{item.id}</td>
                            <td className="py-2 px-4">{item.message}</td>
                            <td className="py-2 px-4 ">{item.amount}</td>
                            <td className="py-2 px-4">{new Date(item.created_at).toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                timeZone: 'UTC'
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

