import Sidebar, { TopHeader } from "@/components/sidebar/Sidebar";
import AutoLogout from "@/components/AutoLogout"; // AutoLogout import kora hoilo

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-32 lg:pb-10 selection:bg-blue-600 flex relative overflow-x-hidden">
      {/* Auto Logout Inactivity Popup */}
      <AutoLogout />

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <TopHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}