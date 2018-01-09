import Cherry from 'src/libs/cherry.js';

export default class Storage {
    static getUploadUrl (project, name) {
        let data = {
            project,
            name,
        };
        return Cherry.post('/drawing/storage/put', data);
    };
    static getUploadUrls (project, names) {
        let data = {
            project,
            names,
        };
        return Cherry.post('/drawing/storage/puts', data);
    };
    static getDownloadUrl (project, name) {
        let data = {
            project,
            name,
        };
        return Cherry.post('/drawing/storage/get', data);
    };
    static getDownloadUrls (project, names) {
        let data = {
            project,
            names,
        };
        return Cherry.post('/drawing/storage/gets', data);
    };
    static deleteFile (project, name) {
        let data = {
            project,
            name,
        };
        return Cherry.post('/drawing/storage/delete', data);
    };
    static batchDeleteFiles (project, names) {
        let data = {
            project,
            names,
        };
        return Cherry.post('/drawing/storage/deletes', data);
    };
}
