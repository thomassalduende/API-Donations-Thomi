import { FormDonation } from '@/components/FormDonation'

export default function Home() {
  return (
    <section className=' container m-auto grid min-h-screen grid-rows-[auto, 1fr, auto] px-4 font-sans antialiased'>
      <header className='text-xl font-bold leading-[4rem]'>Doname Algo Rata</header>
      <main className='py-8'>
        <FormDonation />
      </main>
      <footer className='text-center leading-[4rem] opacity-70'>
        © {new Date().getFullYear()} ThomasSalduende
      </footer>
    </section>
  )
}
