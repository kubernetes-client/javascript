/* eslint-disable one-var, no-tabs */

import {
  mimeEncode, mimeDecode,
  base64Encode, base64Decode,
  quotedPrintableEncode, quotedPrintableDecode,
  mimeWordEncode, mimeWordDecode,
  mimeWordsEncode, mimeWordsDecode,
  foldLines,
  continuationEncode,
  headerLineEncode,
  headerLinesDecode,
  parseHeaderValue
} from './mimecodec'

describe('#mimeEncode', function () {
  it('shoud encode UTF-8', function () {
    var str = 'tere ÕÄÖÕ',
      encodedStr = 'tere =C3=95=C3=84=C3=96=C3=95'

    expect(mimeEncode(str)).to.equal(encodedStr)
  })

  it('shoud encode trailing whitespace', function () {
    var str = 'tere  ',
      encodedStr = 'tere =20'

    expect(mimeEncode(str)).to.equal(encodedStr)
  })

  it('shoud encode non UTF-8', function () {
    var buf = new Uint8Array([0xBD, 0xC5]),
      encoding = 'ks_c_5601-1987',
      encodedStr = '=EC=8B=A0'

    expect(mimeEncode(buf, encoding)).to.equal(encodedStr)
  })
})

describe('#mimeDecode', function () {
  it('should decode UTF-8', function () {
    var str = 'tere ÕÄÖÕ',
      encodedStr = 'tere =C3=95=C3=84=C3=96=C3=95'

    expect(mimeDecode(encodedStr)).to.equal(str)
  })

  it('should decode non UTF-8', function () {
    var str = '신',
      encoding = 'ks_c_5601-1987',
      encodedStr = '=BD=C5'

    expect(mimeDecode(encodedStr, encoding)).to.equal(str)
  })
})

describe('#base64Encode', function () {
  it('should base64Encode a UTF-8 string', function () {
    var str = 'tere ÕÄÖÕ',
      encodedStr = 'dGVyZSDDlcOEw5bDlQ=='

    expect(base64Encode(str)).to.equal(encodedStr)
  })

  it('should base64Encode an ASCII string', function () {
    var str = 'bliblablubb',
      encodedStr = 'YmxpYmxhYmx1YmI='

    expect(base64Encode(str, 'binary')).to.equal(encodedStr)
  })

  it('should base64Encode a UTF-8 typed array', function () {
    var buf = new Uint8Array([116, 101, 114, 101, 32, 195, 149, 195, 132, 195, 150, 195, 149]),
      encodedStr = 'dGVyZSDDlcOEw5bDlQ=='

    expect(base64Encode(buf)).to.equal(encodedStr)
  })

  it('should base64Encode non UTF-8 typed array', function () {
    var buf = new Uint8Array([0xBD, 0xC5]),
      encoding = 'ks_c_5601-1987',
      encodedStr = '7Iug'

    expect(base64Encode(buf, encoding)).to.equal(encodedStr)
  })
})

