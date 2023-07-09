import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Key for identifying stripe account
 */
export const REVENUT_ACCOUNTID_STRIPE: string = 'REVENUT_USER_IDENTIFIER_STRIPE';

/**
 * Returns a value from storage for the requested key
 * 
 * @param key storage key
 *  
 * @returns {string} 
 */
export async function getStorageValue(key: string): Promise<string | null> {
	let result = null;

	try {
		result = await AsyncStorage.getItem(key);
	}
	catch (e) {
		console.error(e);
	}

	return result;
}

/**
 * Saves a value to storage under the provided key
 * 
 * @param key storage key
 * @param value value to store
 */
export async function saveToStorage(key: string, value: string): Promise<void> {
	try {
		await AsyncStorage.setItem(key, value);
	}
	catch (e) {
		console.error(e);
	}
}

/**
 * Removes the requested key from storage
 * 
 * @param key storage key
 */
export async function removeFromStorage(key: string): Promise<void> {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		console.error(e);
	}
}

/**
 * @returns `true` if the requested key is in storage
 * 
 * @param key storage key
 * 
 * @returns {boolean} 
 */
export async function hasStorageValue(key: string): Promise<boolean> {
	let hasValue = false;
	let result = await getStorageValue(key);

	if (result) {
		hasValue = true;
	}

	return hasValue;
}