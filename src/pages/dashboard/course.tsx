import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {courseInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
type Props ={
    course:TableRow[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch('/api/course/read');
        console.log(res);
        if (!res.ok) {
            return {
                props: {
                    course: []
                },
            };
        }
        const course:TableRow[]=await res.json();
        
        return{
            props:{
                course:course,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                course:[]
            }
        }
    }
}
    
export default function Course({course}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={courseInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            courseInput.map(input => input.name)
                        }
                        body={course}
                        inputType={courseInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}