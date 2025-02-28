'use client';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {useEffect, useState} from "react";

export function DefaultSidebar() {
    const [overdue, setOverdue] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/borrow/total/overdue')
            .then((response) => response.text())
            .then((data) => setOverdue(data))
            .catch((error) => console.error('Error fetching overdue borrows:', error));
    }, []);

    return (
        <Card className="h-[calc(100vh-2rem)] sticky top-0 bg-gray-100 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Dong1.PRO
                </Typography>
            </div>
            <List>
                <Link href="/">
                    <ListItem>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link href="/member">
                    <ListItem>
                        <ListItemPrefix>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </ListItemPrefix>
                        Thành viên
                    </ListItem>
                </Link>
                <Link href="/borrow">
                    <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Mượn trả
                        <ListItemSuffix>
                            <Chip value={overdue} size="sm" variant="ghost" color="red" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                <Link href="/book">
                    <ListItem>
                        <ListItemPrefix>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                            </svg>
                        </ListItemPrefix>
                        Sách
                    </ListItem>
                </Link>
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <Cog6ToothIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Settings*/}
                {/*</ListItem>*/}
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <PowerIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Log Out*/}
                {/*</ListItem>*/}
            </List>
        </Card>
    );
}