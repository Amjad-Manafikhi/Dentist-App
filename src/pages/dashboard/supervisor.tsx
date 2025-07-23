import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {supervisorInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    supervisor:TableRow[];
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/supervisor/read');
        if (!res.ok) {
            return {
                props: {
                    supervisor: [],
                    userId:session.userId,
                },
            };
        }
        const supervisor:TableRow[]=await res.json();
        
        return{
            props:{
                supervisor:supervisor,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                supervisor:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function Supervisor({supervisor}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={supervisorInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            supervisorInput.map(input => input.name)
                        }
                        body={supervisor}
                        inputType={supervisorInput}
                    />  
                </main>
            </Layout>
        </div>
    ) 
}