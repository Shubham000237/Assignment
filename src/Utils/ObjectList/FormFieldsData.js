export const FormFieldsData = [
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
  export default FormFieldsData;