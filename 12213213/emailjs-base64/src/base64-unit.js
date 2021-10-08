import { encode, decode, OUTPUT_TYPED_ARRAY } from './base64'

it('Base64 decoding', () => {
  expect(decode('U2VuZCByZWluZm9yY2VtZW50cw==', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('Send reinforcements'))
  expect(decode('Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4g\nUnVieQ==', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('Now is the time for all good coders\nto learn Ruby'))
  expect(decode('VGhpcyBpcyBsaW5lIG9uZQpUaGlzIGlzIGxpbmUgdHdvClRoaXMgaXMgbGluZSB0aHJlZQpBbmQgc28gb24uLi4K', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('This is line one\nThis is line two\nThis is line three\nAnd so on...\n'))

  expect(decode('U2VuZCByZWluZm9yY2VtZW50cw==')).to.deep.equal('Send reinforcements')
  expect(decode('Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4g\nUnVieQ==')).to.deep.equal('Now is the time for all good coders\nto learn Ruby')
  expect(decode('VGhpcyBpcyBsaW5lIG9uZQpUaGlzIGlzIGxpbmUgdHdvClRoaXMgaXMgbGluZSB0aHJlZQpBbmQgc28gb24uLi4K')).to.deep.equal('This is line one\nThis is line two\nThis is line three\nAnd so on...\n')

  expect(decode('')).to.deep.equal('')
  expect(decode('AA==')).to.deep.equal('\0')
  expect(decode('AAA=')).to.deep.equal('\0\0')
  expect(decode('AAAA')).to.deep.equal('\0\0\0')

  expect(decode('', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr(''))
  expect(decode('AA==', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('\0'))
  expect(decode('AAA=', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('\0\0'))
  expect(decode('AAAA', OUTPUT_TYPED_ARRAY)).to.deep.equal(str2arr('\0\0\0'))

  expect(() => {
    decode('4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBCuacrOODoeODvOODq+OBr+OAgeODnuOCpOODiuOD')
  }).to.not.throw()
})

it('Base64 encoding', () => {
  expect(encode(unescape(encodeURIComponent('本メールは、マイナ')))).to.deep.equal('5pys44Oh44O844Or44Gv44CB44Oe44Kk44OK')
  expect(encode(unescape(encodeURIComponent('Send reinforcements')))).to.deep.equal('U2VuZCByZWluZm9yY2VtZW50cw==')
  expect(encode(unescape(encodeURIComponent('Now is the time for all good coders\nto learn Ruby')))).to.deep.equal('Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4gUnVieQ==')
  expect(encode(unescape(encodeURIComponent('This is line one\nThis is line two\nThis is line three\nAnd so on...\n')))).to.deep.equal('VGhpcyBpcyBsaW5lIG9uZQpUaGlzIGlzIGxpbmUgdHdvClRoaXMgaXMgbGluZSB0aHJlZQpBbmQgc28gb24uLi4K')

  expect(encode(str2arr('Send reinforcements'))).to.deep.equal('U2VuZCByZWluZm9yY2VtZW50cw==')
  expect(encode(str2arr('Now is the time for all good coders\nto learn Ruby'))).to.deep.equal('Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4gUnVieQ==')
  expect(encode(str2arr('This is line one\nThis is line two\nThis is line three\nAnd so on...\n'))).to.deep.equal('VGhpcyBpcyBsaW5lIG9uZQpUaGlzIGlzIGxpbmUgdHdvClRoaXMgaXMgbGluZSB0aHJlZQpBbmQgc28gb24uLi4K')

  expect(encode(str2arr(''))).to.deep.equal('')
  expect(encode(str2arr('\0'))).to.deep.equal('AA==')
  expect(encode(str2arr('\0\0'))).to.deep.equal('AAA=')
  expect(encode(str2arr('\0\0\0'))).to.deep.equal('AAAA')
})

function str2arr (str) {
  var buf = new ArrayBuffer(str.length)
  var bufView = new Uint8Array(buf)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return bufView
}
