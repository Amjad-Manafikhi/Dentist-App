import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {materialInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    material:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/material/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    material: []
                },
            };
        }
        const material:TableRow[]=await res.json();
        
        return{
            props:{
                material:material,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                material:[]
            }
        }
    }
}
    
export default function Material({material}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={materialInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            materialInput.map(input => input.name)
                        }
                        body={material}
                        inputType={materialInput}
                    />  
                </main>
            </Layout>
        </div>
    ) 
}