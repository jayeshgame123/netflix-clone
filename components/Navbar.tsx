import NavItem from '@/components/NavItem'

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import { useCallback, useEffect, useState } from 'react';
import Accountmenu from './AccountMenu';
import Image from 'next/image';

const Navbar = () => {

    const TOP_OFFSET = 66;

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <Image className="h-4 lg:h-7" src="/images/logo.png" alt="" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavItem label='Home' />
                    <NavItem label='Series' />
                    <NavItem label='Films' />
                    <NavItem label='New & Popular' />
                    <NavItem label='My List' />
                    <NavItem label='Browse by languages' />
                </div>
                <div onClick={toggleMobileMenu} className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer'>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className='flex flex-row gap-2 cursor-pointer items-center relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <Image src='/images/default-blue.png' alt='' />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <Accountmenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;