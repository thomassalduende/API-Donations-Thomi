'use client'
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(process.env.URL_SUPABASE!, process.env.KEY_SUPABASE_PUBLIC!)

type Notifications = {
    id: number;
    message: string;
    amount: number;
}
export default function NotificationsPage() {

    const [notifications, setNotifications] = useState<Notifications[]>([])

    useEffect(() => {
        supabase
            .channel('donations')
            .on('postgres_changes', { event: 'INSERT', schema: 'public' }, (change) => {
                setNotifications((notification) => [
                    ...notification,
                    change.new as Notifications]);
            })
            .subscribe()
    }, [])

    useEffect(() => {
        if (notifications.length) {
            const timeout = setTimeout(() => {
                setNotifications((notis) => notis.slice(1));
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [notifications])

    return (
        <section className="grid gap-4 items-center justify-center absolute bottom-4 right-4 bg-black rounded-md border p-4">
            <p className="text-2xl font-bold"> {notifications[0].amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
            <p> {notifications[0].message}</p>
        </section>
    )
}