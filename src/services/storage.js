import Cherry from 'src/libs/cherry.js';

export default class Storage {
    static getUploadUrl (project, modelType, name) {
        let data = {
            project,
            modelType,
            name,
        };
        return Cherry.post('/model/storage/put', data);
    };
    static getUploadUrls (project, modelType, names) {
        let data = {
            project,
            modelType,
            names,
        };
        return Cherry.post('/model/storage/puts', data);
    };
    static getDownloadUrl (project, modelType, name) {
        let data = {
            project,
            modelType,
            name,
        };
        return Cherry.post('/model/storage/get', data);
    };
    static getDownloadUrls (project, modelType, names) {
        let data = {
            project,
            modelType,
            names,
        };
        return Cherry.post('/model/storage/gets', data);
    };
}
