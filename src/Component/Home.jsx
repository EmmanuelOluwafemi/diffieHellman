// import Crypto from 'crypto';
import CryptoJs from 'crypto-js';
import React, { useState } from 'react';
import Styled from 'styled-components';

const Home = () => {

    const [message, setMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');

    // Get Message from input Box
    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    // Create Two Users
    const alice = Crypto.createECDH('secp256k1');
    alice.generateKeys();

    const bob = Crypto.createECDH('secp256k1');
    bob.generateKeys();

    const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
    const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

    const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
    const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

    const handleOnSubmit = (e) => {
        e.preventDefault();

        var encryptedM = CryptoJs.AES.encrypt( message , 'passsword').toString();
        setEncryptedMessage(encryptedM);
    }

    const handleOnClick = () => {
        console.log(encryptedMessage)
        // How Bob will decrypt the message
        var decrypted = CryptoJs.AES.decrypt(encryptedMessage, 'password');
        var decryptedM = decrypted.toString();
        // let restring = JSON.parse(decryptedMessage)
            
        console.log("Decrypted message: ", decrypted)
        setDecryptedMessage(decryptedM);
    }

    
    return (
        <HomeStyle>
            <h1>Diffie Hellman Encryption By <span>Group One</span></h1>
            <div className="formContainer">
                <form onSubmit={handleOnSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="">Message</label>
                        <textarea onChange={handleOnChange} value={message} name="message" id="message"></textarea>
                    </div>
                    <button type='submit'>Encrypt Message</button>
                </form>

                <div className="output">
                    {encryptedMessage}
                    {encryptedMessage && 
                    <div>
                    <button onClick={handleOnClick}>Decrypt Message</button>
                    <p>Decrypted Message</p>
                    <h6>{decryptedMessage}</h6>
                    </div>
                    }
                </div>
            </div>
        </HomeStyle>
    )
}

export default Home;

const HomeStyle = Styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2F0459;
    flex-direction: column;

    h1 {
        font-family: 'Lato', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        width: 90%;
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
        margin-top: 1.3rem;
        margin-bottom: 2.3rem; 

        span {
            color: #F2E205;
        }
    }

    .formContainer {
        width: 90%;
        max-width: 700px;
        margin: 0 auto;
        min-height: 500px;

        .inputGroup {
            width: 100%;

            label {
                display: block;
                font-family: 'Lato', sans-serif;
                font-size: 1rem;
                font-weight: 400;
                color: #fff;
                margin-bottom: 1rem;
            }

            textarea {
                display: block;
                width: 100%;
                min-height: 70px;
                border: none;
                outline: none;
                font-size: 0.85rem;
                padding: 0.6rem;
                background: rgba(255, 255, 255, .6);
                line-height: 1.3;
                margin-bottom: 1rem;
                box-sizing: border-box;
            }
        }

        button {
            border: none;
            outline: none;
            background: #F2E205;
            color: #000;
            padding: 1rem 1.4rem;
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Lato', sans-serif;
            cursor: pointer;
        }
    }

    .output {
        width: 100%;
        min-height: 150px;
        background: #5C12A6;
        margin-top: 1.4rem;
        padding: 1rem;
        box-sizing: border-box;
        color: #000;
        word-break: break-word;

        button {
            margin-top: .8rem;
            padding: .5rem 1rem;
        }

        p {
            border-top: 1px solid #000;
            padding-top: 1rem;
            margin-top: 2rem;
        }
    }
`;