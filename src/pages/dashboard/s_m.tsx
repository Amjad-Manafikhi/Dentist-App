import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
import {useState} from "react";
import {s_mInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    s_m:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/s_m/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    s_m: []
                },
            };
        }
        const s_m:TableRow[]=await res.json();
        
        return{
            props:{
                s_m:s_m,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_m:[]
            }
        }
    }
}
    
export default function s_m({s_m}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_mInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_mInput.map(input => input.name)
                        }
                        body={s_m}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}