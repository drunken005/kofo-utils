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
* #### createPublicKey(secret`<String>`) Use secret got public key
    ```js
    Utils.createPublicKey(kofo.secret);
    ```

* #### createKofoIdBySecret(secret`<String>`) Use secret got kofoId
    ```js
    Utils.createKofoIdBySecret(kofo.secret);
    ```

* #### createKofoIdByPubKey(publicKey`<String>`) Use publicKey got kofoId
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

* #### verifyWithPubKey(pubkey`<String>`, signature`<String>`, data`<any>`) 使用公钥验证签名
    ```js
    //Verify signature with public key
    Utils.verifyWithPubKey(kofo.pubkey, signed, 'Hello world!');
    ```