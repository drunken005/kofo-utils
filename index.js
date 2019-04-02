const CryptoJS = require("crypto-js");
const base58 = require('bs58');
const ECKey = require('eckey-util');
const KOFO_PREFIX = 'KOFO';


const  _isObject = function(value) {
    let type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};

const  _isBuffer = function(value) {
    return Buffer.isBuffer(value);
};

/**
 * @description Return length 128 random string
 * @param length
 * @returns {string}
 */
const createPreImage = function (length = 128) {
    let preImage = [];
    let flags = [0, 0, 0];
    let i = 0;

    while (flags[0] === 0 || flags[1] === 0 || flags[2] === 0 || i < length) {
        i = i % length;
        let f = Math.floor(Math.random() * 3);

        if (f === 0) {
            preImage[i] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        } else if (f === 1) {
            preImage[i] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        } else {
            preImage[i] = Math.floor(Math.random() * 10);
        }

        flags[f] = 1;
        i++;
    }

    return preImage.join("");
};

/**
 * @description Return hash 256 twice to hex string
 * @param preImage
 * @returns {*}
 */
const createHValue = function (preImage) {
    return ECKey.sha256Twice(preImage).toString('hex');
};


/**
 * @description Create kofo private key and id
 * @returns {{kofoId: string, secret: string}}
 */
const createKofoId = function () {
    let secret = ECKey.createPrivate();
    let pubkey = ECKey.getPublicKey(secret);
    let kofoId = KOFO_PREFIX + base58.encode(Buffer.from(pubkey, 'hex'));
    return {kofoId, pubkey, secret};
};

/**
 * @description get kofoId by private
 * @param secret
 * @returns {*}
 */
const createKofoIdBySecret = function (secret) {
    let pubkey = ECKey.getPublicKey(secret);
    return KOFO_PREFIX + base58.encode(Buffer.from(pubkey, 'hex'));
};

/**
 * @description get public key by private
 * @param secret
 * @returns {*}
 */
const createPublicKey = function (secret) {
    return ECKey.getPublicKey(secret);
};

/**
 * @description Create Kofo Id by public key
 * @param publicKey
 * @returns {*}
 */
const createKofoIdByPubKey = function (publicKey) {
    return KOFO_PREFIX + base58.encode(Buffer.from(publicKey, 'hex'));
};

/**
 * @description Use secret for elliptic curve signature
 * @param kofoSecret
 * @param data
 * @returns {*}
 */
const sign = function (kofoSecret, data) {
    if (!kofoSecret || !data) {
        throw new TypeError('kofo secret or data is null');
    }

    if (_isBuffer(data)) {
        return ECKey.signHash(data, kofoSecret);
    }
    let signature = ECKey.sign(data, kofoSecret);
    return base58.encode(Buffer.from(signature, 'hex'));
};

/**
 * @description Verify signature with public key
 * @param pubKey
 * @param signature
 * @param data
 * @returns {*}
 */
const verifyWithPubKey = function (pubKey, signature, data) {
    signature = base58.decode(signature).toString('hex');
    return ECKey.verify(data, signature, pubKey);
};

/**
 * @description Verify signature with kofo Id
 * @param kofoId
 * @param signature
 * @param data
 * @returns {*}
 */
const verifyWithKofoId = function (kofoId, signature, data) {
    if (kofoId.indexOf(KOFO_PREFIX) !== 0) {
        throw Error('Invalid kofo Id')
    }
    let publicKey = base58.decode(kofoId.substr(4)).toString('hex');
    return verifyWithPubKey(publicKey, signature, data)
};


const encrypt = function (data, secret) {
    if (!secret) {
        throw new Error('Encrypt data secret is null');
    }
    if (_isObject(data)) {
        data = JSON.stringify(data)
    }
    return CryptoJS.AES.encrypt(data, secret).toString();
};

const decrypt = function (data, secret) {
    if (!secret) {
        throw new Error('Decrypt data secret is null');
    }
    return CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
};


module.exports = {
    sha256: ECKey.sha256,
    sha256Twice: ECKey.sha256Twice,
    createHValue,
    createPreImage,
    createKofoId,
    createPublicKey,
    createKofoIdBySecret,
    createKofoIdByPubKey,
    verifyWithPubKey,
    verifyWithKofoId,
    sign,
    encrypt,
    decrypt
};