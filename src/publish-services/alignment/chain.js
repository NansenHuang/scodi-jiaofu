export default class Chain {
    static batchUpload (cherry, project, datas, overwrite) {
        let data = {
            project,
            datas,
            overwrite,
        };
        return cherry.post('/model/chain/add/multi', data);
    }
}
