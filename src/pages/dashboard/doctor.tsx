import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {doctorInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    doctor:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/doctor/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    doctor: []
                },
            };
        }
        const doctor:TableRow[]=await res.json();
        
        return{
            props:{
                doctor:doctor,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                doctor:[]
            }
        }
    }
}
    
export default function Doctor({doctor}:Props){
        
    

    return(
        <div className="min-h-screen">
            <Layout head={doctorInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            doctorInput.map(input => input.name)
                        }
                        body={doctor}
                        inputType={doctorInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}