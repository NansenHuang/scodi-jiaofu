export default class Publish {
    static auth (cherry, verifyusername, verifypassword) {
        cherry.auth(verifyusername, verifypassword);
    }

    static unAuth (cherry) {
        cherry.auth();
    }
}
