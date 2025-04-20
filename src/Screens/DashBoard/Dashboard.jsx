import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

import './DashboardStyle.css'
import { CardData } from "../../Utils";
import {localStorageHelper} from '../../Helpers'
import {config} from '../../Utils'
import {CustomButton} from "../../Components";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Function to fetch the logged-in user from localStorage
    const fetchUser = () => {
        const usersData = localStorage.getItem("users");
        const loggedInUserData = localStorage.getItem("loggedInUser");
        const users = JSON.parse(usersData) || [];
        const loggedInUser = JSON.parse(loggedInUserData);
        let currentUser = loggedInUser;

        if (!usersData || !loggedInUserData) return;

        if (typeof loggedInUser.userIndex !== "number" || users.length === 0) {
            currentUser = users[loggedInUser.userIndex] || loggedInUser;
        }

        setUser(currentUser || null);
    };

    useEffect(() => {
        fetchUser();
        window.addEventListener("storage", fetchUser);
        return () => window.removeEventListener("storage", fetchUser);
    }, []);

    const handleLogout = () => {
        let existingUsers = localStorageHelper.getItem("users") || [];
        let loggedInUser = localStorageHelper.getItem("loggedInUser");
        let userIndex = existingUsers.findIndex(user => user.email === loggedInUser.email);

        if (!loggedInUser) {
            return;
        }

        if (userIndex !== -1) {
            existingUsers[userIndex].loggedInUser = false;
            localStorageHelper.setItem("users", existingUsers);
        }

        localStorageHelper.removeItem("loggedInUser");
        setTimeout(() => {
            navigate("/login");
        }, 100);

        setUser(null);
    };

    return (
        <Box>
            {/* Header Section */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className="box"
            >
                <Typography className="title">
                    {config.message.welcome}, {user?.name || 'Guest'}
                </Typography>
                <CustomButton
                    variant="outlined"
                    className="logoutButton"
                    sx={{ textTransform: 'none', color: 'white' }}
                    onClick={() => handleLogout(navigate)}
                >
                    Log Out
                </CustomButton>
            </Box>
            {/* To-Do Section */}
            <Box display="flex" flexWrap="wrap" gap={5} justifyContent="center">
                {CardData.map((event, index) => (
                    <Card key={index} onClick={() => { if (event.action) { event.action(navigate) } }} sx={{ maxWidth: 170 }}>
                        <CardActionArea component={event.component} href={event.href} target={event.target} rel={event.rel}>
                            <CardMedia
                                component="img"
                                height={event.height}
                                width={event.width}
                                image={event.image}
                                alt={`Image for ${event.href}`}
                            />
                            <CardContent size="small" sx={{ display:'flex', justifyContent:'center', textTransform: 'none' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                        {event.image && event.image.includes("to-do") && "To-Do"}
                                        {event.href && event.href.includes("chess") && "Chess"}
                                        {event.image && event.image.includes("stopwatch") && "Stopwatch"}
                                        {event.image && event.image.includes("calculator") && "Calculator"}
                                        {event.image && event.image.includes("fJf") && "QR Code"}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;