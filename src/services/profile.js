import Cherry from 'src/libs/cherry.js';

export default class Profile {
    static query (query = JSON.stringify({})) {
        let data = {
            query,
        };
        return Cherry.post('/account/profile/query', data);
    }
    static updateStatus (username, status) {
        let data = {
            username,
            status,
        };
        return Cherry.post('/account/profile/status/update', data);
    }
    static updateRoles (username, roles) {
        let data = {
            username,
            roles,
        };
        return Cherry.post('/account/profile/role/update', data);
    }
    static updatePassword (username, password, newPassword) {
        let data = {
            username,
            password,
            newPassword,
        };
        return Cherry.post('/account/profile/password/update', data);
    }
    static getCurrentUserInfo (username) {
        let data = {
            username,
        };
        return Cherry.get('/account/profile/get', data);
    }
    static updateUserInfo (username, nickname) {
        let data = {
            username,
            nickname,
        };
        return Cherry.post('/account/profile/update', data);
    }
}
