import * as emoji from "./emoji.js";

let EncryptWidget = React.createClass({
  getInitialState() {
    return {
      encryptedMessage: ''
    }
  },
  handleEncryptChange() {
    let padlock = this.refs.recipientPadlock.getDOMNode().value;
    let cipherText = this.refs.messageToEncrypt.getDOMNode().value;
    let encryptedMessage = '';

    padlock = emoji.toHex(padlock, emoji.PUBLIC_EMOJIS);
    if (padlock && cipherText) {
      let result = sodium.to_hex(sodium.crypto_box_seal(
        cipherText,
        sodium.from_hex(padlock)
      ));
      encryptedMessage = emoji.fromHex(result, emoji.PUBLIC_EMOJIS);
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
        <div className="row">
          <div className="six columns">
            <label htmlFor="recipientPadlock"><i className="privicon privicon-locked"></i> Recipient's Padlock</label>
            <textarea id="recipientPadlock" ref="recipientPadlock" className="u-full-width emoji" onChange={this.handleEncryptChange}></textarea>
          </div>
          <div className="six columns">
            <label htmlFor="messageToEncrypt"><i className="privicon privicon-mail"></i> Message</label>
            <textarea id="messageToEncrypt" ref="messageToEncrypt" className="u-full-width emoji" onChange={this.handleEncryptChange}></textarea>
          </div>
        </div>
        {this.state.encryptedMessage ? (
          <div>
            <label><i className="privicon privicon-mail"></i><i className="privicon privicon-locked"></i> Encrypted Message</label>
            <p className="emoji">{emoji.ENVELOPE_EMOJI} {this.state.encryptedMessage}</p>
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

    if (cipherText) {
      decryptedMessage = sodium.to_string(sodium.crypto_box_seal_open(
        sodium.from_hex(cipherText),
        sodium.from_hex(this.props.keypair.publicKey),
        sodium.from_hex(this.props.keypair.privateKey)
      ));
    }

    this.setState({
      decryptedMessage: decryptedMessage
    });
  },
  render() {
    return (
      <div>
        <h2>Decrypt a Message</h2>
        <p>You can only decrypt messages that were encrypted with your padlock.</p>
        <label htmlFor="messageToDecrypt"><i className="privicon privicon-mail"></i><i className="privicon privicon-locked"></i> Encrypted Message</label>
        <textarea id="messageToDecrypt" ref="messageToDecrypt" className="u-full-width emoji" onChange={this.handleDecryptChange}></textarea>
        {this.state.decryptedMessage ? (
          <div>
            <label><i className="privicon privicon-mail"></i> Decrypted Message</label>
            <p className="emoji">{this.state.decryptedMessage}</p>
          </div>
        ) : null}
      </div>
    );
  }
});

let KeysWidget = React.createClass({
  getInitialState() {
    return {
      showPrivateKey: false
    };
  },
  handleShowKeyClick() {
    this.setState({
      showPrivateKey: true
    });
  },
  render() {
    let keypair = this.props.keypair;

    return (
      <div>
      <h2>Your Tools</h2>
      <div className="row">
        <div className="six columns">
        <h3><i className="privicon privicon-fancy-key"></i> Your Key</h3>
        <p>Your key is used to decrypt messages secured by your padlock. Keep it secret; keep it safe!</p>
        {this.state.showPrivateKey ? (
          <p>
            <span className="emoji">
              {emoji.KEY_EMOJI}
              {emoji.fromHex(keypair.privateKey, emoji.SECRET_EMOJIS)}
            </span>
          </p>
        ) : (
          <button onClick={this.handleShowKeyClick}>Show Key&hellip;</button>
        )}
        </div>
        <div className="six columns">
        <h3><i className="privicon privicon-locked"></i> Your Padlock</h3>
        <p>The code below is like a padlock that only your key can open. Copy and share it freely with others: tweet it, SMS it, put it on a USB stick!</p>
        <p>
          <span className="emoji">
            {emoji.LOCK_EMOJI}
            {emoji.fromHex(keypair.publicKey, emoji.PUBLIC_EMOJIS)}
          </span>
        </p>
        </div>
      </div>
      </div>
    );
  }
});

export default React.createClass({
  render() {
    let keypair = this.props.keypair;

    return (
      <div>
        <KeysWidget keypair={keypair}/>
        <EncryptWidget/>
        <DecryptWidget keypair={keypair}/>
      </div>
    );
  }
});
