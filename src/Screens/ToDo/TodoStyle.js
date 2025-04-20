import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          ...{
            width: { xs: "90vw", sm: "80vw", md: "60vw", lg: "40vw" },
            minHeight: { xs: "60vh", sm: "65vh", md: "70vh" },
            p: { xs: "2vh", sm: "3vh", md: "4vh" },
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          mb: "2vh",
          fontSize: { xs: "1.4vh", sm: "1.6vh", md: "1.8vh" },
          width: { xs: "100%", sm: "80%", md: "60%" },
          "& .MuiInputBase-root": {
            height: { xs: "4vh", sm: "5vh", md: "6vh" },
          },
          "& .MuiInputLabel-root": {
            fontSize: { xs: "1.2vh", sm: "1.5vh", md: "2vh" },
          },
          "& .MuiFormHelperText-root": {
            fontSize: { xs: "1vh", sm: "1.2vh", md: "1.4vh" },
          },
        },
      },
    },
  },
  customComponents: {
    toDoLayout: {
      width: { xs: "90vw", sm: "80vw", md: "60vw", lg: "40vw" },
      minHeight: { xs: "60vh", sm: "65vh", md: "70vh" },
      p: { xs: "2vh", sm: "3vh", md: "4vh" },
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f8f9fa",
    },
    textFieldLayout: {
      mb: "2vh",
      fontSize: { xs: "1.4vh", sm: "1.6vh", md: "1.8vh" },
      width: { xs: "100%", sm: "80%", md: "60%" },
      "& .MuiInputBase-root": {
        height: { xs: "4vh", sm: "5vh", md: "6vh" },
      },
      "& .MuiInputLabel-root": {
        fontSize: { xs: "1.2vh", sm: "1.5vh", md: "2vh" },
        transform: "translate(14px, 12px) scale(1)",
      },
      "& .MuiFormHelperText-root": {
        fontSize: { xs: "1vh", sm: "1.2vh", md: "1.4vh" },
      },
    },
  },
});

export default theme;