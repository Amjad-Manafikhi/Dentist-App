import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
 import {useState} from "react";
import {patientInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    patients:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/patients/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    patients: []
                },
            };
        }
        const patients:TableRow[]=await res.json();

        return{
            props:{
                patients:patients,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                patients:[]
            }
        }
    }
}
    
export default function Patient({patients}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={patientInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            patientInput.map(input => input.name)
                        }
                        body={patients}
                    />
                    
                </main>
            </Layout>
        </div>
    ) 
}