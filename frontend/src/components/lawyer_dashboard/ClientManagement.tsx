import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Client {
  _id?: string;
  name: string;
  email: string;
  status?: "active" | "hold";
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmHold, setConfirmHold] = useState<{
    id: string;
    status: "active" | "hold";
  } | null>(null);

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
      toast.success("Client added successfully");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add client");
      toast.error(err?.response?.data?.message || "Failed to add client");
    }
  };

  // Edit client
  const openEditModal = (client: Client) => {
    setEditClient(client);
    setEditName(client.name);
    setEditEmail(client.email);
    setEditPassword("");
    setShowEditModal(true);
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient) return;
    setError("");
    setSuccess("");
    try {
      const payload: any = { name: editName, email: editEmail };
      if (editPassword) payload.password = editPassword;
      const res = await API.put(`/clients/${editClient._id}`, payload);
      setClients((prev) =>
        prev.map((c) =>
          c._id === editClient._id ? { ...c, ...res.data.client } : c
        )
      );
      setSuccess("Client updated");
      toast.success("Client updated");
      setShowEditModal(false);
      setEditClient(null);
      setEditName("");
      setEditEmail("");
      setEditPassword("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update client");
      toast.error(err?.response?.data?.message || "Failed to update client");
    }
  };

  // Delete client
  const handleDeleteClient = async (id: string) => {
    setError("");
    setSuccess("");
    try {
      await API.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
      setSuccess("Client deleted");
      toast.success("Client deleted");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete client");
      toast.error(err?.response?.data?.message || "Failed to delete client");
    }
  };

  // Hold/unhold client
  const handleHoldClient = async (id: string, status: "active" | "hold") => {
    setError("");
    setSuccess("");
    try {
      const res = await API.patch(`/clients/${id}/hold`, { status });
      setClients((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...res.data.client } : c))
      );
      const msg = status === "hold" ? "Client put on hold" : "Client activated";
      setSuccess(msg);
      // Use toast.success for consistency and reliability
      toast.success(msg, {
        description:
          status === "hold"
            ? "This client is now on hold."
            : "This client is now active.",
        duration: 3500,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update status");
      toast.error(err?.response?.data?.message || "Failed to update status");
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
      {/* Notifications handled by sonner */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Clients</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {clients.map((client) => (
              <li
                key={client._id || client.email}
                className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <span>
                  <span className="font-medium text-blue-700">
                    {client.name}
                  </span>{" "}
                  <span className="text-gray-500">({client.email})</span>
                  {client.status === "hold" && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded">
                      On Hold
                    </span>
                  )}
                </span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(client)}
                  >
                    Edit
                  </Button>
                  {/* Modal for editing client */}
                  {showEditModal && editClient && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in-up">
                        <button
                          className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
                          onClick={() => {
                            setShowEditModal(false);
                            setEditClient(null);
                            setEditName("");
                            setEditEmail("");
                            setEditPassword("");
                            setError("");
                            setSuccess("");
                          }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <h3 className="text-xl font-bold text-blue-700 mb-4">
                          Edit Client
                        </h3>
                        <form
                          onSubmit={handleEditClient}
                          className="flex flex-col gap-3"
                        >
                          <input
                            type="text"
                            placeholder="Client Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Client Email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            required
                          />
                          <input
                            type="password"
                            placeholder="New Password (leave blank to keep current)"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                          <Button type="submit" className="px-6 py-2">
                            Update Client
                          </Button>
                        </form>
                        {error && (
                          <div className="text-red-600 mt-2">{error}</div>
                        )}
                        {success && (
                          <div className="text-green-600 mt-2">{success}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Delete Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setConfirmDeleteId(client._id!)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    {confirmDeleteId === client._id && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Client</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this client? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteClient(client._id!);
                              setConfirmDeleteId(null);
                            }}
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                  {/* Hold/Activate Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {client.status === "active" ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setConfirmHold({ id: client._id!, status: "hold" })
                          }
                        >
                          Hold
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() =>
                            setConfirmHold({
                              id: client._id!,
                              status: "active",
                            })
                          }
                        >
                          Activate
                        </Button>
                      )}
                    </AlertDialogTrigger>
                    {confirmHold && confirmHold.id === client._id && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {client.status === "active"
                              ? "Hold Client"
                              : "Activate Client"}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {client.status === "active"
                              ? "Are you sure you want to put this client on hold?"
                              : "Are you sure you want to activate this client?"}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setConfirmHold(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleHoldClient(client._id!, confirmHold.status);
                              setConfirmHold(null);
                            }}
                          >
                            {client.status === "active"
                              ? "Yes, Hold"
                              : "Yes, Activate"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                </div>
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
            {/* Notifications handled by sonner */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
