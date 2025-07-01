import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
 import {useState} from "react";
import {supervisorInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    supervisor:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/supervisor/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    supervisor: []
                },
            };
        }
        const supervisor:TableRow[]=await res.json();
        
        return{
            props:{
                supervisor:supervisor,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                supervisor:[]
            }
        }
    }
}
    
export default function Supervisor({supervisor}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={supervisorInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            supervisorInput.map(input => input.name)
                        }
                        body={supervisor}
                    />  
                </main>
            </Layout>
        </div>
    ) 
}