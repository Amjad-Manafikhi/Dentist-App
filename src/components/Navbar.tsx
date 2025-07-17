import { FaTooth } from "react-icons/fa";
import { SidebarTrigger } from './ui/sidebar';

export const Navbar = () =>{
    

    
    
    
    return (
        <div className=" w-[100%] h-12 bg-gray-50 shadow-sm rounded-md border border-gray-100 sticky top-2 flex flex-wrap justify-between px-16 items-center z-5">
            <div className='flex gap-4'>
            <SidebarTrigger/>
            <h2 className='text-lg'>Dental Education System</h2>
            </div>


           <FaTooth className='w-5 h-5' />
        </div>
    )
}
export default Navbar 