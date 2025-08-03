import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import {courseInput} from './../../components/FormInput';
import Table from "@/components/Table";
import { TableRow } from "@/models/Database";
import { parse } from 'cookie';
import { decrypt } from "@/lib/session";
type Props ={
    userId: string;
    course:TableRow[];
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
          const res = await fetch(NEXT_PUBLIC_API_URL+'/api/course/read');
        if (!res.ok) {
            return {
                props: {
                    course: [],
                    userId:session.userId,
                },
            };
        }
        const course:TableRow[]=await res.json();
        
        return{
            props:{
                course:course,
                userId:session.userId,
            }
        }
    }
    catch(error){
        console.log(error);
        return{
            props:{
                course:[],
                userId:session.userId,
            }
        }
    }
      
}
    
export default function Course({course}:Props){
        

    return(
        <div className="min-h-screen">
            <Layout head={courseInput}>

                <main  className="pt-20 p-7  flex-grow">
                    <Table 
                        head={
                            courseInput.map(input => input.name)
                        }
                        body={course}
                        inputType={courseInput}
                    /> 
                </main>
            </Layout>
        </div>
    ) 
}