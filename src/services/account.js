import Cherry from 'src/libs/cherry.js';

export default class Account {
    static create (verifyusername, verifypassword, username, password, nickname) {
        let data = {
            username,
            password,
            nickname,
            roles: JSON.stringify({ Admin: true, Player: true }),
        };
        Cherry.auth(verifyusername, verifypassword);
        let p = Cherry.post('/account/player/create', data, false);
        p.then(() => { Cherry.auth(); });
        return p;
    }

    static register (username, password, nickname, channnel) {
        let data = {
            username,
            password,
            nickname,
            channnel,
        };
        return Cherry.post('/account/player/register', data);
    };

    static status () {
        return Cherry.get('/account/player/status');
    }

    // static logout () {
    //     return Cherry.post('/auth/account/logout');
    // }

    static logon (username, password) {
        let data = {
            username,
            password,
            platform: 'web',
        };
        return Cherry.post('/account/player/logon', data);
    }
}
