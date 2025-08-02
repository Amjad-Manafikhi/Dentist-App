import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {studentInput} from './../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import Homepage from "@/components/HomePage";
type Props ={
    student:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/student/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    student: []
                },
            };
        }
        const student:TableRow[]=await res.json();
        
        return{
            props:{
                student:student,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                student:[]
            }
        }
    }
}
    
export default function Student({student}:Props){
        

    return(
        <div className="min-h-screen">
            <Homepage/>
        </div>
    ) 
}