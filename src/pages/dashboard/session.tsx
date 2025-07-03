import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {sessionInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    session:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('/api/session/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    session: []
                },
            };
        }
        const session:TableRow[]=await res.json();
        
        return{
            props:{
                session:session,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                session:[]
            }
        }
    }
}
    
export default function Session({session}:Props){


    return(
        <div className="min-h-screen">
            <Layout head={sessionInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            sessionInput.map(input => input.name)
                        }
                        body={session}
                        inputType={sessionInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}