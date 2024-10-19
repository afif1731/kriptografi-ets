import Image from 'next/image'
import Logo from '@/components/assets/helth-logo.png'
import { footerData } from '@/components/assets/data';
import { FiFacebook, FiYoutube } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { PiTiktokLogo } from 'react-icons/pi';

export default function Footer() {
    return (
        <div className=' flex flex-col bottom-0 m-0 w-full bg-black text-white px-8 pt-8 pb-3'>
            <div className='footer-upper-part flex flex-col w-full'>
                <p className=' ptm-p2'>CONTACT US</p>
                <div className='flex flex-row items-center py-5'>
                    <Image src={Logo} alt='Logo' width={64} height={64} className='flex items-center size-[64px]'></Image>
                    
                    <div className=' flex flex-col px-3 text-base'>
                        <p className=' ptm-logo-text'>Crypto Health</p>
                    </div>
                </div>
            </div>

            <div className='footer-middle-part grid grid-cols-5 grid-flow-row-dense lg:gap-3 gap-10 border-b-2 pb-8 pt-5 lg:pt-1'>
                <div className=' lg:col-span-2 md:col-span-2 col-span-5'>
                    <p className='ptm-p3'>{footerData.address_line_1}</p>
                    <p className='ptm-p3'>{footerData.address_line_2}</p>
                </div>
                <div className=' lg:col-span-2 md:col-span-3 col-span-5'>
                    {
                        footerData.contact.phone.map(phone_num => (
                            <p className=' py-1 ptm-p3' key={phone_num.name}><span>{phone_num.telp}</span> (<span>{phone_num.name}</span>)</p>
                        ))
                    }
                    <p className=' py-2 break-words ptm-p3'>{footerData.contact.email}</p>
                </div>
                <div className='flex flex-col lg:col-span-1 md:col-span-5 col-span-5 lg:text-right text-left'>
                    <p className='ptm-p3'>Folllow us</p>
                    <p className='ptm-p3'>on media sosial</p>
                    <div className=' flex flex-row lg:justify-end justify-start gap-5 py-3'>
                        <a href={footerData.social_media.facebook} className=' text-white' target='_blank' rel='noopener noreferrer' aria-label='Facebook Pesantren Teknologi Majapahit'>
                            <FiFacebook className=' size-6' />
                        </a>
                        <a href={footerData.social_media.youtube} className=' text-white' target='_blank' rel='noopener noreferrer' aria-label='Youtube Pesantren Teknologi Majapahit'>
                            <FiYoutube className=' size-6' />
                        </a>
                        <a href={footerData.social_media.wa} className=' text-white' target='_blank' rel='noopener noreferrer' aria-label='Whats App Pesantren Teknologi Majapahit'>
                            <IoLogoWhatsapp className=' size-6' />
                        </a>
                        <a href={footerData.social_media.tiktok} className=' text-white' target='_blank' rel='noopener noreferrer' aria-label='TiktokPesantren Teknologi Majapahit'>
                            <PiTiktokLogo className=' size-6' />
                        </a>
                    </div>
                </div>
            </div>
            <div className=' footer-bottom-part lg:text-right text-center flex flex-col justify-end pt-5 pb-4'>
                <p className='ptm-p3'>
                    © 2024. Kriptografi IT ITS - Kelas A
                </p>
            </div>
        </div>
    )
}