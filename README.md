This is an extremely early prototype of an asymmetric encryption
learning experience/tool. It's heavily inspired by ideas from
[Why King George III Can Encrypt][george] and [Emotional Design][].

## Design Notes

* The alphanumeric payload of traditional encryption can be
  intimidating and confusing for non-technical users, who might
  think their computer has just been hacked. Instead of alphanumeric
  gobbledygook, why not use cheerful emojis? Those not in-the-know
  will just think the encrypter is ridiculously happy.

* As *Why King George III Can Encrypt* implies, the term "Public Key"
  is confusing to newcomers because in the real world, all keys are
  private. So we replace that term with "padlock".

* We don't want to overwhelm users with the concepts of encryption and
  authenticity at the same time, so instead we introduce encryption
  first--because it's cool--and will later introduce authenticity, once
  users have a good mental model for encryption.

[george]: https://freedom-to-tinker.com/blog/randomwalker/why-king-george-iii-can-encrypt/
[Emotional Design]: https://en.wikipedia.org/wiki/Emotional_Design
