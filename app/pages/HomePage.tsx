import React from 'react';
import { Link } from 'react-router-dom';
import { ServerInfoDetail } from '../../components/ServerInfo';

export function HomePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">OpenHands Agent Server</h1>
        <p className="text-gray-600">
          REST/WebSocket interface for OpenHands AI Agent
        </p>
      </div>

      <ServerInfoDetail className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/conversations"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Conversations</h2>
          <p className="text-gray-600">
            View and manage agent conversations
          </p>
        </Link>

        <Link
          to="/events"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-600">
            Search and view conversation events
          </p>
        </Link>
      </div>
    </div>
  );
}