import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";
import { toast } from "sonner";

const Settings: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lawyerCount, setLawyerCount] = useState<number | null>(null);

  // Fetch how many lawyers can access the dashboard (dummy for now)
  React.useEffect(() => {
    // Replace with real API call if needed
    setLawyerCount(5); // Example: 5 lawyers can access
  }, []);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/users/email", { email });
      toast.success("Email updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update email");
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await API.put("/users/password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update password");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 border border-blue-100 mt-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Settings</h2>
      <form onSubmit={handleEmailChange} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Change Email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Update Email
        </button>
      </form>
      <form onSubmit={handlePasswordChange} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Update Password
        </button>
      </form>
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-2">Dashboard Access</h3>
        <p className="text-gray-700">
          Number of lawyers who can access this dashboard:{" "}
          <span className="font-bold text-blue-700">{lawyerCount ?? "-"}</span>
        </p>
      </div>
    </div>
  );
};

export default Settings;
