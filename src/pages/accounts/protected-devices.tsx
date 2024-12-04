import React, { useState } from "react";
import { Smartphone, Laptop, Shield, RefreshCw, Power, Trash2, X, ChevronRight, Check } from 'lucide-react';

interface Device {
  name: string;
  type: string;
  lastActive: string;
  status: "Protected" | "Needs Attention" | "Update Required";
  lastScan: string;
  protectionLevel: "High" | "Medium" | "Low";
}

interface ProtectionSettings {
  isOpen: boolean;
  level: "High" | "Medium" | "Low";
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
}

const AlertModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  message: string;
}> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-white" />
        </div>
        <p className="text-lg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full animate-fade-in">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeviceModal: React.FC<{
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ device, isOpen, onClose }) => {
  if (!isOpen || !device) return null;

  const [protectionSettings, setProtectionSettings] =
    useState<ProtectionSettings>({
      isOpen: false,
      level: device.protectionLevel,
    });
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  

  const [showScanAlert, setShowScanAlert] = useState(false);
  const [showPauseAlert, setShowPauseAlert] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

  const handleRemoveConfirm = () => {
    setShowRemoveConfirm(false);
    setShowRemoveSuccess(true);
  };

  const ActionButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    variant?: "default" | "danger";
  }> = ({ icon, label, onClick, variant = "default" }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
        variant === "danger"
          ? "bg-red-900/30 hover:bg-red-900/50 text-red-400"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      <div className="flex items-center">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={20} />
    </button>
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative animate-fade-in">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={25} />
          </button>

          <div className="space-y-3 mt-7">
            <ActionButton
              icon={<RefreshCw className="text-cyan-400 mr-3" size={20} />}
              label="Scan Device"
              onClick={() => setShowScanAlert(true)}
            />

            <div>
              <ActionButton
                icon={<Shield className="text-cyan-400 mr-3" size={20} />}
                label={`Protection Settings (${protectionSettings.level})`}
                onClick={() =>
                  setProtectionSettings((prev) => ({
                    ...prev,
                    isOpen: !prev.isOpen,
                  }))
                }
              />

              {protectionSettings.isOpen && (
                <div className="mt-2 p-3 bg-gray-700 rounded-lg space-y-2 animate-fade-in">
                  {(["High", "Medium", "Low"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setProtectionSettings({ isOpen: false, level })
                      }
                      className={`w-full p-2 rounded flex items-center justify-between ${
                        protectionSettings.level === level
                          ? "bg-cyan-600 text-white"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      <span>{level}</span>
                      {protectionSettings.level === level && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ActionButton
              icon={<Power className="text-cyan-400 mr-3" size={20} />}
              label="Pause Protection"
              onClick={() => setShowPauseAlert(true)}
            />

            <ActionButton
              icon={<Trash2 className="mr-3" size={20} />}
              label="Remove Device"
              variant="danger"
              onClick={() => setShowRemoveConfirm(true)}
            />
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={showScanAlert}
        onClose={() => setShowScanAlert(false)}
        message="Device scan completed successfully!"
      />

      <AlertModal
        isOpen={showPauseAlert}
        onClose={() => setShowPauseAlert(false)}
        message="Protection paused successfully"
      />

      <ConfirmationModal
        isOpen={showRemoveConfirm}
        onClose={() => setShowRemoveConfirm(false)}
        onConfirm={handleRemoveConfirm}
        title="Remove Device"
        message="Are you sure you want to remove this device?"
        confirmLabel="Remove"
      />

      <AlertModal
        isOpen={showRemoveSuccess}
        onClose={() => {
          setShowRemoveSuccess(false);
          onClose(); 
        }}
        message="Device removed successfully"
      />
    </>
  );
};

const ProtectedDevices: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  const devices: Device[] = [
    {
      name: "Macbook",
      type: "MacOS",
      lastActive: "Active now",
      status: "Protected",
      lastScan: "2 hours ago",
      protectionLevel: "High",
    },
    {
      name: "iPhone 14",
      type: "Mobile",
      lastActive: "2 hours ago",
      status: "Update Required",
      lastScan: "1 day ago",
      protectionLevel: "Medium",
    },
    {
      name: "Home Desktop",
      type: "Windows PC",
      lastActive: "1 day ago",
      status: "Protected",
      lastScan: "3 hours ago",
      protectionLevel: "High",
    },
  ];

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setIsDeviceModalOpen(true);
  };

  const DeviceCard: React.FC<{ device: Device }> = ({ device }) => (
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          {device.type === "Mobile" ? (
            <Smartphone size={20} />
          ) : (
            <Laptop size={20} />
          )}
        </div>
        <div className="ml-4">
          <h3 className="font-semibold">{device.name}</h3>
          <p className="text-sm text-gray-400">{device.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm ${
            device.status === "Protected"
              ? "text-green-400"
              : device.status === "Needs Attention"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {device.status}
        </p>
        <button
          onClick={() => handleDeviceClick(device)}
          className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
        >
          Manage Device
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Protected Devices</h2>
        <span className="text-gray-400">3 of 5 devices</span>
      </div>

      <div className="space-y-4">
        {devices.map((device, index) => (
          <DeviceCard key={index} device={device} />
        ))}
      </div>

      <DeviceModal
        device={selectedDevice}
        isOpen={isDeviceModalOpen}
        onClose={() => {
          setIsDeviceModalOpen(false);
          setSelectedDevice(null);
        }}
      />
    </div>
  );
};

export default ProtectedDevices;