describe('#base64Decode', function () {
  it('should decode UTF-8', function () {
    var str = 'tere ÕÄÖÕ',
      encodedStr = 'dGVyZSDDlcOEw5bDlQ=='

    expect(base64Decode(encodedStr)).to.equal(str)
  })

  it('should decode non UTF-8', function () {
    var str = '신',
      encoding = 'ks_c_5601-1987',
      encodedStr = 'vcU='

    expect(base64Decode(encodedStr, encoding)).to.equal(str)
  })

  it('should decode binary b64', () => {
    const text = 'MIIB3AYJKoZIhvcNAQcDoIIBzTCCAckCAQIxggFuMIIBagIBADAjMB4xHDAJBgNVBAYTAlJVMA8G\n' +
      'A1UEAx4IAFQAZQBzAHQCAQEwPAYJKoZIhvcNAQEHMC+gDzANBglghkgBZQMEAgMFAKEcMBoGCSqG\n' +
      'SIb3DQEBCDANBglghkgBZQMEAgMFAASCAQBDyepahKyM+hceeF7J+pyiSVYLElKyFKff9flMs1VX\n' +
      'ZaBQRcEYpIqw9agD4u+aHlIOJ6AtdCbxaV0M8q6gjM4E5lUFUOqG/QIycdG2asZ0lza/DL8SdxfA\n' +
      '3WE9Ij5IEqFbtnykbfORK+5XWT0nYs/OMN0NKeCwXjElNsezX9IAIgxHgwcVYW+szXpRlarjriAC\n' +
      'TDG/M+Xl5YtyAhmHWFncBSfWM8e2q+AKh3eCal1lH4eXtGICc4rad4f6845YJwXL8DYYS+GdLVAY\n' +
      'EXKuHr0N7g4aHTs9B8EQqHmYdaHWTi3h0ZPkvAE+wwfm9xjvL2z2HrfpYyMTvALrefvSt7sGMIAG\n' +
      'CSqGSIb3DQEHATAdBglghkgBZQMEAQIEEKt6VqFcNz/VYFwu85DTOqGggAQgIHc45LBiYIQqhxNw\n' +
      'hlRk4BxMiyiQRdLcVdCwwkKyX2sAAAAA\n'
    const expectedText = Buffer.from(text, 'base64').toString('hex').toUpperCase()
    const actualText = Buffer.from(base64Decode(text, 'binary'), 'binary').toString('hex').toUpperCase()
    expect(actualText).to.equal(expectedText)
  })
})

describe('#quotedPrintableEncode', function () {
  it('should encode UTF-8 to quoted-printable', function () {
    var str = 'tere ÕÄ \t\nÕÄ \t\nÖÕ',
      encodedStr = 'tere =C3=95=C3=84 =09\r\n=C3=95=C3=84 =09\r\n=C3=96=C3=95'

    expect(quotedPrintableEncode(str)).to.equal(encodedStr)
  })

  it('should add soft line breaks', function () {
    var str = 'õäöüõäöüõäöüõäöüõäöüõäöüõäöõ',
      encodedStr = '=C3=B5=C3=A4=C3=B6=C3=BC=C3=B5=C3=A4=C3=B6=C3=BC=C3=B5=C3=A4=C3=B6=C3=BC=\r\n' +
                    '=C3=B5=C3=A4=C3=B6=C3=BC=C3=B5=C3=A4=C3=B6=C3=BC=C3=B5=C3=A4=C3=B6=C3=BC=\r\n' +
                    '=C3=B5=C3=A4=C3=B6=C3=B5'

    expect(quotedPrintableEncode(str)).to.equal(encodedStr)
  })

  it('should encode short string', function () {
    expect('Tere =C3=95=C3=84=C3=96=C3=9C!').to.equal(quotedPrintableEncode(new Uint8Array([0x54, 0x65, 0x72, 0x65, 0x20, 0xD5, 0xC4, 0xD6, 0xDC, 0x21]), 'Latin_1'))
    expect('Tere =C3=95=C3=84=C3=96=C3=9C=C5=A0=C5=BD!').to.equal(quotedPrintableEncode('Tere ÕÄÖÜŠŽ!'))
    expect('Tere =C5=A0=C5=BD!').to.equal(quotedPrintableEncode(new Uint8Array([0x54, 0x65, 0x72, 0x65, 0x20, 0xD0, 0xDE, 0x21]), 'Win-1257'))
  })

  it('should not wrap between encoded chars', function () {
    var wrapped = 'a==========================',
      wrappedEncoded = 'a=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=3D=\r\n=3D=3D'
    expect(wrappedEncoded).to.equal(quotedPrintableEncode(wrapped))
  })

  it('should encode long string', function () {
    var longLine = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      longLineEncoded = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLM=\r\n' +
                    'NOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ=\r\n' +
                    'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm=\r\n' +
                    'nopqrstuvwxyz0123456789'

    expect(longLineEncoded).to.equal(quotedPrintableEncode(longLine))
  })

  it('should quote at line edge', function () {
    var str = 'Title: <a href="http://www.elezea.com/2012/09/iphone-5-local-maximum/">The future of e-commerce is storytelling</a> <br>',
      strEncoded = 'Title: <a href=3D"http://www.elezea.com/2012/09/iphone-5-local-maximum/">Th=\r\ne future of e-commerce is storytelling</a> <br>'
    expect(strEncoded).to.equal(quotedPrintableEncode(str))
  })

  it('should wrap long string with UTF-8 sequence on edge', function () {
    var longLine = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIÄÄÄPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      longLineEncoded = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHI=\r\n' +
                    '=C3=84=C3=84=C3=84PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJ=\r\n' +
                    'KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVW=\r\n' +
                    'XYZabcdefghijklmnopqrstuvwxyz0123456789'
    expect(longLineEncoded).to.equal(quotedPrintableEncode(longLine))
  })

  it('should encode surrogate pair', function () {
    // pile of poo :)
    expect('=F0=9F=92=A9').to.equal(quotedPrintableEncode('\ud83d\udca9'))
  })
})

