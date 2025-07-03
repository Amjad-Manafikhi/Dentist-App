import { FormEvent } from 'react';
import {TableRow} from './../models/Database';
import { useRouter } from "next/router";
import {Toaster, toast} from "react-hot-toast"

type Props={
    tableInputs:{name:string, type:string}[];
    formValues:TableRow;
    setFormValues:React.Dispatch<React.SetStateAction<TableRow>>;
    idToEdit?:number;
}

const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    


export default function Form({tableInputs, idToEdit, formValues, setFormValues}:Props){
    
      const router = useRouter();
      const match = router.pathname.match(/[^/]+$/);
      const lastSegment = match ? match[0] : null;

      function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value}=e.target;
        setFormValues(
          prev => (
            {
              ...prev,
               [name]:value
            }
        )
        )
      }

    async function handleSubmit(e:  FormEvent<HTMLFormElement>, id?:number){
        e.preventDefault()
        if(id){
          try {
            const res = await fetch(NEXT_PUBLIC_API_URL+'/api/'+lastSegment+'/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRow:formValues, id:id}),
            });

            const data = await res.json();
            console.log(formValues)

            if (res.ok) {
                router.reload();
            toast.success('Updated Successfully!')
            console.log('updated:', data);
            // Optionally refresh state or re-fetch patients here
            } else {
            console.error('update failed:', data.message);
            }
        } catch (error) {
            toast.error(`Error updating ${lastSegment} record`)
            console.error(`Error updating ${lastSegment}:`, error);
        }
    }
    else {
         try {
            const res = await fetch(NEXT_PUBLIC_API_URL+'/api/'+lastSegment+'/create', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRow:formValues }),
            });

            const data = await res.json();

            if (res.ok) {
                router.reload();
            toast.success('Submited Successfully!')
            console.log('created:', data);
            // Optionally refresh state or re-fetch patients here
            } else {
                toast.error(`Error Creating ${lastSegment} record`)
            console.error('create failed:', data.message);
            }
        } catch (error) {
            console.error(`Error creating ${lastSegment}:`, error);
        }
        
    }
       // setFormValues(intialFormValues);

    }


    const inputs=tableInputs.map((input)=>{
        if(input.name==='id')return null
        return(
            <>
                <label className="mt-2" htmlFor={input.name}>{input.name}</label>
                <input 
                 type={input.type} 
                 name={input.name} 
                 value={formValues[input.name as keyof typeof formValues]} 
                 onChange={handleChange}  
                 className="border w-full h-8 rounded-md text-sm px-3"
                />
            </>
        )
    })
    return(
        <>
        <div><Toaster/></div>
        <form onSubmit={(e)=>handleSubmit(e, idToEdit)} className="flex flex-col  p-5 w-[60%] max-w-[500px] m-auto border rounded-md" action="">
              {inputs}
              <button
                className=" mt-4 m-auto bg-[#2563EB] rounded-md px-4 py-2 text-sm font-bold items-center justify-center text-primary cursor-pointer "
                type="submit">submit</button>
            </form>
        </>
    ) 

}
