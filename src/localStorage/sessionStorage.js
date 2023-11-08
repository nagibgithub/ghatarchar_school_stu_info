// use local storage to manage cart data
const addToDb = id => {
    if (!sessionStorage.getItem("id")) {
        const idArray = [id];
        const stringArray = JSON.stringify(idArray);
        sessionStorage.setItem("id", stringArray);
    } else {
        const getDataFromLocalStorage = JSON.parse(sessionStorage.getItem("id"));
        getDataFromLocalStorage.push(id);
        sessionStorage.setItem("id", JSON.stringify(getDataFromLocalStorage));
    }
};

const removeFromDb = id => {
    const getDataFromLocalStorage = JSON.parse(sessionStorage.getItem("id"));
    let newArr = [];
    for (const i of getDataFromLocalStorage) {
        if (i !== id) {
            newArr.push(i);
        }
    }
    sessionStorage.setItem("id", JSON.stringify(newArr));
};

export {
    addToDb,
    removeFromDb
};