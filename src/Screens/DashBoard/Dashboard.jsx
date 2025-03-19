import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

import localStorageHelper from '../../Components/LocalStorageHelper/LocalStorageHelper'
import { cardField } from "../../Utils/Helpers/SignUpAndLoginData/ArrayOfObject"
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
                <Card sx={{ maxWidth: 400 }}
                    display="flex"
                    justifyContent="center"
                    gap={{ xs: 2, sm: 2, md: 15 }}
                    className="boxSlot">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            width="140"
                            image="https://static.vecteezy.com/system/resources/previews/014/457/026/original/notebook-label-to-do-list-icon-clipart-in-cartoon-animated-vector.jpg"
                            alt="to-do"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <Button size="small" sx={{ marginLeft: 3, textTransform: 'none' }} onClick={() => navigate("/Todo")}>To-Do</Button>
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
                {cardField.map((e, index) => (
                    <Card key={index} sx={{ maxWidth: 170 }}>
                        <CardActionArea component={e.component} href={e.href} target={e.target} rel={e.rel}>
                            <CardMedia
                                component="img"
                                height="140"
                                width="140"
                                image={e.image}
                                alt={`Image for ${e.href}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Button size="small" sx={{ marginLeft: 3, textTransform: 'none' }}>
                                        {e.href.includes("chess") && "Chess"}
                                        {e.href.includes("snooker") && "Snooker"}
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
                <Card sx={{ maxWidth: 400 }}
                    display="flex"
                    justifyContent="center"
                    gap={{ xs: 2, sm: 2, md: 15 }}
                    className="boxSlot">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            width="140"
                            image="https://www.shutterstock.com/image-vector/stopwatch-stop-watch-timer-flat-600nw-355549763.jpg"
                            alt="stopwatch"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <Button size="small" sx={{ marginLeft: 2, textTransform: 'none' }} onClick={() => navigate("/stopwatch")}>Stop-watch</Button>
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;