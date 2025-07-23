import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar - z-40 ensures it's above the main content but below topbar overlay */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full md:w-auto md:ml-64">
        {/* Topbar - z-30 ensures it's above content but below sidebar on mobile */}
        <Topbar />

        {/* Main view container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-4 px-6 text-center text-xs text-gray-500">
          <p>CRM Opportunity Tracker &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
