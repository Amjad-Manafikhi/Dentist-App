import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {sourceTypeInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    sourceType:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/sourceType/read');
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
                        inputType={sourceTypeInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}