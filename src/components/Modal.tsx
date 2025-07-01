import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"
import { useRouter } from "next/router";



type Props={
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    children:ReactNode;
    addRow?:boolean;
}

export default function Modal({children, open, setOpen, addRow}:Props){
    
    
    const router = useRouter();
    const match = router.pathname.match(/[^/]+$/);
    const lastSegment = match ? match[0] : null;

    return(
        <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {addRow ? "Add" : "Edit"} {lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : null} 
                                </DialogTitle>
                            </DialogHeader>
                            {children}
                        </DialogContent>
                    </Dialog>
    ) 
}