describe('#quotedPrintableDecode', function () {
  it('should decode quoted-printable to UTF-8', function () {
    var str = 'tere ÕÄ \t\r\nÕÄ \t\r\nÖÕ',
      encodedStr = 'tere =C3=95=C3=84=20=09\r\n=C3=95=\r\n=C3=84=\r\n=20=09\r\n=C3=96=C3=95='

    expect(quotedPrintableDecode(encodedStr)).to.equal(str)
  })

  it('should decode string', function () {
    var longLine = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIÄÄÄPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      longLineEncoded = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHI=\r\n' +
                    '=C3=84=C3=84=C3=84PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJ=\r\n' +
                    'KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVW=\r\n' +
                    'XYZabcdefghijklmnopqrstuvwxyz0123456789'

    expect(longLine).to.equal(quotedPrintableDecode(longLineEncoded))
  })

  it('should decode string with soft linebreaks', function () {
    var input = 'Tere =\r\nvana kere=',
      output = 'Tere vana kere'

    expect(output).to.equal(quotedPrintableDecode(input))
  })

  it('should decode surrogate pair', function () {
    expect('\ud83d\udca9').to.equal(quotedPrintableDecode('=F0=9F=92=A9'))
  })
})

describe('#mimeWordEncode', function () {
  it('should encode', function () {
    expect('=?UTF-8?Q?See_on_=C3=B5hin_test?=').to.equal(mimeWordEncode('See on õhin test'))
  })

  it('should QP-encode mime word', function () {
    expect('=?UTF-8?Q?J=C3=B5ge-va=C5=BD?=').to.equal(mimeWordEncode(new Uint8Array([0x4A, 0xF5, 0x67, 0x65, 0x2D, 0x76, 0x61, 0xDE]), 'Q', 'iso-8859-13'))
  })

  it('should Base64-encode mime word', () => {
    expect(mimeWordEncode('Привет и до свидания', 'B')).to.equal('=?UTF-8?B?0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC90LjRjw==?=')
  })

  it('should Base64-encode a long mime word', () => {
    const payload = 'üöß‹€Привет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свиданияПривет и до свидания'
    const expected =
      '=?UTF-8?B?w7zDtsOf4oC54oKs0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC4?= ' +
      '=?UTF-8?B?0LTQsNC90LjRj9Cf0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC0?= ' +
      '=?UTF-8?B?0LDQvdC40Y/Qn9GA0LjQstC10YIg0Lgg0LTQviDRgdCy0LjQtNCw?= ' +
      '=?UTF-8?B?0L3QuNGP0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC9?= ' +
      '=?UTF-8?B?0LjRj9Cf0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC00LDQvdC4?= ' +
      '=?UTF-8?B?0Y/Qn9GA0LjQstC10YIg0Lgg0LTQviDRgdCy0LjQtNCw0L3QuNGP?= ' +
      '=?UTF-8?B?0J/RgNC40LLQtdGCINC4INC00L4g0YHQstC40LTQsNC90LjRj9Cf?= ' +
      '=?UTF-8?B?0YDQuNCy0LXRgiDQuCDQtNC+INGB0LLQuNC00LDQvdC40Y8=?='
    expect(mimeWordEncode(payload, 'B')).to.equal(expected)
  })
})

