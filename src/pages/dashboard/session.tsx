import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {sessionInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    session:TableRow[];
}
const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
     
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

        const userSession = await decrypt(token);

        if (!userSession || userSession.expiresAt < Date.now()) {
            return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
            };
        }

        
    
        
      try{
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/session/read');
        if (!res.ok) {
            return {
                props: {
                    session: [],
                    userId:userSession.userId,
                },
            };
        }
        const session:TableRow[]=await res.json();
        
        return{
            props:{
                session:session,
                userId:userSession.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                session:[],
                userId:userSession.userId,
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