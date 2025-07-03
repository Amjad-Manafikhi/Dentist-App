import {
  FaBookOpen,       // Course
  FaUserGraduate,   // Student
  FaUserInjured,    // Patient
  FaTooth,          // Toothache
  FaFolderOpen,     // Case
  FaMicroscope,     // Diagnostic
  FaTags,           // Source Type
  FaFlask,          // Material
  FaHeartbeat,      // Comorbidity
  FaClock,          // Session
  FaUserMd,         // Doctor
  FaUserTie         // Supervisor
} from "react-icons/fa";
import  styles from'./../styles/scrollbar.module.css';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const pathname = usePathname();

  const tables = [
    { id: 1, title: "Course", url: "/dashboard/course", icon: FaBookOpen },
    { id: 2, title: "Student", url: "/dashboard/student", icon: FaUserGraduate },
    { id: 3, title: "Patient", url: "/dashboard/patient", icon: FaUserInjured },
    { id: 4, title: "Toothache", url: "/dashboard/toothache", icon: FaTooth },
    { id: 5, title: "Case", url: "/dashboard/cases", icon: FaFolderOpen },
    { id: 6, title: "Diagnostic", url: "/dashboard/diagnosticSource", icon: FaMicroscope },
    { id: 7, title: "Source Type", url: "/dashboard/sourceType", icon: FaTags },
    { id: 8, title: "Material", url: "/dashboard/material", icon: FaFlask },
    { id: 9, title: "Comorbidity", url: "/dashboard/comorbidity", icon: FaHeartbeat },
    { id: 10, title: "Session", url: "/dashboard/session", icon: FaClock },
    { id: 11, title: "Doctor", url: "/dashboard/doctor", icon: FaUserMd },
    { id: 12, title: "Supervisor", url: "/dashboard/supervisor", icon: FaUserTie },
    { id: 13, title: "D_S", url: "/dashboard/d_s", icon: FaUserTie },
    { id: 14, title: "P_C", url: "/dashboard/p_c", icon: FaUserTie },
    { id: 15, title: "S_C", url: "/dashboard/s_c", icon: FaUserTie },
    { id: 16, title: "S_M", url: "/dashboard/s_m", icon: FaUserTie },
    { id: 17, title: "S_S_C", url: "/dashboard/s_s_c", icon: FaUserTie },
    { id: 18, title: "S_S", url: "/dashboard/s_s", icon: FaUserTie },

  ];


  const tableElements=tables.map((table) => {
            const Icon = table.icon;
            const isActive = pathname === table.url;
            return (
              <SidebarMenuItem key={table.title}>
                <SidebarMenuButton asChild>
                  
                <Link href={table.url} passHref 
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 transition-colors",
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-muted hover:text-foreground"
                  )} >
                    <Icon className="w-4 h-4" />
                    <span>{table.title}</span>
                </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })

  return (
    <Sidebar collapsible="icon" variant="floating" >
      <SidebarHeader />
      <SidebarContent className={styles.sidebar}>
        <SidebarGroup>
          <SidebarGroupLabel style={{"fontSize":"1.3rem","color":"#888888"}}>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>

            {tableElements}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
