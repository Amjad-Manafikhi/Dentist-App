import Layout from "@/components/Layout"
import PasswordUpdateForm from './../../components/PasswordUpdateForm';
import NameUpdateForm from "@/components/NameUpdateForm";
import { Toaster } from "react-hot-toast";

export default function Dashboard(){
    
    return (
        <Layout head={[]}>
            <div className="bg-gray-200  mt-5 border border-gray-200 rounded-md w-[80%] max-w-[550px] mx-auto py-2 px-5 flex items-center flex-col" >
                <div><Toaster/></div>
                <h1 className="text-lg">Personal Infromation</h1>
                <NameUpdateForm/>
                <PasswordUpdateForm/>
            </div>
        </Layout>
    )
}