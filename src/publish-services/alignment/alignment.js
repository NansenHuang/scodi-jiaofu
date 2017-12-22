export default class Alignment {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/alignment/add/multi', data);
    }
}
