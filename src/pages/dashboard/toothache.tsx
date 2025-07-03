import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {toothacheInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    toothache:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('/api/toothache/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    toothache: []
                },
            };
        }
        const toothache:TableRow[]=await res.json();
        
        return{
            props:{
                toothache:toothache,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                toothache:[]
            }
        }
    }
}
    
export default function Toothache({toothache}:Props){

    return(
        <div className="min-h-screen">
            <Layout head={toothacheInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            toothacheInput.map(input => input.name)
                        }
                        body={toothache}
                        inputType={toothacheInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}