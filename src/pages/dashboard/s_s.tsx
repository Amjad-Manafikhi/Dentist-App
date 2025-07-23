import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {s_sInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    s_s:TableRow[];
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/s_s/read');
        if (!res.ok) {
            return {
                props: {
                    s_s: [],
                    userId:session.userId,
                },
            };
        }
        const s_s:TableRow[]=await res.json();
        
        return{
            props:{
                s_s:s_s,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_s:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function s_s({s_s}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_sInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_sInput.map(input => input.name)
                        }
                        body={s_s}
                        inputType={s_sInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}