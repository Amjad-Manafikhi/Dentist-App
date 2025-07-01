import React, { useRef, useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import { useRouter } from "next/router";
import { TableRow } from "@/models/Database";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {patientInput, inputMap} from './FormInput'
type ElementProps={
    element:TableRow;
    head:string[];
}




function Element({element, head}:ElementProps) {
  
  function initialValues(): TableRow {
  const initialValue: TableRow = {} as TableRow;

  head.forEach((column) => {
    const value = typeof element[column as keyof typeof element] === "string" ? "" : 0;
    initialValue[column as keyof TableRow] = value as any;
  });

  return initialValue;
}




  const [openEdit, setOpenEdit] = useState(false);
  const [editFormValues, setEditFormValues] = useState(()=>initialValues())
  const [isDeleting, setisDeleting]=useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);
  const router = useRouter();
  const match = router.pathname.match(/[^/]+$/);
  const lastSegment = match ? match[0] : null;
  const rowRef = useRef(null);

  type TableKey = keyof typeof inputMap;
  const key = (lastSegment ?? 'patient') as TableKey;

  // Function to handle row deletion
  console.log(router.pathname)
 async function handleDelete(id: number) {
  console.log('Deleting patient with ID:', id);
  try {
    console.log(match)
    console.log(lastSegment)
    const url='http://localhost:3000/api/' + lastSegment + '/delete';
    console.log(url)
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
        style={{
          animation: isDeleting
            ? "fadeOut 0.2s ease-in forwards  "
            : "fadeIn 0.2s ease-out forwards ",
        }}
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
