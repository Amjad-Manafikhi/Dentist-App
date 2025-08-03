import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {p_cInput} from '../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    p_c:TableRow[];
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

        
    
      console.log('Server-side cookies:', cookies); // This will include HTTP-only cookies like "session"
      try{
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/p_c/read');
        if (!res.ok) {
            return {
                props: {
                    p_c: [],
                    userId:session.userId,
                },
            };
        }
        const p_c:TableRow[]=await res.json();
        
        return{
            props:{
                p_c:p_c,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                p_c:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function p_c({p_c}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={p_cInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            p_cInput.map(input => input.name)
                        }
                        body={p_c}
                        inputType={p_cInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}