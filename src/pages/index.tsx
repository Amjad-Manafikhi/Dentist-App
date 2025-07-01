import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
 import {useState} from "react";
import {sessionInput} from './../components/FormInput';
import Table from "@/components/Table";
import { AddSession, TableRow } from "@/models/Database";
import AddSessionForm from './../components/AddSessionForm';
type Props ={
    session:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/session/read');
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
  
  const [formValues, setFormValues]=useState<AddSession>({student_id:0,case_id:0,course_id:0,materials:[]});

    return(
        <div className="min-h-screen">
            <Layout head={sessionInput}>

                <main  className="pt-20 p-7  flex-grow">


                    
                    <Table 
                        head={["student id", "case id", "course id", "mate1rials"]}
                        body={session}
                    /> 

                    <AddSessionForm formValues={formValues} setFormValues={setFormValues}/>
                </main>
            </Layout>
        </div>
    ) 
}