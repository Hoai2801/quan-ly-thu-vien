"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BorrowedBooksReport = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/borrow/report"); // Điều chỉnh API nếu cần
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();

                // Sắp xếp theo tháng
                const sortedData = data.sort((a, b) => a.month - b.month);

                // Chuyển đổi tháng thành định dạng "Tháng x"
                const labels = sortedData.map(item => `Tháng ${item.month}`);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Sách trả đúng hạn",
                            data: sortedData.map(item => item.returned_on_time),
                            backgroundColor: "#4F46E5",
                        },
                        {
                            label: "Sách trả quá hạn (gia hạn)",
                            data: sortedData.map(item => item.overdue_no_renewal),
                            backgroundColor: "#E53E3E",
                        },
                        {
                            label: "Gia hạn",
                            data: sortedData.map(item => item.renewed_books),
                            backgroundColor: "#38B2AC",
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="w-full h-96 p-4">
            <h2 className="text-lg font-semibold mb-4">Báo cáo mượn sách theo tháng</h2>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500">Lỗi: {error}</p>}
            {chartData && <Bar data={chartData} options={options} />}
        </div>
    );
};

export default BorrowedBooksReport;
