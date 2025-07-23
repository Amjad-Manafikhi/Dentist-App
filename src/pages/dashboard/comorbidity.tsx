import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {comorbidityInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    comorbidity:TableRow[];
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log("asdf")
        const cookieHeader = context.req.headers.cookie || '';
        const cookies = parse(cookieHeader);
        const token = cookies.session;

        if (!token) {
            return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
            };
        }

        const session = await decrypt(token);

        if (!session || session.expiresAt < Date.now()) {
            return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
            };
        }

        
    
      console.log('Server-side cookies:', cookies); // This will include HTTP-only cookies like "session"
      try{
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/comorbidity/read');
        if (!res.ok) {
            return {
                props: {
                    comorbidity: [],
                    userId:session.userId,
                },
            };
        }
        const comorbidity:TableRow[]=await res.json();
        
        return{
            props:{
                comorbidity:comorbidity,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                comorbidity:[],
                userId:session.userId,
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