import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {d_sInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    d_s:TableRow[];
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/d_s/read');
        if (!res.ok) {
            return {
                props: {
                    d_s: [],
                    userId:session.userId,
                },
            };
        }
        const d_s:TableRow[]=await res.json();
        
        return{
            props:{
                d_s:d_s,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                d_s:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function d_s({d_s}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={d_sInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            d_sInput.map(input => input.name)
                        }
                        body={d_s}
                        inputType={d_sInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}