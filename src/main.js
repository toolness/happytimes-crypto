import App from "./app.js";

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

React.render(
  <App keypair={keypair}/>,
  document.getElementById('app')
);
