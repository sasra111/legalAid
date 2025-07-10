import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Client {
  _id?: string;
  name: string;
  email: string;
}

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/clients");
      setClients(res.data.clients);
    } catch (err: any) {
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/clients", { name, email, password });
      setClients((prev) => [...prev, res.data.client]);
      setName("");
      setEmail("");
      setPassword("");
      setSuccess("Client added successfully");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add client");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Client Management
      </h2>
      <Button
        onClick={() => setShowAddModal(true)}
        className="mb-4 w-fit px-6 py-2"
      >
        Add New Client
      </Button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Clients</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {clients.map((client) => (
              <li
                key={client._id || client.email}
                className="py-2 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <span>
                  <span className="font-medium text-blue-700">
                    {client.name}
                  </span>{" "}
                  <span className="text-gray-500">({client.email})</span>
                </span>
              </li>
            ))}
            {clients.length === 0 && (
              <li className="text-gray-500">No clients found.</li>
            )}
          </ul>
        )}
      </div>

      {/* Modal for adding client */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={() => {
                setShowAddModal(false);
                setError("");
                setSuccess("");
                setName("");
                setEmail("");
                setPassword("");
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Add New Client
            </h3>
            <form onSubmit={handleAddClient} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Client Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Client Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
              <input
                type="password"
                placeholder="Client Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
              <Button type="submit" className="px-6 py-2">
                Add Client
              </Button>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
            {success && <div className="text-green-600 mt-2">{success}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
