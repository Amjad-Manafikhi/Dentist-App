import { ReactNode, useState } from "react";

import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Navbar from "./Navbar";
import Form from "./Form";
import { TableRow } from "@/models/Database";
import { useRouter } from "next/router";
import { inputMap } from "./FormInput";
import Modal from "./Modal";
import { InputType } from "./FormInput";

type LayoutProps = {
  children: ReactNode;
  head:InputType[];
};




export default function Layout({children,head}:LayoutProps){
    
function getInitialValues<T extends TableRow>(head: InputType[]): T { // Corrected: 'head' is InputType[]
    const initialValue = {} as T;

    head.forEach((col) => {
      let value: any; // Use 'any' here as the value type can vary (string, number, boolean)

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
    
    const [editFormValues, setEditFormValues] = useState(()=>getInitialValues(head))
    const [formOpen, setFormOpen] = useState(false);
    const router = useRouter();
    const match = router.pathname.match(/[^/]+$/);
    const lastSegment = match ? match[0] : null;
    
    type TableKey = keyof typeof inputMap;
    const key = (lastSegment ?? 'patient') as TableKey;

    return(
        <SidebarProvider>
            <AppSidebar />
            <main className=" w-full m-auto">
              <Navbar/> 
                <div className={`flex flex-col min-h-screen `}>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col mt-10 ml-10">
                          <h2 className="text-xl font-extrabold"> {lastSegment ?  lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : null} Management </h2>
                          <h2 className="text-lg ">Manage dental education {lastSegment}s and curriculum</h2>
                        </div>
                        {children}
                </div>
                <button 
                    onClick={()=>setFormOpen(prev=>!prev)}
                    className=" m-6 ml-auto bg-[#2563EB] rounded-md px-4 py-2 text-sm font-bold items-center justify-center text-primary cursor-pointer "
                >+ Add {lastSegment}</button>
                {formOpen && 
                <Modal open={formOpen} setOpen={setFormOpen} addRow={true}>
                    <Form tableInputs={inputMap[key]}   formValues={editFormValues} setFormValues={setEditFormValues}/>  
                </Modal>
                }

                
            </div>
        </main>
    </SidebarProvider>
    )
}