// src/utils/localStorageUtils.ts

// Function to save data to local storage
export const saveDataToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

// Function to load data from local storage
export const loadDataFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from local storage:', error);
    return null;
  }
};

// Function to export all local storage data to clipboard
export const exportLocalStorageData = () => {
  try {
    const data = {
      relationships: loadDataFromLocalStorage('relationships'),
      reportCards: loadDataFromLocalStorage('reportCards'),
      extracurriculars: loadDataFromLocalStorage('extracurriculars'),
      job: loadDataFromLocalStorage('job'),
    };

    const jsonData = JSON.stringify(data);
    navigator.clipboard.writeText(jsonData);
    console.log('Relevant local storage data copied to clipboard!');
  } catch (error) {
    console.error('Error exporting local storage data:', error);
  }
};

// Function to import data from clipboard to local storage
export const importLocalStorageData = async () => {
  try {
    const jsonData = await navigator.clipboard.readText();
    const data = JSON.parse(jsonData);
    for (const key in data) {
      saveDataToLocalStorage(key, data[key]);
    }
    console.log('Local storage data imported from clipboard!');
  } catch (error) {
    console.error('Error importing local storage data:', error);
  }
};
