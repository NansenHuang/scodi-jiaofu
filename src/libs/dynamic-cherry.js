'use strict';

import 'isomorphic-fetch';
import Frisbee from 'frisbee';

export default class Cherry {
    constructor (baseURI) {
        this.frisbee = new Frisbee({
            baseURI: baseURI,
            headers: {
                credentials: 'include',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    auth (username, password) {
        this.frisbee.auth(`${username}:${password}`);
    }

    jwt (token) {
        this.frisbee.jwt(token);
    }

    async get (url, data) {
        let query = data ? {
            body: data
        } : null;
        let resp = await this.frisbee.get(url, query);
        return resp.body;
    }

    async post (url, data) {
        let body = data ? {
            body: data
        } : null;
        let resp = await this.frisbee.post(url, body);
        return resp.body;
    }
}
