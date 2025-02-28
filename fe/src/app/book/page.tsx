"use client";
import React, { useState, useEffect } from "react";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Select, Option} from "@material-tailwind/react";

const BookManagement = () => {
    const [books, setBooks] = useState([]);

    const GENRES = [
        "Science Fiction", "Fantasy", "Horror", "Mystery", "Romance", "Thriller",
        "Historical", "Non-fiction", "Biography", "Self-help", "Philosophy", "Technology",
        "Education", "Children's", "Graphic Novel", "Poetry", "Cooking", "Travel"
    ];

    const [filter, setFilter] = useState({
        title: "",
        author: "",
        genre: "",
    });
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        publisher: "",
        publicationYear: "",
        copies: 0
    });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getBooks = () => {
        fetch("http://localhost:8080/api/v1/books")
            .then((res) => res.json())
            .then((data) => {
                setFilteredBooks(data)
                setBooks(data)
            })
            .catch((err) => console.error("Lỗi tải sách:", err));
    };

    useEffect(() => {
        getBooks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (book) => {
        setForm(book);
        setEditingId(book.id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/v1/books/${id}`, {
            method: "DELETE"
        })
            .then(() => getBooks())
            .catch((err) => {
                console.error("Lỗi khi xóa sách:", err)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:8080/api/v1/books/${editingId}`
            : "http://localhost:8080/api/v1/books";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(() => {
                getBooks();
                setIsModalOpen(false);
                setEditingId(null);
                setForm({ title: "", author: "", genre: "", isbn: "", publisher: "", publicationYear: "", copies: 0 });
            })
            .catch((err) => console.error("Lỗi:", err));
    };
    const [filteredBooks, setFilteredBooks] = useState(books);


const searchBooks = () => {
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        book.author.toLowerCase().includes(filter.author.toLowerCase()) &&
        (filter.genre === "" || book.genre === filter.genre)
    );

    setFilteredBooks(filteredBooks);
}

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📚 Quản lý Sách</h1>
            <Button color="blue" onClick={() => setIsModalOpen(true)}>➕ Thêm sách mới</Button>

            {/*filter*/}
            <div className="m-2 max-w-screen-md mx-auto">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <h2 className="text-stone-700 text-xl font-bold">Tìm kiếm sách</h2>
                    {/*<p className="mt-1 text-sm">Use filters to further refine search</p>*/}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-stone-600 text-sm font-medium">Tên</label>
                            {/*<input type="text" id="name" placeholder="raspberry juice"*/}
                            {/*       className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>*/}
                            <input
                                type="text"
                                id="name"
                                name="title"
                                value={filter.title}
                                onChange={handleFilterChange}
                                placeholder="Nhập tên sách..."
                                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="manufacturer"
                                   className="text-stone-600 text-sm font-medium">Tác giả</label>
                            {/*<input type="manufacturer" id="manufacturer" placeholder="cadbery"*/}
                            {/*       className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>*/}
                            <input
                                type="text"
                                id="manufacturer"
                                name="author"
                                value={filter.author}
                                onChange={handleFilterChange}
                                placeholder="Nhập tên tác giả..."
                                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>

                        {/*<div className="flex flex-col">*/}
                        {/*    <label htmlFor="date" className="text-stone-600 text-sm font-medium">Date of Entry</label>*/}
                        {/*    <input type="date" id="date"*/}
                        {/*           className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>*/}
                        {/*</div>*/}

                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-stone-600 text-sm font-medium">Thể loại</label>

                            {/*<select id="status"*/}
                            {/*        className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">*/}
                            {/*    <option>Dispached Out</option>*/}
                            {/*    <option>In Warehouse</option>*/}
                            {/*    <option>Being Brought In</option>*/}
                            {/*</select>*/}
                            {/*<select*/}
                            {/*    id="status"*/}
                            {/*    name="genre"*/}
                            {/*    value={filter.genre}*/}
                            {/*    onChange={handleFilterChange}*/}
                            {/*    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"*/}
                            {/*>*/}
                            {/*    <option value="">Tất cả</option>*/}
                            {/*    <option value="Science Fiction">Science Fiction</option>*/}
                            {/*    <option value="Fantasy">Fantasy</option>*/}
                            {/*    <option value="Horror">Horror</option>*/}
                            {/*</select>*/}
                            <select
                                name="genre"
                                value={filter.genre}
                                onChange={handleFilterChange}
                                className="border rounded p-2"
                            >
                                <option value="">Tất cả</option>
                                {GENRES.map((genre) => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button
                            onClick={() => {
                                setFilter({ title: "", author: "", genre: "" })
                                searchBooks()
                            }}
                            className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                        >
                            Reset
                        </button>

                        <button
                            onClick={searchBooks}
                            className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">Search
                        </button>
                    </div>
                </div>
            </div>


            <table className="w-full border-collapse border border-gray-300 shadow-md mt-4">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Tên sách</th>
                    <th className="border p-2">Tác giả</th>
                    <th className="border p-2">Thể loại</th>
                    <th className="border p-2">ISBN</th>
                    <th className="border p-2">Nhà xuất bản</th>
                    <th className="border p-2">Số lượng</th>
                    <th className="border p-2">Trong kho</th>
                    <th className="border p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book) => (
                    <tr key={book.id} className="text-center bg-white hover:bg-gray-50 transition">
                        <td className="border p-2">{book.title}</td>
                        <td className="border p-2">{book.author}</td>
                        <td className="border p-2">{book.genre}</td>
                        <td className="border p-2">{book.isbn}</td>
                        <td className="border p-2">{book.publisher}</td>
                        <td className="border p-2">{book.copies}</td>
                        <td className="border p-2">{book.availableCopies}</td>
                        <td className="border p-2">
                            <Button color="yellow" onClick={() => handleEdit(book)}>✏️ Sửa</Button>
                            {/*<Button color="red" onClick={() => handleDelete(book.id)}>🗑️ Xóa</Button>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
                <DialogHeader>{editingId ? "Chỉnh sửa sách" : "Thêm sách mới"}</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="title" value={form.title} onChange={handleChange} label="Tên sách" color="blue"/>
                        <Input name="author" value={form.author} onChange={handleChange} label="Tác giả" color="blue"/>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thể loại</label>
                            <Select
                                value={form.genre}
                                onChange={(value) => setForm((prev) => ({ ...prev, genre: value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <Option value="">Chọn thể loại</Option>
                                {GENRES.map((genre) => (
                                    <Option key={genre} value={genre}>{genre}</Option>
                                ))}
                            </Select>
                            {form.genre && (
                                <p className="mt-1 text-gray-600">Đã chọn: {form.genre}</p>
                            )}
                        </div>

                        <Input name="isbn" value={form.isbn} onChange={handleChange} label="ISBN" color="blue"/>
                        <Input name="publisher" value={form.publisher} onChange={handleChange} label="Nhà xuất bản" color="blue"/>
                        <Input name="publicationYear" value={form.publicationYear} onChange={handleChange} label="Năm xuất bản" color="blue"/>
                        <Input name="copies" type="number" value={form.copies} onChange={handleChange} label="Số lượng" color="blue"/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                    <Button color="blue" onClick={handleSubmit}>Lưu</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default BookManagement;
