import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {diagnosticSourceInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    diagnosticSource:TableRow[]
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/diagnosticSource/read');
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
                        inputType={diagnosticSourceInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}