describe('#mimeWordsEncode', function () {
  it('should encode Ascii range', function () {
    var input1 = 'метель" вьюга',
      input2 = 'метель\'вьюга',
      input3 = 'Verão você vai adorar!',
      output1 = '=?UTF-8?Q?=D0=BC=D0=B5=D1=82=D0=B5=D0=BB=D1=8C=22_=D0=B2=D1=8C?= =?UTF-8?Q?=D1=8E=D0=B3=D0=B0?=',
      output2 = '=?UTF-8?Q?=D0=BC=D0=B5=D1=82=D0=B5=D0=BB=D1=8C=27=D0=B2=D1=8C?= =?UTF-8?Q?=D1=8E=D0=B3=D0=B0?=',
      output3 = '=?UTF-8?Q?Ver=C3=A3o_voc=C3=AA?= vai adorar!'

    expect(mimeWordsEncode(input1, 'Q')).to.equal(output1)
    expect(mimeWordsEncode(input2, 'Q')).to.equal(output2)
    expect(mimeWordsEncode(input3, 'Q')).to.equal(output3)
  })
})

describe('#mimeWordsDecode', function () {
  it('should decode', function () {
    expect('Hello: See on õhin test').to.equal(mimeWordsDecode('Hello: =?UTF-8?q?See_on_=C3=B5hin_test?='))
    expect('See on õhin test').to.equal(mimeWordDecode('=?UTF-8?q?See_on_=C3=B5hin_test?='))
  })

  it('should decode mime words', function () {
    expect('Jõge-vaŽ zz Jõge-vaŽJõge-vaŽJõge-vaŽ').to.equal(mimeWordsDecode('=?ISO-8859-13?Q?J=F5ge-va=DE?= zz =?ISO-8859-13?Q?J=F5ge-va=DE?= =?ISO-8859-13?Q?J=F5ge-va=DE?= =?ISO-8859-13?Q?J=F5ge-va=DE?='))
    expect('Sssś Lałalalala').to.equal(mimeWordsDecode('=?UTF-8?B?U3NzxZsgTGHFgmFsYQ==?= =?UTF-8?B?bGFsYQ==?='))
  })

  it('should decode QP-encoded mime word', function () {
    expect('Jõge-vaŽ').to.equal(mimeWordDecode('=?ISO-8859-13?Q?J=F5ge-va=DE?='))
  })

  it('should decode ascii range', function () {
    var input1 = 'метель" вьюга',
      input2 = 'метель\'вьюга',
      output1 = '=?UTF-8?Q?=D0=BC=D0=B5=D1=82=D0=B5=D0=BB=D1=8C=22_?= =?UTF-8?Q?=D0=B2=D1=8C=D1=8E=D0=B3=D0=B0?=',
      output2 = '=?UTF-8?Q?=D0=BC=D0=B5=D1=82=D0=B5=D0=BB=D1=8C\'?= =?UTF-8?Q?=D0=B2=D1=8C=D1=8E=D0=B3=D0=B0?='

    expect(mimeWordsDecode(output1)).to.equal(input1)
    expect(mimeWordsDecode(output2)).to.equal(input2)
  })

  it('should decode empty string', function () {
    var encoded1 = '=?UTF-8?Q??=',
      encoded2 = '=?UTF-8?B??='

    expect(mimeWordsDecode(encoded1)).to.equal('')
    expect(mimeWordsDecode(encoded2)).to.equal('')
  })

  it('should join bytes of Base64 multi-byte UTF-8 characters before parsing', function () {
    expect('GLG: Regulation of Taxi in China - 张一兵').to.equal(mimeWordsDecode('=?utf-8?B?R0xHOiBSZWd1bGF0aW9uIG9mIFRheGkgaW4gQ2hpbmEgLSDl?= =?utf-8?B?vKDkuIDlhbU=?='))
    expect('***SPAM*** Очки виртуальной реальности').to.equal(mimeWordsDecode('***SPAM*** =?utf-8?B?0J7Rh9C60Lgg0LLQuNGA0YLRg9Cw0LvRjNC90L7QuSDR?=\r\n	=?utf-8?B?gNC10LDQu9GM0L3QvtGB0YLQuA==?='))
  })

  it('should join bytes of Quoted-Printable multi-byte UTF-8 characters before parsing', function () {
    expect('гос (передай кому надо тоже').to.equal(mimeWordsDecode('=?utf-8?Q?=D0=B3=D0=BE=D1=81_?==?utf-8?Q?(=D0=BF=D0=B5=D1=80=D0=B5=D0=B4=D0=B0=D0=B9_=D0=BA=D0=BE=D0?= =?utf-8?Q?=BC=D1=83_=D0=BD=D0=B0=D0=B4=D0=BE_=D1=82=D0=BE=D0=B6=D0=B5?='))
  })

  it('should not join together encoded words with different encodings', function () {
    expect(' ⏯ Trendy Netflix Redesigns + ✈️ Airport App Challenge').to.equal(mimeWordsDecode('=?utf-8?b?IOKPryBUcmVuZHkgTmV0ZmxpeCBSZWRlc2lnbnMgKyDinIjvuI8g?= =?utf-8?q?Airport_App_Challenge?='))
  })

  it('should decode Quoted-Printable with bad line split', function () {
    expect('гос (передай кому надо тоже').to.equal(mimeWordsDecode('=?utf-8?Q?=D0=B3=D0=BE=D1=81_?==?utf-8?Q?(=D0=BF=D0=B5=D1=80=D0=B5= D0=B4=D0=B0=D0=B9_=D0=BA=D0=BE=D0?= =?utf-8?Q?=BC=D1=83_=D0=BD=D0=B0=D0=B4=D0=BE_=D1=82=D0=BE=D0=B6=D0=B5?='))
  })

  it('should correclty parse this ISO-2022-JP encoded string', function () {
    expect('ATOK Passport お申し込み完了＆ユーザー登録完了（定額利用サービス）').to.equal(mimeWordsDecode('=?ISO-2022-JP?B?QVRPSyBQYXNzcG9ydCAbJEIkKj89JDc5fiRfNDAbKEI=?= =?ISO-2022-JP?B?GyRCTjshdSVmITwlNiE8RVBPPzQwTjsbKEI=?= =?ISO-2022-JP?B?GyRCIUpEajNbTXhNUSU1ITwlUyU5IUsbKEI=?='))
  })

  it('should split QP on maxLength', function () {
    var inputStr = 'Jõgeva Jõgeva Jõgeva mugeva Jõgeva Jõgeva Jõgeva Jõgeva Jõgeva',
      outputStr = '=?UTF-8?Q?J=C3=B5geva_J=C3=B5geva_J=C3=B5geva?= mugeva =?UTF-8?Q?J=C3=B5geva_J=C3=B5geva_J=C3=B5geva_J=C3=B5geva_J?= =?UTF-8?Q?=C3=B5geva?=',
      encoded = mimeWordsEncode(inputStr, 'Q')

    expect(outputStr).to.equal(encoded)
    expect(inputStr).to.equal(mimeWordsDecode(encoded))
  })

  it('should ignore language param', function () {
    expect('Hello: See on õhin test').to.equal(mimeWordsDecode('Hello: =?UTF-8*EN?q?See_on_=C3=B5hin_test?='))
  })
})

