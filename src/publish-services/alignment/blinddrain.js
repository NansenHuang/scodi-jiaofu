export default class Blinddrain {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/blinddrain/add/multi', data);
    }
}
