var fs = require('fs');
var path = require('path');

var UUE = function(){
   if (!(this instanceof UUE)) return new UUE();
};

UUE.prototype.encode = function(encodeSource, encodeOptions){
   /* jshint bitwise:false */
   if( typeof encodeOptions === 'undefined' ) encodeOptions = {};

   if( typeof encodeSource === 'string' ){ // treat as filename
      // check encodeOptions.mode
      if( typeof encodeOptions.mode === 'undefined' ){
         encodeOptions.mode = (
            fs.statSync(encodeSource).mode & parseInt('777', 8)
         ).toString(8);
      } else if( typeof encodeOptions.mode !== 'string' ){
         encodeOptions.mode = encodeOptions.mode.toString(8);
      }

      // check encodeOptions.filename
      if( typeof encodeOptions.filename === 'undefined' ){
         encodeOptions.filename = path.basename(encodeSource);
      }

      // make encodeSource a buffer
      encodeSource = fs.readFileSync(encodeSource);
   } else if( Buffer.isBuffer(encodeSource) ){ // treat as buffer
      // check encodeOptions.mode
      if( typeof encodeOptions.mode === 'undefined' ){
         encodeOptions.mode = '644';
      } else if( typeof encodeOptions.mode !== 'string' ){
         encodeOptions.mode = encodeOptions.mode.toString(8);
      }

      // check encodeOptions.filename
      if( typeof encodeOptions.filename === 'undefined' ){
         encodeOptions.filename = 'buffer.bin';
      }
   } else throw new Error(this.errors.UNKNOWN_SOURCE_TYPE);

   if( typeof encodeOptions.eol === 'undefined' ) encodeOptions.eol = '\n';

   // now encodeSource is always a buffer
   var output = [];
   output.push('begin ');
   output.push(encodeOptions.mode);
   output.push(' ');
   output.push(encodeOptions.filename);
   output.push(encodeOptions.eol);

   var offset = 0;
   while( offset < encodeSource.length ){
      var triplet, total, charCode;
      if( encodeSource.length - offset >= 45 ){ // complete line, 15 triplets
         output.push(String.fromCharCode(45 + 32));
         for( triplet = 0; triplet < 15; triplet++ ){
            total = 0;

            total += encodeSource.readUInt8(offset) << 16;
            offset++;
            total += encodeSource.readUInt8(offset) << 8;
            offset++;
            total += encodeSource.readUInt8(offset);
            offset++;

            charCode = total >>> 18;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 12) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 6) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = total & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));
         }
      } else { // last line, less than 15 triplets
         output.push(String.fromCharCode(encodeSource.length - offset + 32));
         var tripletNum = ( (encodeSource.length - offset) /3 ) |0;
         for( triplet = 0; triplet < tripletNum; triplet++ ){
            total = 0;

            total += encodeSource.readUInt8(offset) << 16;
            offset++;
            total += encodeSource.readUInt8(offset) << 8;
            offset++;
            total += encodeSource.readUInt8(offset);
            offset++;

            charCode = total >>> 18;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 12) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 6) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = total & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));
         }
         if( offset < encodeSource.length ){ // some bytes remain
            total = 0;

            total += encodeSource.readUInt8(offset) << 16;
            offset++;
            if( offset < encodeSource.length ){
               total += encodeSource.readUInt8(offset) << 8;
               offset++;
            }
            if( offset < encodeSource.length ){
               total += encodeSource.readUInt8(offset);
               offset++;
            }

            charCode = total >>> 18;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 12) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = (total >>> 6) & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));

            charCode = total & 0x3F;
            if( charCode === 0 ) charCode = 64;
            output.push(String.fromCharCode(charCode + 32));
         }
      }
      output.push(encodeOptions.eol);
   }

   output.push('`');
   output.push(encodeOptions.eol);
   output.push('end');
   return output.join('');
};

UUE.prototype.decodeFile = function(text, filename){
   var matches = [];
   var potentialUUE = RegExp(
      [
         '^begin [0-7]{3} ' + filename + '\n',
         '(',
         '(?:[\x20-\x60]+\n)*', // allow garbage after significant characters
         ')',
         '`\n',
         'end$'
      ].join(''),
      'gm'
   );

   var continueSearch = true;
   do {
      var nextMatch = potentialUUE.exec(text);
      if( nextMatch === null ){
         continueSearch = false;
      } else {
         matches.push(nextMatch);
      }
   } while( continueSearch );

   if( matches.length === 0 ) return null;

   var fileFound = null;
   matches.forEach(function(nextMatch){
      if( fileFound !== null ) return;

      if( nextMatch[1].length < 1 ){
         fileFound = new Buffer(0);
         return;
      }

      var decodingError = false;
      var decoded = nextMatch[1].split('\n');
      decoded.pop(); // cut last \n (it is not a separator)
      decoded = decoded.map(function(lineUUE){
         /* jshint bitwise:false */
         if( decodingError ) return null;

         var byteLength = (lineUUE.charCodeAt(0) - 32) % 64;
         if( byteLength === 0 ) return new Buffer(0);

         var charLength = ( (byteLength / 3) |0 ) * 4;
         if( byteLength % 3 !== 0 ) charLength += 4;
         if( 1 + charLength > lineUUE.length ){
            decodingError = true;
            return null;
         }
         var targetBuffer = new Buffer(byteLength);

         var step, total;
         var stringOffset = 1;
         var bufferOffset = 0;
         for( step = 0; step < ( (charLength / 4) |0 ); step++ ){
            total = 0;

            total += ((lineUUE.charCodeAt(stringOffset) - 32) % 64) << 18;
            stringOffset++;
            total += ((lineUUE.charCodeAt(stringOffset) - 32) % 64) << 12;
            stringOffset++;
            total += ((lineUUE.charCodeAt(stringOffset) - 32) % 64) << 6;
            stringOffset++;
            total +=  (lineUUE.charCodeAt(stringOffset) - 32) % 64;
            stringOffset++;

            // noAssert === true:
            // silently apply &0xFF mask, silently drop after byteLength
            targetBuffer.writeUInt8( total >>> 16, bufferOffset, true );
            bufferOffset++;
            targetBuffer.writeUInt8( total >>> 8, bufferOffset, true );
            bufferOffset++;
            targetBuffer.writeUInt8( total, bufferOffset, true );
            bufferOffset++;
         }
         return targetBuffer;
      });
      if( decodingError ) return;

      // now `decoded` is a valid array containing buffers,
      // because `null` could appear only in `decodingError` state
      fileFound = Buffer.concat(decoded);
   });

   return fileFound;
};

UUE.prototype.errors = {
   UNKNOWN_SOURCE_TYPE: "The source's type is unknown!"
};

module.exports = new UUE();