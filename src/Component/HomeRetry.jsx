// import Crypto from 'crypto';
import CryptoJS from 'crypto-js';
import {KeyPair} from 'asymmetric-diffie-hellman';
import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Home = () => {

    const [message, setMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [encryptionKey, setEncryptionKey] = useState('');

    useEffect(() => {
        const Alice = new KeyPair();
        const Bob   = new KeyPair();

        const AlicePublic = Alice.pubkey;
        const BobPublic   = Bob.pubkey;

        console.log(AlicePublic);

        const AliceTx = Alice.keyExchange(BobPublic);

        const BobRx = Bob.keyExchange(AliceTx.key);
        setEncryptionKey(BobRx.key);
    }, [])

    // Get Message from input Box
    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (message !== '') {
            var encrypted = CryptoJS.DES.encrypt(message, encryptionKey);
            setEncryptedMessage(encrypted.toString());
        }
        else {
            alert('Please Fill All Encryption Fields!!!!')
        }
    }

    const handleOnClick = () => {
        console.log(encryptedMessage)
        // How Bob will decrypt the message
        if (encryptedMessage !== '') {    
            var decrypted = CryptoJS.DES.decrypt(encryptedMessage, encryptionKey);
            var decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
            setDecryptedMessage(decryptedMessage.toString());
        }

        else {
            alert('Please Fill all Decryption field!!!!');
        }
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

                    {
                        decryptedMessage && 
                        <div>
                            <p>Decrypted Message</p>
                            <h6>{decryptedMessage}</h6>
                        </div>
                    }
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
    min-height: 100vh;
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