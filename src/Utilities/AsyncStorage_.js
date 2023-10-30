import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => {
            console.log('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving data:', error);
        });
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('Data loaded successfully:', value);
            return JSON.parse(value); // Return the retrieved value
        } else {
            console.log('Data not found in AsyncStorage');
            return null; // Return null if data is not found
        }
    } catch (error) {
        console.error('Error loading data:', error);
        throw error; // Throw the error to handle it in the calling code
    }
}

export const removeData = async (key) => {
    AsyncStorage.removeItem(key)
        .then(() => {
            console.log('Data removed successfully');
        })
        .catch((error) => {
            console.error('Error removing data:', error);
        });
}

export const clearData = async (key) => {
    AsyncStorage.clear()
        .then(() => {
            console.log('All data cleared');
        })
        .catch((error) => {
            console.error('Error clearing data:', error);
        });
}