describe('#continuationEncode', function () {
  it('should return quoted', function () {
    expect([{
      key: 'title',
      value: '"this is just a title"'
    }]).to.deep.equal(continuationEncode('title', 'this is just a title', 500))
  })

  it('should encode and split ascii', function () {
    expect([{
      key: 'title*0',
      value: '"this "'
    }, {
      key: 'title*1',
      value: '"is ju"'
    }, {
      key: 'title*2',
      value: '"st a "'
    }, {
      key: 'title*3',
      value: 'title'
    }]).to.deep.equal(continuationEncode('title', 'this is just a title', 5))
  })

  it('should encode and split unicode', function () {
    expect([{
      key: 'title*0*',
      value: 'utf-8\'\'this%20is%20j'
    }, {
      key: 'title*1*',
      value: 'ust%20a%20title%20'
    }, {
      key: 'title*2*',
      value: '%C3%B5%C3%A4%C3%B6'
    }, {
      key: 'title*3*',
      value: '%C3%BC'
    }]).to.deep.equal(continuationEncode('title', 'this is just a title õäöü', 20))
  })

  it('should encode and decode', function () {
    var input = 'Lorěm ipsum doloř siť amet, háš peřpetua compřéhenšam at, ei nám modó soleát éxpétěndá! Boňorum vocibůs dignisšim pro ad, ea sensibus efficiendi intellegam ius. Ad nam aperiam delicata voluptaria, vix nobis luptatum ea, ců úsú graeco viďiššě ňusqúam. '
    var headerLine = 'content-disposition: attachment; ' + continuationEncode('filename', input, 50).map(function (item) {
      return item.key + '="' + item.value + '"'
    }).join('; ')
    var parsedHeader = parseHeaderValue(headerLine)
    expect(input).to.equal(mimeWordsDecode(parsedHeader.params.filename))
  })

  it('should not cause URIError when encoding multi-byte unicode chars', function () {
    expect([{
      key: 'title*0*',
      value: 'utf-8\'\'%F0%9F%98%8A'
    }]).to.deep.equal(continuationEncode('title', '😊', 500))
  })
})

