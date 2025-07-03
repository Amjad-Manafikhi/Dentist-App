import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {comorbidityInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    comorbidity:TableRow[];
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/comorbidity/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    comorbidity: []
                },
            };
        }
        const comorbidity:TableRow[]=await res.json();
        
        return{
            props:{
                comorbidity:comorbidity,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                comorbidity:[]
            }
        }
    }
}
    
export default function Comorbidity({comorbidity}:Props){
        
    

    return(
        <div className="min-h-screen">
            <Layout head={comorbidityInput}>

                <main  className="pt-20 p-7 flex-grow">
                    
                    <Table 
                        head={
                            comorbidityInput.map(input => input.name)
                        }
                        body={comorbidity}
                        inputType={comorbidityInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}