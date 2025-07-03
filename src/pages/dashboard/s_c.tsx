import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {s_cInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    s_c:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/s_c/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    s_c: []
                },
            };
        }
        const s_c:TableRow[]=await res.json();
        
        return{
            props:{
                s_c:s_c,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_c:[]
            }
        }
    }
}
    
export default function s_c({s_c}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_cInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_cInput.map(input => input.name)
                        }
                        body={s_c}
                        inputType={s_cInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}