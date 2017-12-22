'use strict';
import es6promise from 'es6-promise';
import 'isomorphic-fetch';
import Frisbee from 'frisbee';

es6promise.polyfill();

export default class Cherry {
    static init (baseURI) {
        Cherry.frisbee = new Frisbee({
            baseURI: baseURI,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    static auth (username, password) {
        Cherry.frisbee.auth(`${username}:${password}`);
    }

    static jwt (token) {
        Cherry.frisbee.jwt(token);
    }

    static logout () {
        Cherry.frisbee.jwt();
        Cherry.frisbee.auth();
    }

    static async get (url, data, withCredential = true) {
        let body = {};
        if (withCredential) {
            body['credentials'] = 'include';
        }
        if (data) {
            body['body'] = data;
        }
        let resp = await Cherry.frisbee.get(url, body);
        Cherry.verifybody(resp);
        return resp.body;
    }

    static async post (url, data, withCredential = true) {
        let body = {};
        if (withCredential) {
            body['credentials'] = 'include';
        }
        if (data) {
            body['body'] = data;
        }
        let resp = await Cherry.frisbee.post(url, body);
        Cherry.verifybody(resp);
        return resp.body;
    }

    static verifybody (resp) {
        if (resp.status === 403) {
            // eslint-disable-next-line no-console
            console.error('登录超时，请重新登录！');
        }
        let body = resp.body;
        if (body && body.hasOwnProperty('code') && body.hasOwnProperty('message') && body.hasOwnProperty('text')) {
            // eslint-disable-next-line no-console
            console.error(body.text);
        }
    }
}
