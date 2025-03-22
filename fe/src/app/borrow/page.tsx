'use client';
import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Select, Option } from "@material-tailwind/react";

const BorrowManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ memberId: "", bookId: "", dueDate: "" });
    const [editingId, setEditingId] = useState(null);
    const [borrowRecords, setBorrowRecords] = useState([]);
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getBorrowRecords = () => {
        fetch('http://localhost:8080/api/v1/borrow')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setBorrowRecords(data)
            })
            .catch((error) => console.error('Error fetching borrow records:', error));
    };

    useEffect(() => {
        getBorrowRecords();

        fetch("http://localhost:8080/api/v1/members")
            .then(res => res.json())
            .then(data => setMembers(data));

        fetch("http://localhost:8080/api/v1/books")
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:8080/api/v1/borrow/${editingId}`
            : "http://localhost:8080/api/v1/borrow";

        fetch(url, {
            method: editingId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((response) => {
                if (response.ok) {
                    getBorrowRecords(); // Reload danh sách
                    setIsModalOpen(false);
                } else {
                    response.text().then((text) => alert(text));
                }
            })
            .catch((error) => console.error("Lỗi:", error));
    };



    const handleEdit = (id) => {
        const record = borrowRecords.find(record => record.borrowId === id);
        if (!record) {
            console.error("Record not found:", id);
            return;
        }
        setForm({
            memberId: record.member.id,
            bookId: record.book.id,
            dueDate: record.dueDate,
            returnDate: record.returnDate || "", // Nếu null thì để trống
            status: record.status
        });
        setEditingId(id);
        setIsModalOpen(true);
    };

    useEffect(() => {
        setFilteredRecords(
            borrowRecords.filter(record =>
                record.member.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, borrowRecords]);



    const returnBook = (id) => {
        fetch('http://localhost:8080/api/v1/borrow/return/' + id, {
            method: 'PUT',
        }).then((response) => {
            if (response.ok) {
                getBorrowRecords();
            }
        })
        // setBorrowRecords(borrowRecords.filter(record => record.id !== id));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Borrow Management</h2>
            <div className="mb-4 gap-2 flex justify-center flex-col items-center">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-[250px]"
                    onClick={() => { setIsModalOpen(true); setEditingId(null); setForm({ memberId: "", bookId: "", dueDate: "" }); }}
                >
                    Create Borrow Record
                </button>
                <Input
                    type="text"
                    placeholder="Search by Member Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
            </div>

            {isModalOpen && (
                <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)} size="md">
                    <DialogHeader>{editingId ? "Edit Borrow Record" : "Create Borrow Record"}</DialogHeader>
                    <DialogBody>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Select label="Select Member" value={form.memberId} onChange={(value) => setForm({ ...form, memberId: value })}>
                                    {members.map(member => (
                                        <Option key={member.id} value={member.id} className={member.active ? '' : 'hidden'}>
                                            {member.name} - {member.phone}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div className="col-span-2">
                                <Select label="Select Book" value={form.bookId} onChange={(value) => setForm({ ...form, bookId: value })} required>
                                    {books.map(book => (
                                        <Option className={`${book.availableCopies === 0 ? 'hidden' : ''}`} key={book.id} value={book.id}>{book.title}</Option>
                                    ))}
                                </Select>
                            </div>

                            <Input type="date" label="Return Date" name="returnDate" value={form.returnDate} onChange={handleChange} />
                            <Input type="date" label="Due Date" name="dueDate" value={form.dueDate} onChange={handleChange} required />

                            <div className="col-span-2">
                                <Select label="Status" value={form.status} onChange={(value) => setForm({ ...form, status: value })}>
                                    <Option value="BORROWED">Borrowed</Option>
                                    <Option value="RETURNED">Returned</Option>
                                    {/*<Option value="OVERDUE">Overdue</Option>*/}
                                </Select>
                            </div>
                            <DialogFooter className="flex justify-end space-x-2">
                                <Button variant="text" color="gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button variant="gradient" color="blue" type="submit">{editingId ? "Update" : "Submit"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogBody>
                </Dialog>
            )}

            <div className="mt-6">
                <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Member</th>
                        <th className="p-2 border">Book</th>
                        <th className="p-2 border">Due Date</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRecords.map((record) => (
                        <tr key={record.borrowId}>
                            <td className="p-2 border">{record.member.name}</td>
                            <td className="p-2 border">{record.book.title}</td>
                            <td className="p-2 border">{new Date(record.dueDate).toLocaleDateString()}</td>
                            <td className={`p-2 border ${record.status === 'RETURNED' ? 'text-green-500' : record.status === 'OVERDUE' ? 'text-red-500' : 'text-orange-500'}`}>{record.status}</td>
                            <td className="p-2 border space-x-2 flex gap-2">
                                <button onClick={() => handleEdit(record.borrowId)} className="px-3 w-full py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                <button onClick={() => returnBook(record.borrowId)} className={`px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 ${record.status === 'RETURNED' ? 'hidden' : ''}`}>Trả sách</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowManagement;