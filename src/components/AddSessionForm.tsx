import { FormEvent } from 'react';
import {AddSession} from './../models/Database';
import { useRouter } from "next/router";

type Props={
    formValues:AddSession;
    setFormValues:React.Dispatch<React.SetStateAction<AddSession>>;
    idToEdit?:number;
}


export default function Form({ idToEdit, formValues, setFormValues}:Props){
    
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
            const res = await fetch('http://localhost:3000/api/'+lastSegment+'/update', {
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
            console.log('updated:', data);
            // Optionally refresh state or re-fetch patients here
            } else {
            console.error('update failed:', data.message);
            }
        } catch (error) {
            console.error(`Error updating ${lastSegment}:`, error);
        }
    }
    else {
         try {
            const res = await fetch('http://localhost:3000/api/'+lastSegment+'/create', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRow:formValues }),
            });

            const data = await res.json();

            if (res.ok) {
                router.reload();
            console.log('created:', data);
            // Optionally refresh state or re-fetch patients here
            } else {
            console.error('create failed:', data.message);
            }
        } catch (error) {
            console.error(`Error creating ${lastSegment}:`, error);
        }
        
    }
       // setFormValues(intialFormValues);

    }



    const materialElements=formValues.materials.map((material,index)=>{
       return (<>
            <label className="mt-2" htmlFor={`material ${index}`}>material {index+1}</label>
            <input 
                type="text"
                name={`material ${index+1}`} 
                value={formValues.materials[index].name} 
                onChange={handleChange}  
                className="border w-full h-8 rounded-md text-sm px-3"
            />

            <label className="mt-2" htmlFor={`material ${index}`}>amount {index+1}</label>
            <input 
                type="text"
                name={`material ${index}`} 
                value={formValues.materials[index].amount}  
                onChange={handleChange}  
                className="border w-full h-8 rounded-md text-sm px-3"
            />
        </>)

    })

   function handleAdd() {
    const newMaterial = {
        name: "",
        amount: 0,
    };

    setFormValues(prev => ({
        ...prev,
        material: [...(prev.materials ), newMaterial]
    }));
   }

    return(
        <form onSubmit={(e)=>handleSubmit(e, idToEdit)} className="flex flex-col  p-5 w-[60%] max-w-[500px] m-auto border rounded-md" action="">
            <label className="mt-2" htmlFor="student_id">Student id</label>
            <input 
                type="number"
                name="student_id" 
                value={formValues.student_id} 
                onChange={handleChange}  
                className="border w-full h-8 rounded-md text-sm px-3"
            />

            <label className="mt-2" htmlFor="case_id">Case id</label>
            <input 
                type="number"
                name="case_id" 
                value={formValues.case_id} 
                onChange={handleChange}  
                className="border w-full h-8 rounded-md text-sm px-3"
            />

            <label className="mt-2" htmlFor="student_id">Course id</label>
            <input 
                type="number"
                name="course_id" 
                value={formValues.course_id} 
                onChange={handleChange}  
                className="border w-full h-8 rounded-md text-sm px-3"
            />
            {materialElements}
            <button onClick={handleAdd}>Add Material +</button>
              
              
              
              
              
              
              
              
              
              <button type="submit">submit</button>
        </form>
    ) 

}
