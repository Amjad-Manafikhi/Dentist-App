import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {s_s_cInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    s_s_c:TableRow[];
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

        const userRole = cookies.userRole
        if(userRole!=="doctor"){
            return {
            redirect: {
                destination: '/',
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/s_s_c/read');
        if (!res.ok) {
            return {
                props: {
                    s_s_c: [],
                    userId:session.userId,
                },
            };
        }
        const s_s_c:TableRow[]=await res.json();
        
        return{
            props:{
                s_s_c:s_s_c,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                s_s_c:[],
                userId:session.userId,
            }
        }
    }
      
} 
export default function s_s_c({s_s_c}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={s_s_cInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            s_s_cInput.map(input => input.name)
                        }
                        body={s_s_c}
                        inputType={s_s_cInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}