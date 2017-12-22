export default class Interchange {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/interchange/add/multi', data);
    }
}
