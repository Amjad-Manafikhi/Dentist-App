import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {s_mInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    s_m:TableRow[];
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

        const session = await decrypt(token);

        if (!session || session.expiresAt < Date.now()) {
            return {
            redirect: {
                destination: '/signup',
                permanent: false,
            },
            };
        }

        
    
        
      try{
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/s_m/read');
        if (!res.ok) {
            return {
                props: {
                    s_m: [],
                    userId:session.userId,
                },
            };
        }
        const s_m:TableRow[]=await res.json();
        
        return{
            props:{
                s_m:s_m,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_m:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function s_m({s_m}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_mInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_mInput.map(input => input.name)
                        }
                        body={s_m}
                        inputType={s_mInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}