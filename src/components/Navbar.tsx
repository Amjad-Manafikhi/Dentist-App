import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTooth } from "react-icons/fa";
import { SidebarTrigger } from './ui/sidebar';

export const Navbar = () =>{
    
    const router= useRouter();
    const route=router.pathname;

    
    
    
    return (
        <div className=" w-[100%] h-12 bg-gray-50 shadow-sm rounded-md border border-gray-100 sticky top-2 flex flex-wrap justify-between px-10 items-center">
            <div className='flex gap-4'>
            <SidebarTrigger/>
            <h2 className='text-lg'>Dental Education System</h2>
            </div>


           <FaTooth className='w-5 h-5' />
        </div>
    )
}
export default Navbar 