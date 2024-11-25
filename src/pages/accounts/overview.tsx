import React from 'react';
import { Shield, Activity, Clock, AlertTriangle, RefreshCcw, Check } from 'lucide-react';

interface SecurityAlert {
  type: 'warning' | 'blocked' | 'info';
  message: string;
  date: string;
  isNew?: boolean;
}

interface SecurityStats {
  threatsBlocked: number;
  lastScan: string;
  filesScanned: string;
  databaseVersion: string;
}

const AccountOverview: React.FC = () => {
  const securityStats: SecurityStats = {
    threatsBlocked: 147,
    lastScan: "2 hours ago",
    filesScanned: "34,891",
    databaseVersion: "Updated 1 hour ago"
  };

  const securityAlerts: SecurityAlert[] = [
    {
      type: 'warning',
      message: "Suspicious login attempt blocked from IP 192.168.1.1",
      date: "Today at 14:30",
      isNew: true
    },
    {
      type: 'blocked',
      message: "Malware prevented: Trojan.Win32.Generic",
      date: "Today at 12:15",
      isNew: true
    },
    {
      type: 'info',
      message: "System scan completed: No threats found",
      date: "Yesterday at 22:00"
    }
  ];

  const StatCard: React.FC<{
    icon: React.ReactNode;
    value: string | number;
    label: string;
    iconColor?: string;
  }> = ({ icon, value, label, iconColor }) => (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={iconColor}>{icon}</div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-400">{label}</h3>
    </div>
  );

  const AlertCard: React.FC<{ alert: SecurityAlert }> = ({ alert }) => (
    <div className="flex items-start p-4 bg-gray-700 rounded-lg">
      {alert.type === 'warning' && <AlertTriangle className="text-yellow-400 mr-3 flex-shrink-0" />}
      {alert.type === 'blocked' && <Shield className="text-red-400 mr-3 flex-shrink-0" />}
      {alert.type === 'info' && <Check className="text-green-400 mr-3 flex-shrink-0" />}
      <div className="flex-grow">
        <div className="flex items-center">
          <p className="text-gray-200">{alert.message}</p>
          {alert.isNew && (
            <span className="ml-2 px-2 py-1 bg-cyan-600 text-xs rounded-full">New</span>
          )}
        </div>
        <p className="text-sm text-gray-400">{alert.date}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          icon={<AlertTriangle size={24} />}
          value={securityStats.threatsBlocked}
          label="Threats Blocked"
          iconColor="text-yellow-400"
        />
        <StatCard 
          icon={<Clock size={24} />}
          value={securityStats.lastScan}
          label="Last Scan"
          iconColor="text-cyan-400"
        />
        <StatCard 
          icon={<Activity size={24} />}
          value={securityStats.filesScanned}
          label="Files Scanned"
          iconColor="text-green-400"
        />
        <StatCard 
          icon={<RefreshCcw size={24} />}
          value={securityStats.databaseVersion}
          label="Virus Database"
          iconColor="text-purple-400"
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Security Alerts</h2>
        <div className="space-y-4">
          {securityAlerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 mb-1">Plan</p>
            <p className="font-semibold">Group (3-5 users)</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Renewal Date</p>
            <p className="font-semibold">December 11, 2024</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Protected Devices</p>
            <p className="font-semibold">3 of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;