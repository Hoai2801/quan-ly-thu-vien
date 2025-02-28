'use client'
import React, { useEffect, useState } from "react";

const MemberManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [editingId, setEditingId] = useState(null);
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = () => {
        fetch('http://localhost:8080/api/v1/members')
            .then((response) => response.json())
            .then((data) => setMembers(data))
            .catch((error) => console.error('Error fetching members:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            fetch('http://localhost:8080/api/v1/members/' + editingId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).then((response) => {
                if (response.ok) {
                    getMembers();
                }
            });
            setEditingId(null);
        } else {
            fetch('http://localhost:8080/api/v1/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).then((response) => {
                if (response.ok) {
                    getMembers();
                }
            });
        }
        setIsModalOpen(false);
        setForm({ name: "", email: "", phone: "", address: "" });
    };

    const handleEdit = (id) => {
        const member = members.find(member => member.id === id);
        setForm(member);
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleBan = (id) => {
        fetch('http://localhost:8080/api/v1/members/ban/' + id, {
            method: 'PUT',
        }).then((response) => {
            if (response.ok) {
                getMembers();
            }
        });
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Member Management</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => { setIsModalOpen(true); setEditingId(null); setForm({ name: "", email: "", phone: "", address: "" }); }}
            >
                Add Member
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-lg font-bold mb-4">{editingId ? "Edit Member" : "Add Member"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                                    {editingId ? "Update" : "Submit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="ml-2 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.id} className={!member.active ? "bg-red-200" : ""}>
                            <td className="p-2 border">{member.name}</td>
                            <td className="p-2 border">{member.email}</td>
                            <td className="p-2 border">{member.phone}</td>
                            <td className="p-2 border">{member.address}</td>
                            <td className="p-2 border space-x-2 flex gap-2">
                                <button onClick={() => handleEdit(member.id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Sửa</button>
                                <button onClick={() => handleBan(member.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                    {!member.active ? "Mở khóa" : "Khóa"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberManagement;
