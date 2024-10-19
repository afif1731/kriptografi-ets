import Image from 'next/image'
import Logo from '@/components/assets/helth-logo.png'
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    mobileNavContainerVariant,
    mobileNavExitProps,
} from '../config/animation.config'

const NavList = () => {
    return (
        <>
            <ul className=' flex md:flex-row flex-col items-center md:gap-[2vw] lg:gap-[3vw] gap-[8vw]'>
                {
                    [
                        ['#about', 'ABOUT US'],
                        ['#program', 'PROGRAM'],
                        ['#bank', 'BANK'],
                        ['#daftar', 'DAFTAR']
                    ].map(([href, title]) => (
                        <li key={title}><a href={href} className='md:ptm-p2 ptm-p4 font-normal hover:text-yellow-300 duration-300 text-black'>{title}</a></li>
                    ))
                }
                <li className='block md:hidden hover:scale-105 duration-300 md:py-0 py-28'>
                    <a href='#' target='_blank' rel='noopener noreferrer' className=' flex align-middle items-center bg-[#D9D9D9] bg-opacity-30 rounded-full py-1 px-3 border border-white'>
                        <span className=' text-black md:ptm-p3 ptm-p4 font-medium'>LOGIN</span>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default function navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toogleBurger = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-white shadow-md shadow-black/10 absolute min-w-full'>
            <div className=' py-4 sm:py-2 md:px-10 px-5 mx-auto'>
                <div className='flex justify-between items-center text-slate-100'>
                    <a className='flex w-[20%]' href='/'>
                        <div className='flex flex-row hover:scale-105 duration-300 items-center'>
                            <p className=' flex items-center md:size-[48px] size-[36px]'>
                                <Image src={Logo} alt='Logo' width={48} height={48}></Image>
                            </p>
                            <div className=' flex flex-col px-3 ptm-h5 text-black'>
                                <p>Crypto Health</p>
                            </div>
                        </div>
                    </a>
                    <div className=' md:static md:block hidden md:min-h-fit min-h-[60vh] left-0 top-[95%] md:w-auto w-full py-3'>
                        <NavList/>
                    </div>
                    
                    <div className=' md:hidden hover:text-yellow-300 duration-300'>
                        <button id='burger' onClick={toogleBurger}>
                            {
                                isOpen
                                ? <IoCloseSharp className=' w-8 h-8 hidden text-black' />
                                : <GiHamburgerMenu className=' w-8 h-8 text-black'/>
                            }
                        </button>
                    </div>
                    <AnimatePresence mode='wait'>
                        {
                            isOpen && (
                                <motion.div
                                    layout='position'
                                    variants={mobileNavContainerVariant} {...mobileNavExitProps}
                                    initial='hidden'
                                    animate='show'
                                    className=' md:static absolute md:hidden bg-black bg-opacity-70 backdrop-blur-sm md:min-h-fit min-h-screen left-0 top-0 md:w-auto w-full py-5'
                                >
                                    <div className=' flex md:hidden hover:text-yellow-300 duration-300 justify-end px-5 py-2'>
                                        <button onClick={toogleBurger}>
                                            {
                                                isOpen
                                                ? <IoCloseSharp className=' w-8 h-8 text-black' />
                                                : <GiHamburgerMenu className=' w-8 h-8 text-black'/>
                                            }
                                        </button>
                                    </div>
                                    <div className=' py-8'>
                                        <NavList/>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>

                    <div className=' hidden lg:block hover:scale-105 duration-300 w-[20%]'>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}