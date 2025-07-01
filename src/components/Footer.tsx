import { FaTeethOpen } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaWhatsapp  } from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className=" justify-self-end  w-full  bg-secondary h-50 flex gap-30 pt-7 pb-1">
            <div className="flex flex-col  justify-center h-full gap-7 w-full ">
                <div className="flex gap-30 w-full items-center justify-center flex-grow px-20">

                    <FaTeethOpen className="w-20 h-20"/>
                    <hr className="border border-primary h-full "></hr>
                    <div className="flex gap-8">
                        <FaFacebook className="w-8 h-8 cursor-pointer"/>
                        <FaInstagram className="w-8 h-8 cursor-pointer"/>
                        <FaWhatsapp className="w-8 h-8 cursor-pointer"/>
                    </div>
                    <hr className="border border-primary h-full "></hr>
                    <h2 className="text-xl">A university project for managing dental patient data.</h2>
                </div>
                <div className="flex flex-col w-full items-center gap-2">
                    <hr className="border border-primary w-full "></hr>
                    <p className="text-tertiary h-5">© 2025 Dentist Project – Made by Amjad Manafikhi, University of Aleppo</p>

                </div>
            </div>
        </footer>

    )
}