describe('#foldLines', function () {
  it('should Fold long header line', function () {
    var inputStr = 'Subject: Testin command line kirja õkva kakva mõni tõnis kõllas põllas tõllas rõllas jušla kušla tušla musla',
      outputStr = 'Subject: Testin command line kirja =?UTF-8?Q?=C3=B5kva?= kakva\r\n' +
                    ' =?UTF-8?Q?m=C3=B5ni_t=C3=B5nis_k=C3=B5llas_p=C3=B5llas_t=C3=B5?=\r\n' +
                    ' =?UTF-8?Q?llas_r=C3=B5llas_ju=C5=A1la_ku=C5=A1la_tu=C5=A1la?= musla',
      encodedHeaderLine = mimeWordsEncode(inputStr, 'Q')

    expect(outputStr).to.equal(foldLines(encodedHeaderLine))
  })

  it('should Fold flowed text', function () {
    var inputStr = 'Testin command line kirja õkva kakva mõni tõnis kõllas põllas tõllas rõllas jušla kušla tušla musla Testin command line kirja õkva kakva mõni tõnis kõllas põllas tõllas rõllas jušla kušla tušla musla',
      outputStr = 'Testin command line kirja õkva kakva mõni tõnis kõllas põllas tõllas rõllas \r\n' +
                    'jušla kušla tušla musla Testin command line kirja õkva kakva mõni tõnis \r\n' +
                    'kõllas põllas tõllas rõllas jušla kušla tušla musla'

    expect(outputStr).to.equal(foldLines(inputStr, 76, true))
  })

  it('should fold one long line', function () {
    var inputStr = 'Subject: =?UTF-8?Q?=CB=86=C2=B8=C3=81=C3=8C=C3=93=C4=B1=C3=8F=CB=87=C3=81=C3=9B^=C2=B8\\=C3=81=C4=B1=CB=86=C3=8C=C3=81=C3=9B=C3=98^\\=CB=9C=C3=9B=CB=9D=E2=84=A2=CB=87=C4=B1=C3=93=C2=B8^\\=CB=9C=EF=AC=81^\\=C2=B7\\=CB=9C=C3=98^=C2=A3=CB=9C#=EF=AC=81^\\=C2=A3=EF=AC=81^\\=C2=A3=EF=AC=81^\\?=',
      outputStr = 'Subject:\r\n =?UTF-8?Q?=CB=86=C2=B8=C3=81=C3=8C=C3=93=C4=B1=C3=8F=CB=87=C3=81=C3=9B^=C2=B8\\=C3=81=C4=B1=CB=86=C3=8C=C3=81=C3=9B=C3=98^\\=CB=9C=C3=9B=CB=9D=E2=84=A2=CB=87=C4=B1=C3=93=C2=B8^\\=CB=9C=EF=AC=81^\\=C2=B7\\=CB=9C=C3=98^=C2=A3=CB=9C#=EF=AC=81^\\=C2=A3=EF=AC=81^\\=C2=A3=EF=AC=81^\\?='

    expect(outputStr).to.equal(foldLines(inputStr))
  })
})

