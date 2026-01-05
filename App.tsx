import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Menu, 
  X, 
  Bell, 
  Search,
  CheckCircle2,
  TrendingUp,
  Activity
} from 'lucide-react';

// --- Types ---
type View = 'dashboard' | 'users' | 'settings';

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col space-y-2">
    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-slate-800">{value}</span>
      <span className={`text-sm font-medium px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change}
      </span>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" positive={true} />
      <StatCard title="Active Users" value="2,350" change="+15.2%" positive={true} />
      <StatCard title="Bounce Rate" value="42.3%" change="-5.4%" positive={false} />
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</button>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Activity size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-800 font-medium">New project "Cicy Redesign" started</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago • by Sarah Johnson</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const UsersView = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center animate-fadeIn">
    <Users size={48} className="mx-auto text-indigo-200 mb-4" />
    <h2 className="text-xl font-bold text-slate-800">User Management</h2>
    <p className="text-slate-500 mt-2">Manage your team members and permissions here.</p>
  </div>
);

const SettingsView = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 animate-fadeIn">
    <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
        <div className="flex items-center space-x-3">
          <Bell size={20} className="text-slate-400" />
          <div>
            <p className="font-medium text-slate-800">Notifications</p>
            <p className="text-sm text-slate-500">Receive email updates about activity</p>
          </div>
        </div>
        <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Cicy</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }} 
            />
            <SidebarItem 
              icon={Users} 
              label="Team Members" 
              active={currentView === 'users'} 
              onClick={() => { setCurrentView('users'); setSidebarOpen(false); }} 
            />
            <SidebarItem 
              icon={Settings} 
              label="Settings" 
              active={currentView === 'settings'} 
              onClick={() => { setCurrentView('settings'); setSidebarOpen(false); }} 
            />
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="User" 
                className="w-10 h-10 rounded-full bg-slate-700"
              />
              <div>
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-slate-500 hover:text-slate-700"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-64">
              <Search size={18} className="mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800">
                {currentView === 'dashboard' && 'Dashboard Overview'}
                {currentView === 'users' && 'Team Members'}
                {currentView === 'settings' && 'Platform Settings'}
              </h1>
              <p className="text-slate-500 mt-1">Welcome back, here is what's happening with your projects today.</p>
            </div>

            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'users' && <UsersView />}
            {currentView === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;