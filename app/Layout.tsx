import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { storage, STORAGE_KEYS } from './utils/localStorage';

export function Layout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => storage.get(STORAGE_KEYS.SIDEBAR_COLLAPSED, false)
  );

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, newState);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Conversations', href: '/conversations', icon: '💬' },
    { name: 'Events', href: '/events', icon: '📊' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-semibold text-white">OpenHands</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {!sidebarCollapsed && item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}