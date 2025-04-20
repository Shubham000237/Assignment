import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
const CalculatorData = [
    // 1st division
    [
        {
            value: "toggle",
            isIconButton: true,
        },

        {
            value: "%",
        },
        {
            value: "clr",
            icon: <BackspaceOutlinedIcon />
        },
        {
            value: "AC",
        },

    ],
    // 2nd division
    [
        {
            value: "7",
        },
        {
            value: "8",
        },
        {
            value: "9",
        },
        {
            value: "*",
        }
    ],
    // 3rd division
    [
        {
            value: "4",
        },
        {
            value: "5",
        },
        {

            value: "6",
        },
        {
            value: "-",
        }
    ],
    // 4th division
    [
        {
            value: "1",
        },
        {
            value: "2",
        },
        {
            value: "3",
        },
        {
            value: "+",
        }
    ],
    // 5th division
    [
        {
            value: "0",
        },
        {
            value: ".",
        },
        {
            value: "=",
        },
        {
            value: "/",
        },
    ],
];
export {CalculatorData};