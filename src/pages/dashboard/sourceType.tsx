import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
 import {useState} from "react";
import {sourceTypeInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    sourceType:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/sourceType/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    sourceType: []
                },
            };
        }
        const sourceType:TableRow[]=await res.json();
        
        return{
            props:{
                sourceType:sourceType,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                sourceType:[]
            }
        }
    }
}
    
export default function sourceType({sourceType}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={sourceTypeInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            sourceTypeInput.map(input => input.name)
                        }
                        body={sourceType}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}