export default class Softbase {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/softbasefill/add/multi', data);
    }
}
