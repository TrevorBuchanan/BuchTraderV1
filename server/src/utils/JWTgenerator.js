const { sign } = require("jsonwebtoken");
const crypto = require("crypto");

const makeJWTtoken = (key_name, key_secret, uri) => {
    console.log(key_name);
    console.log(key_secret);
    console.log(uri);
    
    const algorithm = "ES256";
    const token = sign(
        {
            iss: "cdp",
            nbf: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 120,
            sub: key_name,
            uri,
        },
        key_secret,
        {
            algorithm,
            header: {
                kid: key_name,
                nonce: crypto.randomBytes(16).toString("hex"),
            },
        }
    );

    return token;
}

module.exports = { makeJWTtoken }
