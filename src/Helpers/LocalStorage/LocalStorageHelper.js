import { config } from "../../Utils";

const localStorageHelper = {
    getItem: (key, defaultValue) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error(config.message.getItemLocalStorage`${key}`, error);
            return defaultValue;
        }
    },
    setItem: (key, value) => {
        try {
            if (!value) {
                return;
            }
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(config.message.setItemLocalStorage`${key}`, error);
        }
    },

    // Remove item from localStorage safely
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(config.message.removeItemLocalStorage`${key}`, error);
        }
    },

    // Update specific data inside an existing localStorage item
    updateItem: (key, callback) => {
        try {
            const existingValue = localStorageHelper.getItem(key, {});
            if (existingValue) {
                const updatedValue = callback(existingValue);
                localStorageHelper.setItem(key, updatedValue);
            } else {
            }
        } catch (error) {
            console.log(`Error updating item in localStorage: ${key}`, error);
        }
    },
    // Check if a key exists in localStorage
    exists: (key) => {
        return localStorage.getItem(key) !== null;
    },
};

export {localStorageHelper};