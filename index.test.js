const assert = require('assert');
const KofoUtil = require('./index');


describe('kofo-util', () => {

    let obj = "kofo sdk test message";
    let pwd = "pwd";
    let encryptObj;

    it('#encrypt Use password encrypt to message should return string', async () => {
        encryptObj = KofoUtil.encrypt(obj, pwd);
        assert.equal(typeof encryptObj, 'string');
    });

    it('#decrypt Use password decrypt to encrypted message should equal message', async () => {
        let decryptData = KofoUtil.decrypt(encryptObj, pwd);
        assert.equal(typeof decryptData, 'string');
        assert.equal(decryptData, obj)
    });


    it('#sha256 should return buffer', async () => {
        let bf = KofoUtil.sha256('message');
        assert.ok(Buffer.isBuffer(bf));
        assert.equal(bf.length, 32);
    });

    it('#sha256Twice should return buffer', async () => {
        let bf = KofoUtil.sha256Twice('message');
        assert.ok(Buffer.isBuffer(bf));
        assert.equal(bf.length, 32);
    });

    it('#createPreImage should return string and length 128', async () => {
        let preImage = KofoUtil.createPreImage();
        assert.equal(typeof preImage, 'string');
        assert.equal(preImage.length, 128)
    });

    it('#createHValue should return string and length 64', async () => {
        let preImage = KofoUtil.createPreImage();
        let hValue = KofoUtil.createHValue(preImage);
        assert.equal(typeof hValue, 'string');
        assert.equal(hValue.length, 64)
    });

    describe('create kofo id', () => {
        let kofo;
        let message = 'wait sign message';
        let signedMessage;
        before(() => {
            kofo = KofoUtil.createKofoId();
            assert(kofo.hasOwnProperty('secret'));
            assert(kofo.hasOwnProperty('pubkey'));
            assert(kofo.hasOwnProperty('kofoId'));
        });
        it('#createKofoIdBySecret should equal kofo.kofoId', async () => {
            let kofoId = KofoUtil.createKofoIdBySecret(kofo.secret);
            assert.equal(kofoId, kofo.kofoId);
        });

        it('#createPublicKey should equal kofo.pubkey', async () => {
            let pubkey = KofoUtil.createPublicKey(kofo.secret);
            assert.equal(pubkey, kofo.pubkey);
        });


        it('#createKofoIdByPubKey should equal kofo.kofoId', async () => {
            let kofoId = KofoUtil.createKofoIdByPubKey(kofo.pubkey);
            assert.equal(kofoId, kofo.kofoId);
        });

        it('#sign should return string', async () => {
            signedMessage = KofoUtil.sign(kofo.secret, message);
            assert.equal(typeof signedMessage, 'string');
        });

        it('#verifyWithPubKey Use kofo.pubkey verify signed message should return `true`', async () => {
            let verify = KofoUtil.verifyWithPubKey(kofo.pubkey, signedMessage, message);
            assert.ok(verify);
        });

        it('#verifyWithKofoId Use kofo.kofoId verify signed message should return `true`', async () => {
            let verify = KofoUtil.verifyWithKofoId(kofo.kofoId, signedMessage, message);
            assert(verify);
        });

    })

});
