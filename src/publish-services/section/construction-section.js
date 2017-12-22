export default class Cunstruction {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/section/construct/add/multi', data);
    }
}
