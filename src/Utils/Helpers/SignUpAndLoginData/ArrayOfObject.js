export const formFields = [
  {
    label: "Enter your Name",
    name: "name",
    type: "text",
    variant: 'outlined',
  },
  {
    label: "",
    name: "date",
    type: "date",
    variant: 'outlined',
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    variant: 'outlined',
  },
  {
    label: "Mobile Number",
    name: "mobile",
    type: "text",
    variant: 'outlined',
  },
  {
    label: "Password",
    name: "password",
    password: false,
    variant: 'outlined',
  },
  {
    label: "Confirm Password",
    name: "confirmpassword",
    type: "password",
    confirmPassword: true,
    variant: 'outlined',
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    multiline: true,
    rows: 4,
    variant: 'outlined',
  }
];
export default formFields;

export const loginField = [
  {
    label: "Email",
    name: "email",
    type: "email",
    fullWidth: true,
  },
  {
    label: "Password",
    name: "password",
    fullWidth: true,
    isPassword: true,
  },
]
export const toDoField = [
  {
    fullWidth: true,
    label: "Enter a task",
    variant: "outlined"
  }
]

export const cardField = [
  {
    component: "a",
    href: "https://www.chess.com/play/computer",
    target: "_blank",
    rel: "noopener noreferrer",
    image: "https://static.vecteezy.com/system/resources/previews/000/459/088/original/vector-chess-game-realistic.jpg"
  },
  {
    component: "a",
    href: "https://www.flashsnooker.com/html5/index.html?ts=1740636044284",
    target: "_blank",
    rel: "noopener noreferrer",
    image: "https://cuesportsacademy.ca/wp-content/uploads/2020/08/h1-rev-background-img.jpg"
  },
]

export const stopWatchButton = [
  {
    icon: ("PlayArrowIcon", "PauseIcon"),
    action: ((setStatus) => setStatus(true),(setStatus) => setStatus(false)),
  },

]

export const stopWatchLabels = [
  {
    label: "Hour",
    key: "hours",
    margin: -5
  },
  {
    label: "Minutes",
    key: "minutes",
    margin: -5
  },
  {
    label: "Seconds",
    key: "seconds",
    margin: 0
  }
];