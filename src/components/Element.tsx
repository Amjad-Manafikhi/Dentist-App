import React, { useRef, useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import { useRouter } from "next/router";
import { TableRow } from "@/models/Database";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {inputMap, InputType} from './FormInput'

type ElementProps={
    element:TableRow;
    head:string[];
    inputType:InputType[];
}

type PrimitiveTypes = string | Date | number | boolean; 

const NEXT_PUBLIC_API_URL=process.env.NEXT_PUBLIC_API_URL;    


function Element({element, head, inputType}:ElementProps) {
  
  function getInitialValues<T extends TableRow>(head: InputType[]): T { // Corrected: 'head' is InputType[]
    const initialValue = {} as T;

    head.forEach((col) => {
      let value: PrimitiveTypes; // Use 'any' here as the value type can vary (string, number, boolean)

      switch (col.type) {
        case "checkbox":
          value = false;
          break;
        case "number":
          value = 0;
          break;
        default: // Covers "text", "date", "tel"
          value = "";
      }

      // Assert col.name as keyof T to ensure type safety when assigning to initialValue
      // This cast assumes that 'col.name' will always correspond to a valid key in 'T'.
      initialValue[col.name as keyof T] = value as T[keyof T];
    });

    return initialValue;
  }




  const [openEdit, setOpenEdit] = useState(false);
  const [editFormValues, setEditFormValues] = useState(()=>getInitialValues(inputType))
  const [idToEdit, setIdToEdit] = useState(-1);
  const router = useRouter();
  const match = router.pathname.match(/[^/]+$/);
  const lastSegment = match ? match[0] : null;
  const rowRef = useRef(null);

  type TableKey = keyof typeof inputMap;
  const key = (lastSegment ?? 'patient') as TableKey;

  // Function to handle row deletion
 async function handleDelete(id: number) {
  console.log('Deleting patient with ID:', id);
  try {
    const url=NEXT_PUBLIC_API_URL+'/api/' + lastSegment + '/delete';
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Deleted:', data);
      router.reload();
      // Optionally refresh state or re-fetch patients here
    } else {
      console.error('Delete failed:', data.message);
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
  }
}


  // Function to handle editing the element
  
  async function handleEdit(element:TableRow) {
    setIdToEdit(element.id);
    setEditFormValues(element);
    setOpenEdit(true);
    console.log('Updating patient with ID:', element.id);
    

  
}
  
  return(
    <>
      <tr
        ref={rowRef}
      >
        {head.map((column, colIndex) => (
              <td key={colIndex}>
                {element[column as keyof typeof element]}
              </td>
            ))}
          <td>
          <button className="edit-button" onClick={()=>handleEdit(element)} >
            <FaEdit/>
          </button>
          <button className="delete-button" onClick={()=>handleDelete(element.id)}>
            <MdDelete/>
          </button>
        </td>
      </tr>

      {/* CSS animations */}
      <style jsx>{`
    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
        transform: translateX(20px);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateX(-20px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>
        <Modal open={openEdit} setOpen={setOpenEdit}>
          <Form tableInputs={inputMap[key]}  idToEdit={idToEdit} formValues={editFormValues} setFormValues={setEditFormValues}/>  
        </Modal>

        </>    
  );
}

export default React.memo(Element, (prevProps, nextProps) => {
  return prevProps.element === nextProps.element;
});
