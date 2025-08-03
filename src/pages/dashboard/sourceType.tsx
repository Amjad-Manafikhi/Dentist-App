import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {sourceTypeInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    sourceType:TableRow[];
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/sourceType/read');
        if (!res.ok) {
            return {
                props: {
                    sourceType: [],
                    userId:session.userId,
                },
            };
        }
        const sourceType:TableRow[]=await res.json();
        
        return{
            props:{
                sourceType:sourceType,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                sourceType:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function sourceType({sourceType}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={sourceTypeInput}>

                <main  className="pt-20 p-7  flex-grow">
                    
                    <Table 
                        head={
                            sourceTypeInput.map(input => input.name)
                        }
                        body={sourceType}
                        inputType={sourceTypeInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}