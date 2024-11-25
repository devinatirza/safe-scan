import React, { useState } from 'react';
import { User } from 'lucide-react';
import Navbar from "../components/navbar";
import AccountOverview from '../pages/accounts/overview';
import ProtectedDevices from '../pages/accounts/protected-devices';
import AccountSettings from '../pages/accounts/settings';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'settings'>('overview');

  const userData = {
    name: "Flora Zeith",
    email: "flora.zeit@example.com",
    plan: "Group (3-5 users)",
    subscriptionStatus: "Active",
    renewalDate: "December 11, 2024",
    devicesProtected: 3,
    maxDevices: 5
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AccountOverview />;
      case 'devices':
        return <ProtectedDevices />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 w-dvw min-h-screen">
      <Navbar activeItem="Account" />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center">
                <User size={32} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-gray-400">{userData.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-semibold">{userData.plan}</div>
              <div className="text-sm text-gray-400">Subscription {userData.subscriptionStatus}</div>
            </div>
          </div>
        </div>

        <div className="flex mb-8 space-x-4 border-b border-gray-700">
          <button
            className={`pb-4 px-4 ${activeTab === 'overview' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-4 px-4 ${activeTab === 'devices' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('devices')}
          >
            Protected Devices
          </button>
          <button
            className={`pb-4 px-4 ${activeTab === 'settings' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Account;