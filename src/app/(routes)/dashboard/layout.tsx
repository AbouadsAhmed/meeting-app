import { ReactNode } from "react";
import SideNavbar from "./_components/SideNavbar";
import UserHeader from "./_components/UserHeader";
import { Toaster } from "sonner";

interface Iprop {
  children: ReactNode;
}
const DashboardLayout = ({ children }: Iprop) => {
  return (
    <div>
      <div className="hidden md:block w-65 h-screen fixed bg-[#e6f7f6]">
        <SideNavbar />
      </div>
      <div className="md:ml-70">
        <UserHeader />
        <Toaster />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
