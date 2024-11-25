import React, { useState } from "react";
import { User, Lock, Bell, CreditCard, LogOut, ChevronRight, X, CreditCardIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
}

interface NotificationSettings {
  securityAlerts: boolean;
  productUpdates: boolean;
  newsAndTips: boolean;
  accountAlerts: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  deviceHistory: boolean;
  passwordLastChanged: string;
}

interface CreditCardInfo {
  number: string;
  name: string;
  expiry: string;
  type: "Visa" | "Mastercard";
}

const LogoutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      onClose();
      navigate("/");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Sign Out</h2>
          <p className="text-gray-300 mb-8">
            Are you sure you want to sign out from your account?
          </p>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfoDropdown: React.FC<{
  isOpen: boolean;
  profileInfo: ProfileInfo;
  onEditClick: () => void;
}> = ({ isOpen, profileInfo, onEditClick }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 p-4 bg-gray-700 rounded-lg animate-fade-in">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="font-medium">{profileInfo.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">First Name</p>
            <p className="font-medium">{profileInfo.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Name</p>
            <p className="font-medium">{profileInfo.lastName}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">Address</p>
          <p className="font-medium">{profileInfo.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Country</p>
            <p className="font-medium">{profileInfo.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">City</p>
            <p className="font-medium">{profileInfo.city}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">ZIP Code</p>
          <p className="font-medium">{profileInfo.zipCode}</p>
        </div>

        <button
          onClick={onEditClick}
          className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const SecuritySettingsDropdown: React.FC<{
  isOpen: boolean;
  securitySettings: SecuritySettings;
  onSettingChange: (setting: keyof SecuritySettings) => void;
  onChangePasswordClick: () => void;
}> = ({ isOpen, securitySettings, onSettingChange, onChangePasswordClick }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 p-4 bg-gray-700 rounded-lg animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-gray-400">
              Add an extra layer of security
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.twoFactorEnabled}
              onChange={() => onSettingChange("twoFactorEnabled")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Login Alerts</p>
            <p className="text-sm text-gray-400">
              Get notified of new sign-ins
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.loginAlerts}
              onChange={() => onSettingChange("loginAlerts")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Device History</p>
            <p className="text-sm text-gray-400">Track sign-in devices</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.deviceHistory}
              onChange={() => onSettingChange("deviceHistory")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">Password last changed</p>
          <p className="font-medium">{securitySettings.passwordLastChanged}</p>
          <button
            onClick={onChangePasswordClick}
            className="mt-2 w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationSettingsDropdown: React.FC<{
  isOpen: boolean;
  settings: NotificationSettings;
  onSettingChange: (key: keyof NotificationSettings) => void;
}> = ({ isOpen, settings, onSettingChange }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 p-4 bg-gray-700 rounded-lg animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Security Alerts</p>
            <p className="text-sm text-gray-400">
              Get notified about security threats
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.securityAlerts}
              onChange={() => onSettingChange("securityAlerts")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Product Updates</p>
            <p className="text-sm text-gray-400">Learn about new features</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.productUpdates}
              onChange={() => onSettingChange("productUpdates")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">News & Tips</p>
            <p className="text-sm text-gray-400">
              Stay updated with security tips
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.newsAndTips}
              onChange={() => onSettingChange("newsAndTips")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Account Alerts</p>
            <p className="text-sm text-gray-400">
              Important account notifications
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.accountAlerts}
              onChange={() => onSettingChange("accountAlerts")}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

const UpdatePaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment method update logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Update Payment Method</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  placeholder="MM/YY"
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({ ...formData, cvv: e.target.value })
                  }
                  placeholder="123"
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                value={formData.cardHolderName}
                onChange={(e) =>
                  setFormData({ ...formData, cardHolderName: e.target.value })
                }
                placeholder="John Doe"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-500 transition-colors font-semibold"
            >
              Update Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const BillingInfoDropdown: React.FC<{
  isOpen: boolean;
  cardInfo: CreditCardInfo;
  onUpdateClick: () => void;
}> = ({ isOpen, cardInfo, onUpdateClick }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-2 p-4 bg-gray-700 rounded-lg animate-fade-in">
      <div className="bg-gray-800 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-gray-600">
          <CreditCardIcon size={24} />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Card Number</p>
            <p className="font-medium">
              •••• •••• •••• {cardInfo.number.slice(-4)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Card Holder</p>
              <p className="font-medium">{cardInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Expires</p>
              <p className="font-medium">{cardInfo.expiry}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400">Card Type</p>
            <p className="font-medium">{cardInfo.type}</p>
          </div>
        </div>

        <button
          onClick={onUpdateClick}
          className="mt-6 w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
        >
          Update Payment Method
        </button>
      </div>
    </div>
  );
};

const UpdateProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ProfileInfo;
}> = ({ isOpen, onClose, currentProfile }) => {
  const [formData, setFormData] = useState(currentProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UpdatePasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Change Password</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AccountSettings: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isUpdatePaymentModalOpen, setIsUpdatePaymentModalOpen] = useState(false);

  const [profileInfo] = useState<ProfileInfo>({
    email: "flora.zeit@example.com",
    firstName: "Flora",
    lastName: "Zeith",
    address: "1112 FZ Street",
    country: "Republic of Fazoria",
    city: "Zaffira City",
    zipCode: "11122",
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginAlerts: true,
    deviceHistory: true,
    passwordLastChanged: "Nov 08, 2023",
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      securityAlerts: true,
      productUpdates: true,
      newsAndTips: false,
      accountAlerts: true,
    });

  const cardInfo = {
    number: "1112111211121112",
    name: "Flora Zeith",
    expiry: "12/25",
    type: "Visa" as const,
  };

  const handleSettingClick = (setting: string) => {
    setOpenDropdown(openDropdown === setting ? null : setting);
  };

  const handleSecuritySettingChange = (setting: keyof SecuritySettings) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => handleSettingClick("profile")}
            >
              <div className="flex items-center">
                <User className="text-cyan-400 mr-3" />
                <span>Profile Information</span>
              </div>
              <ChevronRight />
            </button>
            <ProfileInfoDropdown
              isOpen={openDropdown === "profile"}
              profileInfo={profileInfo}
              onEditClick={() => setIsUpdateProfileModalOpen(true)}
            />
          </div>

          <div>
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => handleSettingClick("security")}
            >
              <div className="flex items-center">
                <Lock className="text-cyan-400 mr-3" />
                <span>Security Settings</span>
              </div>
              <ChevronRight />
            </button>
            <SecuritySettingsDropdown
              isOpen={openDropdown === "security"}
              securitySettings={securitySettings}
              onSettingChange={handleSecuritySettingChange}
              onChangePasswordClick={() => setIsUpdatePasswordModalOpen(true)}
            />
          </div>

          <div>
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => handleSettingClick("notifications")}
            >
              <div className="flex items-center">
                <Bell className="text-cyan-400 mr-3" />
                <span>Notification Preferences</span>
              </div>
              <ChevronRight />
            </button>
            <NotificationSettingsDropdown
              isOpen={openDropdown === "notifications"}
              settings={notificationSettings}
              onSettingChange={handleNotificationChange}
            />
          </div>

          <div>
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => handleSettingClick("billing")}
            >
              <div className="flex items-center">
                <CreditCard className="text-cyan-400 mr-3" />
                <span>Billing Information</span>
              </div>
              <ChevronRight />
            </button>
            <BillingInfoDropdown
              isOpen={openDropdown === "billing"}
              cardInfo={cardInfo}
              onUpdateClick={() => setIsUpdatePaymentModalOpen(true)}
            />
          </div>

          <button
            className="w-full flex items-center justify-between p-4 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition-colors text-red-400"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <div className="flex items-center">
              <LogOut className="mr-3" />
              <span>Sign Out</span>
            </div>
            <ChevronRight />
          </button>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={isUpdateProfileModalOpen}
        onClose={() => setIsUpdateProfileModalOpen(false)}
        currentProfile={profileInfo}
      />

      <UpdatePasswordModal
        isOpen={isUpdatePasswordModalOpen}
        onClose={() => setIsUpdatePasswordModalOpen(false)}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />

      <UpdatePaymentModal
        isOpen={isUpdatePaymentModalOpen}
        onClose={() => setIsUpdatePaymentModalOpen(false)}
      />
    </div>
  );
};

export default AccountSettings;
