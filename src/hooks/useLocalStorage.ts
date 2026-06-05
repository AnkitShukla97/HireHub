import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for managing localStorage with type safety
 * Provides get, set, and remove operations with automatic JSON serialization
 * 
 * @template T - The type of value being stored
 * @param key - The localStorage key
 * @param initialValue - The initial value if key doesn't exist in localStorage
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]} Tuple containing:
 *   - Current value
 *   - Function to set value (supports updater function)
 *   - Function to remove value from localStorage
 * 
 * @example
 * // Store a string
 * const [theme, setTheme, removeTheme] = useLocalStorage<string>('theme', 'light');
 * 
 * // Store an object
 * const [user, setUser, removeUser] = useLocalStorage<User>('user', null);
 * 
 * // Store with updater function
 * const [count, setCount] = useLocalStorage<number>('count', 0);
 * setCount(prev => prev + 1);
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] => {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from localStorage by key
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;

      if (item) {
        // Parse stored json or return initialValue
        return JSON.parse(item) as T;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync state to localStorage when it changes
  useEffect(() => {
    try {
      // Only execute on client side
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to set value (supports updater function like useState)
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function for the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [storedValue, key]);

  // Function to remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};
