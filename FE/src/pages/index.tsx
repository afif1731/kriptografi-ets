import Layout from '@/components/layout/layout'
import Navbar from '@/components/Navbar/navbar'
import Footer from '@/components/Footer/footer'
import { useState } from 'react'
import { Button, Card, Textarea, Input } from '@material-tailwind/react'
import Image from 'next/image'

import DoctorImg from '@/public/images/doctor.png'
import PsychiatristImg from '@/public/images/psychiatrist.png'


const aboutData = {
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu rhoncus nunc, efficitur rhoncus augue. In sed pretium massa. Mauris id risus ac purus dignissim fringilla. Morbi tincidunt odio ut justo hendrerit posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum placerat erat nisi, sed lacinia ex semper non.'
}

export default function IndexPage() {
  const [address, setAddress] = useState<String>('');
  const [userName, setUserName] = useState<String>('');
  const [phone, setPhone] = useState<String>('');
  const [complaint, setComplaint] = useState<String>('');

  return (
    <Layout title='Home'>
      <main>
        <Navbar />

        <div className='min-h-screen h-auto'>
          <div id='about' className='px-[5%] lg:min-h-screen'>
              <div className=' md:pt-28 pt-24 pb-10'>
                  <h1 className=' ptm-h1 text-center md:px-[10%] px-[6%]'>Welcome to Crypto Health</h1>
              </div>

              <div className='flex flex-col-reverse lg:flex-row lg:gap-10 gap-5 justify-evenly lg:px-0 px-[10%]'>
                  <div className=' flex flex-col w-full'>
                      <div className=' lg:flex hidden flex-col lg:w-[90%]'>
                          <h3 className='ptm-h3'>Tentang Kami</h3>
                      </div>
                      <div className=' py-5 md:text-left text-center'>
                          <p className=' ptm-p'>{aboutData.message}</p>
                      </div>
                  </div>
                  <div className='w-[50%] h-auto rounded-2xl'>
                    <Image src={DoctorImg} alt='Doctor Image' width={512} height={512}></Image>
                  </div>
              </div>
          </div>

          <div id='daftar' className='h-auto pt-5 pb-10 px-[5%] bg-[#DFDFDF] rounded-t-[3rem]'>
            <div className=' text-center'>
                <h1 className=' ptm-h2 px-[6%]'>Punya Keluhan?</h1>
                <p className=' ptm-p4 md:px-[20%] px-[10%] pt-8'>Mari berobat di Crypto Health! Daftarkan Diri Anda Sekarang!!</p>
            </div>

            <div className='flex flex-row justify-around text-left pt-10'>
              <div className='w-auto h-full rounded-2xl'>
                <Image src={PsychiatristImg} alt='Doctor Image' width={450} height={450}></Image>
              </div>
              <Card color='transparent' shadow={false}>
                <form className='mt-4 mb-2 w-96 max-w-screen-lg sm:w-96 bg-white rounded-2xl p-5'>
                  <div className='mb-1 flex flex-col gap-3 text-black'>
                    <p>Nama Lengkap</p>
                    <Input label='nama' variant='outlined' value={userName as string} onChange={(e) => setUserName(e.target.value)} crossOrigin={undefined}></Input>
                    
                    <p>Alamat</p>
                    <Input label='alamat' className='px-2' value={address as string} onChange={(e) => setAddress(e.target.value)} crossOrigin={undefined}></Input>
                    
                    <p>Nomor Telepon</p>
                    <Input label='no. telp' className='px-2' value={phone as string} onChange={(e) => setPhone(e.target.value)} crossOrigin={undefined}></Input>

                    <p>Keluhan</p>
                    <Textarea label='keluhan' className='px-2' value={complaint as string} onChange={(e) => setComplaint(e.target.value)} />
                    
                    <Button className='flex mt-6 w-full' fullWidth type='submit'>
                      <span className=' w-full text-center text-white'>Kirim</span>
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </Layout>
  )
}
