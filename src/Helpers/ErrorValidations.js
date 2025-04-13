import { config } from "../Utils/Config/config";

// **Sign-Up Form Validation**
export const checkForm = (data) => {

    //User's name Validation
    const errors = {};
    errors.name = !data.name?.trim()
        ? config.message.name
        : !config.Regex.nameRegex.test(data.name)
            ? config.message.validName
            : data.name.length < 2
                ? config.message.validLastName
                : "";

    //User's birth date validation
    const today = new Date();
    const birthDate = new Date(data.date || "");
    const enteredYear = birthDate.getFullYear().toString();
    const age = today.getFullYear() - birthDate.getFullYear();
    errors.date = !data.date
        ? config.message.date
        : enteredYear.length !== 4
            ? config.message.year
            : birthDate > today
                ? config.message.futureDate
                : (age < 18)
                    ? config.message.validDate
                    : (age > 100) ? config.message.validDate1
                        : "";

    //User's email Validation
    if (data.email?.trim().length === (data.email || '')) {
        errors.email = config.message.email;
    } else if (data.email === "email") {
        errors.email = data.email?.trim()
    } else if (!config.Regex.emailRegex.test(data.email)) {
        errors.email = config.message.validEmail;
    } else {
        errors.email = "";
    }

    //User's phone number validation
    if (!data.mobile?.trim()) {
        errors.mobile = config.message.mobile;
    } else if (data.mobile === "mobile") {
        errors.mobile = data.mobile.replace(/[^\d]/g, "");
    } else if (!config.Regex.mobileRegex.test(data.mobile || '')) {
        errors.mobile = config.message.validMobile;
    } else {
        errors.mobile = "";
    }

    //User's password Validation
    errors.password = !data.password?.trim()
        ? config.message.password
        : !config.Regex.passwordRegex.test(data.password?.trim() || "")
            ? config.message.validpassword
            : "";

    //User's confirm-password Validation
    errors.confirmpassword = !data.confirmpassword?.trim()
        ? config.message.confirmpassword
        : data.confirmpassword !== data.password
            ? config.message.matchPass
            : "";

    //User's address validation
    if (data.address && data.address.trim() === "") {
        errors.address = config.message.address;
    } else if (data.address && (data.address.trim().length < 10 || data.address.trim().length > 100)) {
        errors.address = config.message.validAddress;
    } else {
        errors.address = "";
    }

    return errors;
};

const ErrorValidations = {
    checkForm
};

export default ErrorValidations;