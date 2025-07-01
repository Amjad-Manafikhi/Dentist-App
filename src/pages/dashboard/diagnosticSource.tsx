import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
import {useState} from "react";
import {diagnosticSourceInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    diagnosticSource:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/diagnosticSource/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    diagnosticSource: []
                },
            };
        }
        const diagnosticSource:TableRow[]=await res.json();
        
        return{
            props:{
                diagnosticSource:diagnosticSource,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                diagnosticSource:[]
            }
        }
    }
}
    
export default function DiagnosticSource({diagnosticSource}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={diagnosticSourceInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            diagnosticSourceInput.map(input => input.name)
                        }
                        body={diagnosticSource}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}