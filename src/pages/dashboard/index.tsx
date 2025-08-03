import Layout from "@/components/Layout"
import { z } from 'zod';
import PasswordUpdateForm from './../../components/PasswordUpdateForm';
import NameUpdateForm from "@/components/NameUpdateForm";
import { Toaster } from "react-hot-toast";


const formSchema = z
.object({
    firstName: z.string().min(1," This field is required"),
    secondName: z.string().min(1," This field is required"),
})

const passwordFormSchema = z
.object({
    oldPassword:z.string().min(8, 'Password should be at least 8 characters'),
    newPassword: z.string().min(8, 'Password should be at least 8 characters'),
    confirmNewPassword: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>;


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