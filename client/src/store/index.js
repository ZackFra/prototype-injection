import localforage from 'localforage';

localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
    size: 4980736,
    storeName: 'poetry-collection',
    version: 1.0,
    description: 'used to store submitted poetry'
});

const store = localforage.createInstance();

export default store;