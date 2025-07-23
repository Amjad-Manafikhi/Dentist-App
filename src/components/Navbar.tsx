import { FaTooth } from "react-icons/fa";
import { SidebarTrigger } from './ui/sidebar';
import Link from "next/link";
import  Cookies from 'js-cookie'
import { useRouter } from "next/router";
export const Navbar = () =>{
    const router= useRouter();   

    async function logout() {
        try {
            console.log("zxcvzxcv")
            const response = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            console.error('Logout failed');
            return;
            }

            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
        }

    
    const loggedIn = Cookies.get('loggedIn');
    console.log(loggedIn)
    return (
        <div className=" w-[100%] h-12 bg-gray-50 shadow-sm rounded-md border border-gray-100 sticky top-2 flex flex-wrap justify-between px-16 items-center z-5">
            <div className='flex gap-4'>
                <SidebarTrigger/>
                <h2 className='text-lg'>Dental Education System</h2>
            </div>
            {!loggedIn && <div className="flex gap-2 ml-auto mr-5">
                <Link href="/login" className="underline ">Log in</Link>
                <Link href="/signup" className="underline">Sign up</Link>
            </div>}

            {loggedIn&& <div className="flex gap-2 ml-auto mr-5">
                <button className="underline" onClick={logout}>Log out</button>
                <Link href="/profile" className="underline">profile</Link>
            </div>}
           <FaTooth className='w-5 h-5' />
        </div>
    )
}
export default Navbar 