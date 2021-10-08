export const OUTPUT_STRING = 'OUTPUT_STRING'
export const OUTPUT_TYPED_ARRAY = 'OUTPUT_TYPED_ARRAY'

const arr2str = arr => String.fromCharCode.apply(null, arr)

export default (base64Str, outputEncoding = OUTPUT_STRING) =>
  (outputEncoding === OUTPUT_STRING) ? arr2str(decode(base64Str)) : decode(base64Str)

function decode (base64Str) {
  let iOut = 0
  const arr = new Uint8Array(Math.ceil(base64Str.length * 3 / 4))

  for (let i = 0, len = base64Str.length, validBits = 0, bitsSoFar = 0; i < len; i++) {
    let bits
    const c = base64Str.charCodeAt(i)
    if (c >= 0x41 && c <= 0x5a) { // [A-Z]
      bits = c - 0x41
    } else if (c >= 0x61 && c <= 0x7a) { // [a-z]
      bits = c - 0x61 + 0x1a
    } else if (c >= 0x30 && c <= 0x39) { // [0-9]
      bits = c - 0x30 + 0x34
    } else if (c === 0x2b) { // +
      bits = 0x3e
    } else if (c === 0x2f) { // /
      bits = 0x3f
    } else if (c === 0x3d) { // =
      validBits = 0
      continue
    } else {
      // ignore all other characters!
      continue
    }
    bitsSoFar = (bitsSoFar << 6) | bits
    validBits += 6
    if (validBits >= 8) {
      validBits -= 8
      arr[iOut++] = bitsSoFar >> validBits
      if (validBits === 2) {
        bitsSoFar &= 0x03
      } else if (validBits === 4) {
        bitsSoFar &= 0x0f
      }
    }
  }

  return (iOut < arr.length) ? arr.subarray(0, iOut) : arr
}
