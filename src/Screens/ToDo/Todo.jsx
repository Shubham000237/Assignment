import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Divider,
    FormControlLabel,
    Checkbox,
    Pagination,
    Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { config } from "../../Utils/Config/config";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import Toggle from "../../Utils/Helpers/TodoToggleStatusCompoenent/Toggle";
import { toDoField } from "../../Utils/Helpers/SignUpAndLoginData/ArrayOfObject";
import localStorageHelper from "../../Components/LocalStorageHelper/LocalStorageHelper";
import { ThemeProvider } from "@mui/material/styles";
import theme from './TodoStyle'

const Todo = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorageHelper.getItem("loggedInUser");
    const getStoredTasks = () => {
        if (!userKey) return [];
        const userData = localStorageHelper.getItem("user", {});

        return userData[loggedInUser.email]?.tasks || [];
    };
    const userKey = loggedInUser.email ? `user-${loggedInUser.email}` : null;
    const [tasks, setTasks] = useState(getStoredTasks);
    const [filters, setFilters] = useState({ status: "all", page: 1 });
    const [taskInput, setTaskInput] = useState({ text: "", id: null });
    const tasksPerPage = 5;
    const filteredTasks = tasks.filter((task) =>
        filters.status === "all" ? true : filters.status === "completed" ? task.completed : !task.completed
    );
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const firstIndex = (filters.page - 1) * tasksPerPage;
    const lastIndex = filters.page * tasksPerPage;
    const paginatedTasks = filteredTasks.slice(firstIndex, lastIndex);

    // Load tasks from localStorage
    useEffect(() => {
        const userData = localStorageHelper.getItem("user", {});
        userData[loggedInUser.email] = { tasks };
        localStorageHelper.setItem("user", userData);
    }, [tasks, loggedInUser.email]);

    const handleInputChange = (event) => { setTaskInput({ ...taskInput, text: event.target.value }) };
    const handleKeyDown = (e) => {
        const trimmedText = taskInput.text.trim();

        if (e.key !== "Enter") return;

        if (!config.Regex.taskRegex.test(trimmedText)) return;

        const isDuplicate = tasks.some(task =>
            task.text.trim().toLowerCase() === trimmedText.toLowerCase() && task.id !== taskInput.id
        );

        if (isDuplicate) {
            alert(config.message.taskExist);

            return;
        }

        if (taskInput.id) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskInput.id ? { ...task, text: trimmedText } : task
                )
            );
        } else {
            // Add a new task
            setTasks((prevTasks) => [
                ...prevTasks,
                { id: Date.now(), text: trimmedText, completed: false },
            ]);
        }

        // Reset input after operation
        setTaskInput({ text: "", id: null });
    };

    //Edit the current task and update the same as per the changes
    const editTask = (task) => setTaskInput(task);

    //Toggle the status
    const toggleCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    //Delete the task and will switch the previous page if there is no task found on current page or next page
    const deleteTask = (id) => {
        setTasks((prevTasks) => {
            const oldTasks = prevTasks.filter((task) => task.id !== id);
            const updatedTasks = oldTasks.filter((task) =>
                filters.status === "all" ? true : filters.status === "completed" ? task.completed : !task.completed
            );
            const updatedTotalPages = Math.ceil(updatedTasks.length / tasksPerPage);
            // Adjust the current page if it exceeds the total pages after deletion
            if (filters.page > updatedTotalPages && updatedTotalPages > 0) {
                setFilters((prev) => ({ ...prev, page: updatedTotalPages }));
            }

            return oldTasks;
        });

        if (taskInput.id === id) {
            setTaskInput({ text: "", id: null });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <>
                {/* Header */}
                <Box sx={{ p: "1vh", backgroundColor: "#074b88", boxSizing: "border-box" }}>
                    <Button onClick={() => navigate("/home")} sx={{ color: "white", textTransform: "none", fontSize: "1.8vh" }}>
                        <ArrowBackIosIcon sx={{ fontSize: "1.5vh" }} /> Back
                    </Button>
                </Box>

                {/* Main Container */}
                <Box display={"flex"} justifyContent={"center"} p={"2vh"} className="MuiBox-toDoLayout">
                    <Box
                        sx={theme.customComponents.toDoLayout}
                    >
                        <Typography variant="h6" sx={{ textAlign: "center", fontSize: { xs: "2vh", md: "2.5vh" }, mb: "2vh" }}>
                            To-Do List
                        </Typography>

                        {/* Task Input */}
                        {toDoField.map((item) => (
                            <TextFieldComponent
                                key={item.label}
                                fullWidth={item.fullWidth}
                                label={item.label}
                                variant={item.variant}
                                value={taskInput.text}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                error={taskInput.text?.trim().length > 0 && taskInput.text.trim().length <= 2}
                                helperText={
                                    taskInput.text?.trim().length > 0 && taskInput.text.trim().length <= 2 ? config.message.textTask
                                        : ""}
                                sx={theme.customComponents.textFieldLayout}
                            />
                        ))}
                        <Divider sx={{ p: "1vh", mb: "2vh" }} />
                        <Toggle
                            status={filters.status}
                            setStatus={(status) => {
                                const updatedTasks = tasks.filter((task) =>
                                    status === "all" ? true : status === "completed" ? task.completed : !task.completed
                                );
                                const updatedTotalPages = Math.ceil(updatedTasks.length / tasksPerPage) || 1;
                                const newPage = filters.page > updatedTotalPages ? updatedTotalPages : filters.page;
                                setFilters({ status, page: newPage });
                            }}
                        />

                        {/* Tasks List */}
                        <Box>
                            {paginatedTasks.length > 0 ? (
                                paginatedTasks.map((task) => (
                                    <Box
                                        key={task.id}
                                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "1vh", }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={task.completed}
                                                    onChange={() => toggleCompletion(task.id)}
                                                    sx={{ transform: { xs: "scale(0.9)", sm: "scale(0.8)", md: "scale(1.2)" } }}
                                                />
                                            }
                                        />
                                        <Typography
                                            sx={{ flexGrow: 1, fontSize: { xs: "2.5vh", md: "2.3vh" }, overflow: "auto", textOverflow: "clip", }}
                                        >
                                            {task.text}
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: "1vw" }}>
                                            <Button
                                                onClick={() => editTask(task)}
                                                sx={{ textTransform: "none", fontSize: { xs: "1.7vh", md: "1.8vh" } }}
                                            >Edit
                                            </Button>
                                            <Button
                                                onClick={() => deleteTask(task.id)}
                                                color="error"
                                                sx={{ textTransform: "none", fontSize: { xs: "1.7vh", md: "1.8vh" } }}
                                            >Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={{ textAlign: "center", mt: "2vh", color: "gray", fontSize: "2vh" }}>
                                    {config.message.noTask}
                                </Typography>
                            )}
                        </Box>
                        {/* Pagination */}
                        {filteredTasks.length > tasksPerPage && (
                            <Stack spacing={2} sx={{ alignItems: "center", mt: "3vh" }}>
                                <Pagination
                                    count={totalPages}
                                    page={filters.page}
                                    onChange={(_, page) => setFilters({ ...filters, page })}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>
                        )}
                    </Box>
                </Box>
            </>
        </ThemeProvider>
    );
};

export default Todo;