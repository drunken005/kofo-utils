# kofo-utils
Kofo utils
# Install
```bash
npm install kofo-utils --save
```

# Test
```bash
npm test
```

# API
* #### createKofoId() Create Kofo pubkey and secret
    ```js
    //Create kofoId, pubkey, secret
    const obj = Utils.createKofoId();
    return:
    { kofoId: 'KOFOjNZSVTtXqSKtQNszQki6nHjt2F67GxqDeTqyBfM9nTuk',
      pubkey: '027590ba33bf9ec4afe5848b12faec5d5e7bc194f30f3ca29f121675d02b92d223',
      secret: 'dafd1ae95b8bb22617a05fcc022f65c53adf6ef26ece15ab69374538533033a6'
    }
    ```
* #### createPublicKey(secret`<String>`) Create pubkey by kofo secret
    ```js
    Utils.createPublicKey(kofo.secret);
    ```

* #### createKofoIdBySecret(secret`<String>`) Create kofoId by kofo secret
    ```js
    Utils.createKofoIdBySecret(kofo.secret);
    ```

* #### createKofoIdByPubKey(publicKey`<String>`) Create kofoId by kofo pubkey
    ```js
    Utils.createKofoIdByPubKey(kofo.pubkey);
    ```

* #### sign(secret`<String>`, data`<any>`) Sign the data use kofo secret
    ```js
    //Use secret for elliptic curve signature
    const signed = Utils.sign(kofo.secret, 'Hello world!');
    ```

* #### verifyWithKofoId(kofoId`<String>`, signature`<String>`, data`<any>`) Verify signature with kofo id
    ```js
    //Verify signature with kofo id
    Utils.verifyWithKofoId(kofo.kofoId, signed, 'Hello world!')
    ```

* #### verifyWithPubKey(pubkey`<String>`, signature`<String>`, data`<any>`)  Verify signature with kofo pubkey
    ```js
    //Verify signature with public key
    Utils.verifyWithPubKey(kofo.pubkey, signed, 'Hello world!');
    ```

* #### sha256(data`<any>`) Sha256 encryption
    ```js
    Utils.sha256('message')
    ```
* #### sha256Twice(data`<any>`) Sha256 twice encryption
    ```js
    Utils.sha256Twice('message')
    ```
* #### createPreImage() Generate random string of length 124
    ```js
    Utils.createPreImage()
    ```
* #### createHValue() Sha256 twice encryption preImage create hValue
    ```js
    const preImage = Utils.createPreImage();
    Utils.createHValue(preImage)
    ```
* #### encrypt(data`<any>`, secret`<String>`) Encrypts a message.
    ```js
    Utils.encrypt('data','pwd')
    ```
* #### decrypt(data`<any>`, secret`<String>`) Decrypts serialized ciphertext.
    ```js
    const encryptedData = Utils.encrypt('data','pwd')
    Utils.decrypt(encryptedData,'pwd')
    ```