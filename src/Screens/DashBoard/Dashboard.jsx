import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

import localStorageHelper from '../../Components/LocalStorageHelper/LocalStorageHelper'
import { CardField } from "../../Utils/Helpers/ObjectList/CardField"
import './DashboardStyle.css'
import { config } from "../../Utils/Config/config";

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
                <Button
                    variant="outlined"
                    className="logoutButton"
                    sx={{ textTransform: 'none', color: 'white' }}
                    onClick={() => handleLogout(navigate)}
                >
                    Log Out
                </Button>
            </Box>
            {/* To-Do Section */}
            <Box display="flex" flexWrap="wrap" gap={5} justifyContent="center">
                {CardField.map((e, index) => (
                    <Card key={index} sx={{ maxWidth: 170 }}>
                        <CardActionArea component={e.component} href={e.href} target={e.target} rel={e.rel}>
                            <CardMedia
                                component="img"
                                height={e.height}
                                width={e.width}
                                image={e.image}
                                alt={`Image for ${e.href}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Button size="small" sx={{ marginLeft: 3, textTransform: 'none' }}
                                        onClick={() => { if (e.action) { e.action(navigate) } }}
                                    >
                                        {e.image && e.image.includes("to-do") && "To-Do"}
                                        {e.href && e.href.includes("chess") && "Chess"}
                                        {e.image && e.image.includes("stopwatch") && "Stopwatch"}
                                        {e.image && e.image.includes("calculator") && "Calculator"}
                                        {e.image && e.image.includes("kbg") && "QR Code"}
                                    </Button>
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