describe('#headerLineEncode', function () {
  it('should encode and fold header line', function () {
    var key = 'Subject',
      value = 'Testin command line kirja õkva kakva mõni tõnis kõllas põllas tõllas rõllas jušla kušla tušla musla',
      outputStr = 'Subject: Testin command line kirja =?UTF-8?Q?=C3=B5kva?= kakva\r\n' +
        ' =?UTF-8?Q?m=C3=B5ni_t=C3=B5nis_k=C3=B5llas_p=C3=B5llas_t=C3=B5?=\r\n' +
        ' =?UTF-8?Q?llas_r=C3=B5llas_ju=C5=A1la_ku=C5=A1la_tu=C5=A1la?= musla',
      encodedHeaderLine = headerLineEncode(key, value)

    expect(outputStr).to.equal(encodedHeaderLine)
  })
})

describe('#headerLinesDecode', function () {
  it('should decode headers', function () {
    var headersObj = {
        'subject': 'Tere =?UTF-8?Q?J=C3=B5geva?=',
        'x-app': ['My =?UTF-8?Q?=C5=A1=C5=A1=C5=A1=C5=A1?= app line 1', 'My =?UTF-8?Q?=C5=A1=C5=A1=C5=A1=C5=A1?= app line 2'],
        'long-line': 'tere =?UTF-8?Q?=C3=B5klva?= karu =?UTF-8?Q?m=C3=B5kva_=C5=A1apaka=C5=A1?= tutikas suur maja, =?UTF-8?Q?k=C3=B5rge?= hoone, segane jutt'
      },
      headersStr = 'Subject: Tere =?UTF-8?Q?J=C3=B5geva?=\r\n' +
                    'X-APP: My =?UTF-8?Q?=C5=A1=C5=A1=C5=A1=C5=A1?= app line 1\r\n' +
                    'X-APP: My =?UTF-8?Q?=C5=A1=C5=A1=C5=A1=C5=A1?= app line 2\r\n' +
                    'Long-Line: tere =?UTF-8?Q?=C3=B5klva?= karu\r\n' +
                    ' =?UTF-8?Q?m=C3=B5kva_=C5=A1apaka=C5=A1?= tutikas suur maja,\r\n' +
                    ' =?UTF-8?Q?k=C3=B5rge?= hoone, segane jutt'

    expect(headersObj).to.deep.equal(headerLinesDecode(headersStr))
  })
})

describe('#parseHeaderValue', function () {
  it('should handle default value only', function () {
    var str = 'text/plain',
      obj = {
        value: 'text/plain',
        params: {}
      }

    expect(parseHeaderValue(str)).to.deep.equal(obj)
  })

  it('should handle unquoted params', function () {
    var str = 'text/plain; CHARSET= UTF-8; format=flowed;',
      obj = {
        value: 'text/plain',
        params: {
          'charset': 'UTF-8',
          'format': 'flowed'
        }
      }

    expect(parseHeaderValue(str)).to.deep.equal(obj)
  })

  it('should handle quoted params', function () {
    var str = 'text/plain; filename= ";;;\\""; format=flowed;',
      obj = {
        value: 'text/plain',
        params: {
          'filename': ';;;"',
          'format': 'flowed'
        }
      }

    expect(parseHeaderValue(str)).to.deep.equal(obj)
  })

  it('should handle multi line values', function () {
    var str = 'text/plain; single_encoded*="UTF-8\'\'%C3%95%C3%84%C3%96%C3%9C";\n' +
                    ' multi_encoded*0*=UTF-8\'\'%C3%96%C3%9C;\n' +
                    ' multi_encoded*1*=%C3%95%C3%84;\n' +
                    ' no_charset*0=OA;\n' +
                    ' no_charset*1=OU;\n' +
                    ' invalid*=utf-8\'\' _?\'=%ab',
      obj = {
        value: 'text/plain',
        params: {
          'single_encoded': '=?UTF-8?Q?=C3=95=C3=84=C3=96=C3=9C?=',
          'multi_encoded': '=?UTF-8?Q?=C3=96=C3=9C=C3=95=C3=84?=',
          'no_charset': 'OAOU',
          'invalid': '=?utf-8?Q?_=5f=3f\'=3d=ab?='
        }
      }

    expect(parseHeaderValue(str)).to.deep.equal(obj)
  })
})
