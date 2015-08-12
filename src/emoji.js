export let KEY_EMOJI = '\u{1f511}';
export let LOCK_EMOJI = '\u{1f512}';

export let HEX_MAP = '0123456789abcdef';

export let NONCE_EMOJIS = [
  '\u{1f48f}',
  '\u{1f491}',
  '\u{1f492}',
  '\u{1f493}',
  '\u{1f495}',
  '\u{1f496}',
  '\u{1f497}',
  '\u{1f498}',
  '\u{1f499}',
  '\u{1f49A}',
  '\u{1f49B}',
  '\u{1f49C}',
  '\u{1f49D}',
  '\u{1f49E}',
  '\u{1f49F}',
  '\u{1f48C}'
];

export let SECRET_EMOJIS = [
  '\u{1f612}',
  '\u{1f613}',
  '\u{1f614}',
  '\u{1f616}',
  '\u{1f61e}',
  '\u{1f620}',
  '\u{1f621}',
  '\u{1f624}',
  '\u{1f625}',
  '\u{1f628}',
  '\u{1f629}',
  '\u{1f62b}',
  '\u{1f640}',
  '\u{1f648}',
  '\u{1f649}',
  '\u{1f64a}',
];

export let PUBLIC_EMOJIS = [
  '\u{1f601}',
  '\u{1f602}',
  '\u{1f603}',
  '\u{1f604}',
  '\u{1f606}',
  '\u{1f609}',
  '\u{1f60a}',
  '\u{1f60b}',
  '\u{1f60c}',
  '\u{1f60d}',
  '\u{1f61c}',
  '\u{1f61d}',
  '\u{1f63a}',
  '\u{1f63b}',
  '\u{1f646}',
  '\u{1f483}',
];

export function toHex(emojis, map) {
  let out = [];
  for (let emoji of emojis) {
    out.push(HEX_MAP[map.indexOf(emoji)]);
  }
  return out.join('');
}

export function fromHex(hex, map) {
  let out = [];
  for (let digit of hex) {
    out.push(map[HEX_MAP.indexOf(digit)]);
  }
  return out.join('');
}

export function trim(str, map) {
  let out = [];
  for (let char of str) {
    if (map.indexOf(char) != -1) {
      out.push(char);
    }
  }
  return out.join('');
}
