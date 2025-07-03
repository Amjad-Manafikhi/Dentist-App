import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {s_sInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    s_s:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/s_s/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    s_s: []
                },
            };
        }
        const s_s:TableRow[]=await res.json();
        
        return{
            props:{
                s_s:s_s,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_s:[]
            }
        }
    }
}
    
export default function s_s({s_s}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_sInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_sInput.map(input => input.name)
                        }
                        body={s_s}
                        inputType={s_sInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}