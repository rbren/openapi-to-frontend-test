import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { storage } from './utils/localStorage';

export function Layout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    storage.getSidebarCollapsed()
  );

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    storage.setSidebarCollapsed(newState);
  };

  const navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/conversations', label: 'Conversations' },
    { path: '/events', label: 'Events' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className={`font-bold text-xl ${sidebarCollapsed ? 'hidden' : ''}`}>
            OpenHands
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  sidebarCollapsed
                    ? 'M9 5l7 7-7 7'
                    : 'M15 19l-7-7 7-7'
                }
              />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded transition-colors ${
                    isActive(item.path, item.exact)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  } ${sidebarCollapsed ? 'text-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  {sidebarCollapsed ? item.label[0] : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}