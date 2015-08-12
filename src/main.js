import * as emoji from "./emoji.js";

let storage = window.sessionStorage;
let keypair;

try {
  keypair = JSON.parse(storage.getItem('keypair'));
  if (!(keypair.publicKey && keypair.privateKey))
    throw new Error('malformed keypair');
} catch (e) {
  keypair = sodium.crypto_box_keypair('hex');
  storage.setItem('keypair', JSON.stringify(keypair));
}

let EncryptWidget = React.createClass({
  getInitialState() {
    return {
      encryptedMessage: ''
    }
  },
  handleEncryptChange() {
    let padlock = this.refs.recipientPadlock.getDOMNode().value;
    let message = this.refs.messageToEncrypt.getDOMNode().value;
    let encryptedMessage = '';
    let nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    padlock = emoji.toHex(padlock, emoji.PUBLIC_EMOJIS);
    if (padlock && message) {
      let result = sodium.to_hex(sodium.crypto_box_easy(
        message,
        nonce,
        sodium.from_hex(padlock),
        sodium.from_hex(this.props.keypair.privateKey)
      ));
      encryptedMessage = emoji.fromHex(sodium.to_hex(
        nonce
      ), emoji.NONCE_EMOJIS) + emoji.fromHex(result, emoji.PUBLIC_EMOJIS);
    }
    this.setState({
      encryptedMessage: encryptedMessage
    });
  },
  render() {
    return (
      <div>
        <h2>Encrypt a Message</h2>
        <p>To send an encrypted message, you'll need a copy of the recipient's padlock.</p>
        <h3>Recipient's Padlock</h3>
        <textarea ref="recipientPadlock" className="emoji" onChange={this.handleEncryptChange}></textarea>
        <h3>Message</h3>
        <textarea ref="messageToEncrypt" className="emoji" onChange={this.handleEncryptChange}></textarea>
        {this.state.encryptedMessage ? (
          <div>
            <h3>Encrypted Message</h3>
            <p className="emoji">{this.state.encryptedMessage}</p>
          </div>
        ) : null}
      </div>
    );
  }
});

let DecryptWidget = React.createClass({
  getInitialState() {
    return {
      decryptedMessage: ''
    };
  },
  handleDecryptChange() {
    let decryptedMessage = '';
    let encryptedMessage = this.refs.messageToDecrypt.getDOMNode().value;
    let nonce = emoji.toHex(
      emoji.trim(encryptedMessage, emoji.NONCE_EMOJIS),
      emoji.NONCE_EMOJIS
    );
    let cipherText = emoji.toHex(
      emoji.trim(encryptedMessage, emoji.PUBLIC_EMOJIS),
      emoji.PUBLIC_EMOJIS
    );

    decryptedMessage = sodium.crypto_box_open_easy(
      sodium.from_hex(cipherText), sodium.from_hex(nonce)
    );

    this.setState({
      decryptedMessage: decryptedMessage
    });
  },
  render() {
    return (
      <div>
        <h2>Decrypt a Message</h2>
        <p>You can only decrypt messages that were encrypted with your padlock.</p>
        <h3>Encrypted Message</h3>
        <textarea ref="messageToDecrypt" className="emoji" onChange={this.handleDecryptChange}></textarea>
        {this.state.decryptedMessage ? (
          <div>
            <h3>Decrypted Message</h3>
            <p className="emoji">{this.state.decryptedMessage}</p>            
          </div>
        ) : null}
      </div>
    );
  }
});

let App = React.createClass({
  render() {
    let keypair = this.props.keypair;

    return (
      <div>
        <h2>Your Key</h2>
        <p>The code below is yours alone. Keep it secret; keep it safe!</p>
        <p>
          <span className="emoji">
            {emoji.KEY_EMOJI}
            {emoji.fromHex(keypair.privateKey, emoji.SECRET_EMOJIS)}
          </span>
        </p>
        <h2>Your Padlock</h2>
        <p>The code below is like a padlock that only your key can open. Copy and share it freely with others: tweet it, SMS it, put it on a USB stick!</p>
        <p>
          <span className="emoji">
            {emoji.LOCK_EMOJI}
            {emoji.fromHex(keypair.publicKey, emoji.PUBLIC_EMOJIS)}
          </span>
        </p>
        <EncryptWidget keypair={keypair}/>
        <DecryptWidget keypair={keypair}/>
      </div>
    );
  }
});

React.render(
  <App keypair={keypair}/>,
  document.getElementById('app')
);
