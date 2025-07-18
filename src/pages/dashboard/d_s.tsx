import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {d_sInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    d_s:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/d_s/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    d_s: []
                },
            };
        }
        const d_s:TableRow[]=await res.json();
        
        return{
            props:{
                d_s:d_s,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                d_s:[]
            }
        }
    }
}
    
export default function d_s({d_s}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={d_sInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            d_sInput.map(input => input.name)
                        }
                        body={d_s}
                        inputType={d_sInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}