import * as emoji from "./emoji.js";

let MAP = [
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

describe('emoji', () => {
  let validateHexMap = map => {
    map.length.should.eql(16);
    (new Set(map)).size.should.eql(16);
  };

  it('SECRET_EMOJIS should be valid', () => {
    validateHexMap(emoji.SECRET_EMOJIS);
  });

  it('PUBLIC_EMOJIS should be valid', () => {
    validateHexMap(emoji.PUBLIC_EMOJIS);
  });

  it('NONCE_EMOJIS should be valid', () => {
    validateHexMap(emoji.NONCE_EMOJIS);
  });

  it('NONCE_EMOJIS has no emojis in common w/ PUBLIC_EMOJIS', () => {
    (new Set(emoji.NONCE_EMOJIS.concat(emoji.PUBLIC_EMOJIS))).size
      .should.eql(32);
  });

  describe('toHex', () => {
    it('converts one emoji to hex', () => {
      emoji.toHex('\u{1f64a}', MAP).should.eql('f');
    });

    it('converts two emojis to hex', () => {
      emoji.toHex('\u{1f64a}\u{1f64a}', MAP).should.eql('ff');
    });
  });

  describe('fromHex', () => {
    it('converts one hex to emoji', () => {
      emoji.fromHex('f', MAP).should.eql('\u{1f64a}');
    });

    it('converts two hex to emoji', () => {
      emoji.fromHex('ff', MAP).should.eql('\u{1f64a}\u{1f64a}');
    });
  });

  describe('trim', () => {
    it('removes non-emoji characters', () => {
      emoji.trim('hey \u{1f64a} there \u{1f612}', MAP)
        .should.eql('\u{1f64a}\u{1f612}');
    });
  });
});
