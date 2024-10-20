import Layout from '@/components/layout/layout';
import Navbar from '@/components/Navbar/navbar';

export default function BankIndexPage() {
    return (
        <Layout title='Not Found'>
            <main>
                <Navbar />
                <div className='min-h-screen w-full h-screen bg-white'>
                    <div className='flex flex-col w-full h-full justify-center items-center text-center'>
                        <h1 className='ptm-h1 font-extrabold'>404</h1>
                        <p className='ptm-h4'>Page Not Found</p>
                    </div>
                </div>
            </main>
        </Layout>
    )
}