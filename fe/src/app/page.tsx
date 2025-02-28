'use client'
import BorrowedBooksReport from "@/components/dashboard/BorrowedBooksReport";
import {useEffect, useState} from "react";

export default function Home() {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalBorrowed, setTotalBorrowed] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalOverdue, setTotalOverdue] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/books/total')
            .then((response) => response.text())
            .then((data) => setTotalBooks(data))
            .catch((error) => console.error('Error fetching books:', error));

        fetch('http://localhost:8080/api/v1/borrow/total/borrowed')
            .then((response) => response.text())
            .then((data) => setTotalBorrowed(data))
            .catch((error) => console.error('Error fetching borrows:', error));

        fetch('http://localhost:8080/api/v1/members/total')
            .then((response) => response.text())
            .then((data) => setTotalMembers(data))
            .catch((error) => console.error('Error fetching members:', error));

        fetch('http://localhost:8080/api/v1/borrow/total/overdue')
            .then((response) => response.text())
            .then((data) => setTotalOverdue(data))
            .catch((error) => console.error('Error fetching overdue borrows:', error));
    }, []);

  return (
      <div className="p-6 rounded-2xl shadow-lg h-fit p-2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tổng sách */}
              <div className="flex gap-2 items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-300">
                  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className={`text-center`}>
                  Tổng sách
                      <p>{totalBooks}</p>
                  </div>
              </div>
              <div className="flex gap-2 items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-300">
                  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z" stroke="#1C274D" strokeWidth="1.5"/>
                      <path d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" stroke="#1C274D" strokeWidth="1.5"/>
                      <path opacity="0.5" d="M7 16V2.5" stroke="#1C274D" strokeWidth="1.5" strokeLinecap="round"/>
                      <path opacity="0.5" d="M13 16V19.5309C13 19.8065 13 19.9443 12.9051 20C12.8103 20.0557 12.6806 19.9941 12.4211 19.8708L11.1789 19.2808C11.0911 19.2391 11.0472 19.2182 11 19.2182C10.9528 19.2182 10.9089 19.2391 10.8211 19.2808L9.57889 19.8708C9.31943 19.9941 9.18971 20.0557 9.09485 20C9 19.9443 9 19.8065 9 19.5309V16.45" stroke="#1C274D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div className={`text-center`}>
                      Đã mượn
                      <p>{totalBorrowed}</p>
                  </div>
              </div>

              <div className="flex gap-2 items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-300">
                  <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="ic_fluent_calendar_overdue_24_regular" fill="#212121" fillRule="nonzero">
                              <path d="M17.5,12 C20.5376,12 23,14.4624 23,17.5 C23,20.5376 20.5376,23 17.5,23 C14.4624,23 12,20.5376 12,17.5 C12,14.4624 14.4624,12 17.5,12 Z M17.5,19.875 C17.1548,19.875 16.875,20.1548 16.875,20.5 C16.875,20.8452 17.1548,21.125 17.5,21.125 C17.8452,21.125 18.125,20.8452 18.125,20.5 C18.125,20.1548 17.8452,19.875 17.5,19.875 Z M17.75,3 C19.5449,3 21,4.45507 21,6.25 L21,12.0218 C20.5368,11.7253 20.0335,11.4858 19.5,11.3135 L19.5,8.5 L4.5,8.5 L4.5,17.75 C4.5,18.7165 5.2835,19.5 6.25,19.5 L11.3135,19.5 C11.4858,20.0335 11.7253,20.5368 12.0218,21 L6.25,21 C4.45507,21 3,19.5449 3,17.75 L3,6.25 C3,4.45507 4.45507,3 6.25,3 L17.75,3 Z M17.5,14 C17.2239,14 17,14.2239 17,14.5 L17,18.5 C17,18.7761 17.2239,19 17.5,19 C17.7761,19 18,18.7761 18,18.5 L18,14.5 C18,14.2239 17.7761,14 17.5,14 Z M17.75,4.5 L6.25,4.5 C5.2835,4.5 4.5,5.2835 4.5,6.25 L4.5,7 L19.5,7 L19.5,6.25 C19.5,5.2835 18.7165,4.5 17.75,4.5 Z" id="🎨-Color">

                              </path>
                          </g>
                      </g>
                  </svg>
                  <div className={`text-center`}>
                      Quá hạn
                      <p>{totalOverdue}</p>
                  </div>
              </div>

              <div className="flex gap-2 items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-300">
                  <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 26.016q0 0.832 0.576 1.408t1.44 0.576h5.984v-1.984h-0.992q-0.416 0-0.704-0.288t-0.288-0.704 0.288-0.704 0.704-0.32h4q0.384 0 0.704 0.32t0.288 0.704-0.288 0.704-0.704 0.288h-0.992v1.984h12v-1.984h-1.024q-0.384 0-0.704-0.288t-0.288-0.704 0.288-0.704 0.704-0.32h4q0.416 0 0.704 0.32t0.32 0.704-0.32 0.704-0.704 0.288h-0.992v1.984h6.016q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-28q-0.832 0-1.44 0.608t-0.576 1.408v20zM4 22.016v-14.016h14.016v14.016h-14.016zM7.040 20h7.936q-1.12-1.472-2.976-1.856v-0.32q0.896-0.352 1.44-1.088t0.576-1.728v-1.984q0-1.248-0.896-2.144t-2.112-0.864-2.144 0.864-0.864 2.144v1.984q0 0.96 0.544 1.728t1.472 1.088v0.32q-1.856 0.384-2.976 1.856zM20 22.016v-2.016h2.016v2.016h-2.016zM20 18.016v-2.016h10.016v2.016h-10.016zM20 14.016v-2.016h4v2.016h-4zM20 10.016v-2.016h6.016v2.016h-6.016zM26.016 14.016v-2.016h4v2.016h-4zM28 10.016v-2.016h2.016v2.016h-2.016z"/>
                  </svg>
                  <div className={`text-center`}>
                      Thành viên
                      <p>{totalMembers}</p>
                  </div>
              </div>
          </div>
              <BorrowedBooksReport />
          {/*<RecentBorrow />*/}
      </div>
  );
}
