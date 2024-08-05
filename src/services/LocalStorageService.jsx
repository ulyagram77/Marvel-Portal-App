const useLocalStorageService = () => {
    const getItems = key => {
        const savedData = localStorage.getItem(key);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return null;
    };

    const setItems = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    return { setItems, getItems };
};

export default useLocalStorageService;
