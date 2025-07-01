import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
import {useState} from "react";
import {p_cInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    p_c:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/p_c/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    p_c: []
                },
            };
        }
        const p_c:TableRow[]=await res.json();
        
        return{
            props:{
                p_c:p_c,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                p_c:[]
            }
        }
    }
}
    
export default function p_c({p_c}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={p_cInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            p_cInput.map(input => input.name)
                        }
                        body={p_c}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}