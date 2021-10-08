"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPECTED_HASHES = void 0;
exports.EXPECTED_HASHES = {
    // 2a68741776e74f626c83254941a639ab7dcf6332
    // alpine: https://github.com/vercel/pkg-fetch/actions/runs/752615021
    // linux: https://github.com/vercel/pkg-fetch/actions/runs/752615173
    // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/752615423
    // macos: https://github.com/vercel/pkg-fetch/actions/runs/752615807
    // win: https://github.com/vercel/pkg-fetch/actions/runs/752615557
    'node-v10.24.1-alpine-arm64': 'f6a59f1ace2ef1f4bf976ff85d9a74bdc71bda098e8aa018e2a089c590aeedea',
    'node-v10.24.1-alpine-x64': '24f862b22a59ac0adb746d5bd3f2226c8eb2f6e1565a1cb4d2418c9cb0f3769e',
    'node-v10.24.1-linux-x64': 'c59574f4ea7b1423bd7ef586887ea41c43cfb2a63431126af0de20291a3a94db',
    'node-v10.24.1-linuxstatic-arm64': '01bc2cfbf7a7dd1a74201ae34a6cfafc1ad1c6d77039f587111738a81637bc5b',
    'node-v10.24.1-linuxstatic-x64': 'a7bbd62b712b3a7ac54953b646f0802e84bc7ecadb0b8a0756323fcffe3310a5',
    'node-v10.24.1-win-x64': '958647af177a9089bb4f3495e352d5348a1b42858d0111004ca26c3a2ece3f73',
    'node-v8.17.0-alpine-arm64': '807df81524ec8e1e266ac7fbed434c6b2281ae20b9fa7eaa524de90f3330c4d7',
    'node-v8.17.0-alpine-x64': '83a3914de57ee6be7d68ebaac8a10c1a2972d554800f1bee218cc4a23650e0fb',
    'node-v8.17.0-linux-arm64': 'f06855896bfa10bead1f08fac080305fb6fbfb2cc691168a3f0f0e834e12bfba',
    'node-v8.17.0-linux-x64': '14d75d43de1ff86469d354bf42a83b9494e09502fa7bc23a975e2cb82b1608b0',
    'node-v8.17.0-linuxstatic-arm64': '84de8fe30b2bd1dcb3615cf1d1b538aa48e1fcf66620ef97dce6b7ae85b45025',
    'node-v8.17.0-linuxstatic-x64': '5206878079f160e75a02ad33b7559b4a869e8181ee03d51d7211b52995f9ca7b',
    'node-v8.17.0-macos-x64': 'dffa71e39100f4daa57de73fda7b4debecd09f552b15cf11854c8475380d3817',
    'node-v8.17.0-win-x64': '4556a06dc59a0196453ba5962ea077ea71fe566e4de1c92f73f057446d422251',
    // 27e00d1d72ab4afda203edcd7a4f9601bc1d641c
    // linux: https://github.com/vercel/pkg-fetch/actions/runs/888438143
    // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/888438190
    // macos: https://github.com/vercel/pkg-fetch/actions/runs/888438236
    'node-v10.24.1-linux-arm64': 'e3a3e5197e3f3d1063e3178786890b29493b8dfc31362f3417cce90ca7eb3e98',
    'node-v10.24.1-linuxstatic-armv7': '4933be03e394a82f5aa5fc4600b29392b2ce7eac24bd2ef8759f9a8e8c841990',
    // 55a34ad0afe75749a14260c45d39cc9b265995ed
    // macos: https://github.com/vercel/pkg-fetch/actions/runs/918633749
    'node-v10.24.1-macos-x64': 'f2e4679262a1cc6f3213cc4f0453d662e48c021975b651534fcbf26d6fdab474',
    // 980c8a21aa66dc6b2c97561018f853da64ca4e51
    // alpine: https://github.com/vercel/pkg-fetch/actions/runs/1202523576
    // linux: https://github.com/vercel/pkg-fetch/actions/runs/1202523602
    // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/1202523682
    // macos: https://github.com/vercel/pkg-fetch/actions/runs/1202524160
    // win: https://github.com/vercel/pkg-fetch/actions/runs/1202523900
    'node-v12.22.6-alpine-arm64': 'c589da8778246da347001a762e2581c0a4017c4532d929aa4cd3e571afe473ff',
    'node-v12.22.6-alpine-x64': 'a9746d28f2062db930e2e323b97d96013109b1f5c4fa3bcfd42cb57a0d610808',
    'node-v12.22.6-linux-arm64': '0761468a69be19a9e7280716a1a8f7421dea511864f46866f8e71a8f8cb66dca',
    'node-v12.22.6-linux-x64': 'a3cc06c1774cc3ebdb37fdceaa2c9b355afe34daba5fca3d0c79d2bdb6b39f92',
    'node-v12.22.6-linuxstatic-arm64': '0706eb800156979e1995db85733c6de438671db9b50b7f28431afca5069eb3d3',
    'node-v12.22.6-linuxstatic-armv7': '67278b39a2baae3f40f37bcf16738701ae982cb9d545265eb8401f6cf87edc6d',
    'node-v12.22.6-linuxstatic-x64': 'edd99782fa5c6615da765014cd60fa121c5366e893c04549a6df39731478b8d9',
    'node-v12.22.6-macos-x64': 'f9a9a4135dd2defc2f38e462a3cd388f60fa44975b368ce2b69930b6da2fc0d7',
    'node-v12.22.6-win-x64': '7e19059ef5e02e3062805ceb7c28c475c32d52f0d36bd30431c536ec497ab40d',
    'node-v14.17.6-alpine-arm64': 'a49f7152d5a4794acae5fe1cf2905483ebade5fa1bf38ace9d21dc2826febc38',
    'node-v14.17.6-alpine-x64': '28b817a54434258ff17fdcfceee944a138a745484724612c371071b776ef41fb',
    'node-v14.17.6-linux-arm64': 'c945d92277fc3ad32c9ac6641337a299f97bda8f11bbb91b30912489409c4de7',
    'node-v14.17.6-linux-x64': '38605a5543c9b5f346eb88055edf276219b20998f5f6a3b424f3c1a98bf6aedc',
    'node-v14.17.6-linuxstatic-arm64': 'f8981ff9cc7e4f0937d587ee0dda4beb9bd04c0c6122264e1d7edc58dd8b2c0a',
    'node-v14.17.6-linuxstatic-armv7': '08cb7708a9c3cb68d828aa0dc383700d84cca6571102a851487520357bfe6202',
    'node-v14.17.6-linuxstatic-x64': 'e71ba9c52397c5fd621607296fa60262e6000f4a526833d1fc5d4ffadfe0958e',
    'node-v14.17.6-macos-x64': '9b14dc1cfee92d293a245152074bf7fa4012ca9902c3ce340c97772c98e3b3d8',
    'node-v14.17.6-win-arm64': '096415095761bac3a6df21fc953daeed925867771e235403ef66b3f553687ccd',
    'node-v14.17.6-win-x64': '41f3a2c2d390318f5b51ce987dfce6972230045c3241d576d390f0833012cec5',
    'node-v16.8.0-alpine-arm64': 'b8e85f07a7f8a4f081578cd1aa58ed2d70a00df57ee7db438492c5bc30658550',
    'node-v16.8.0-alpine-x64': '96e814a79433a441cb3fe01ece52d5a4e67f10d71884bc80f35fbd29e2416439',
    'node-v16.8.0-linux-arm64': 'd8ce2928c7da7947ed208543b94f0588d913902d4045c6f318c88ec85a252cd9',
    'node-v16.8.0-linux-x64': '44778a7d1ae2fe34c6a813d2bbe0c2f9887dd330071e85ec763664e7792e4eb1',
    'node-v16.8.0-linuxstatic-arm64': 'f666fa5587d3255a72e02e2e36cc14a1dcb4a03f2ade7cdd55add6283b7e67ba',
    'node-v16.8.0-linuxstatic-armv7': '51e503c90a9670c3f3be5382f229d818edbe128f989c8e7b467ed91c34386393',
    'node-v16.8.0-linuxstatic-x64': '4a2feb7fee49e0337f78df0800b89d2d981cbef242519800a03cc38bb126274e',
    'node-v16.8.0-macos-x64': '4f70cf71659f1d143dcc19967e19c1902dd716b79bf531590b8eccc86f83d38a',
    'node-v16.8.0-win-arm64': 'a3837ade3faa57eb0cd1d601f1845e6929f8c5870cd2a83f2d8a257f9082ddc4',
    'node-v16.8.0-win-x64': '2874e1435ade6eee3b4b998aa56f4bda87fadfc93dc09059a68db085df68eadc',
    // 980c8a21aa66dc6b2c97561018f853da64ca4e51
    // manual
    'node-v14.17.6-macos-arm64': 'bb8d964c01966a44a9023445996af54fe43ea9f5553fa46194759c14eb32bf18',
    'node-v16.8.0-macos-arm64': 'dcb301eb30b32545fd0d09272e4f2611c501ca1bf8226ce16ee08d9a9e1406e7',
};
//# sourceMappingURL=expected.js.map