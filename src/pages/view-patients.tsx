import Layout from "@/components/Layout";
import Element from "@/components/Element";
import { GetServerSideProps } from "next";
import {patientInput} from './../components/FormInput';
import { TableRow } from "@/models/Database";
type Props ={
    patients:TableRow[];
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const res = await fetch(NEXT_PUBLIC_API_URL+'/api/patients/read');
        if (!res.ok) {
            return {
                props: {
                    patients: []
                },
            };
        }
        const patients:TableRow[]=await res.json();
        
        return{
            props:{
                patients:patients,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                patients:[]
            }
        }
    }
}
    
export default function ViewPatients({patients}:Props){
        
    
    const tableElements=patients.map( element => {
        return (
            <Element 
                key={element.id} 
                head={
                    patientInput.map(input => input.name)
                }
                element={element}
                inputType={patientInput}
                
                
            />
        )
    })

    return(
        <div className="min-h-screen">
            <Layout head={patientInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <table className="z-0"> 
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Second Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Illness</th>
                                <th>Actions</th>

                                
                            </tr>
                        </thead>

                        <tbody>
                            
                            {tableElements}  
                        </tbody>
                    </table> 
                </main>
            </Layout>
        </div>
    ) 
}