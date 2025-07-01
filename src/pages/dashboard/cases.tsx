import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {casesInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    cases:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/cases/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    cases: []
                },
            };
        }
        const cases:TableRow[]=await res.json();
        
        return{
            props:{
                cases:cases,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                cases:[]
            }
        }
    }
}
    
export default function Casess({cases}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={casesInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            casesInput.map(input => input.name)
                        }
                        body={cases}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}