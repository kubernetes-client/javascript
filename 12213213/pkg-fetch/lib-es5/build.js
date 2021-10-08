"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var utils_1 = require("./utils");
var system_1 = require("./system");
var log_1 = require("./log");
var patches_json_1 = __importDefault(require("../patches/patches.json"));
var buildPath = path_1.default.resolve(process.env.PKG_BUILD_PATH ||
    path_1.default.join(os_1.default.tmpdir(), "pkg." + crypto_1.default.randomBytes(12).toString('hex')));
var nodePath = path_1.default.join(buildPath, 'node');
var patchesPath = path_1.default.resolve(__dirname, '../patches');
var nodeRepo = 'https://github.com/nodejs/node';
function getMajor(nodeVersion) {
    var _a = nodeVersion.match(/^v?(\d+)/) || ['', 0], version = _a[1];
    return Number(version) | 0;
}
function getConfigureArgs(major, targetPlatform) {
    var args = [];
    // first of all v8_inspector introduces the use
    // of `prime_rehash_policy` symbol that requires
    // GLIBCXX_3.4.18 on some systems
    // also we don't support any kind of debugging
    // against packaged apps, hence v8_inspector is useless
    args.push('--without-inspector');
    if (system_1.hostPlatform === 'alpine') {
        // Statically Link against libgcc and libstdc++ libraries. See vercel/pkg#555.
        // libgcc and libstdc++ grant GCC Runtime Library Exception of GPL
        args.push('--partly-static');
    }
    if (targetPlatform === 'linuxstatic') {
        args.push('--fully-static');
    }
    // Link Time Optimization
    if (major >= 12) {
        if (system_1.hostPlatform !== 'win') {
            args.push('--enable-lto');
        }
    }
    // DTrace
    args.push('--without-dtrace');
    // bundled npm package manager
    args.push('--without-npm');
    // Small ICU
    args.push('--with-intl=small-icu');
    // Workaround for nodejs/node#39313
    // All supported macOS versions have zlib as a system library
    if (targetPlatform === 'macos') {
        args.push('--shared-zlib');
    }
    return args;
}
function gitClone(nodeVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log.info('Cloning Node.js repository from GitHub...');
                    args = [
                        'clone',
                        '-b',
                        nodeVersion,
                        '--depth',
                        '1',
                        '--single-branch',
                        '--bare',
                        '--progress',
                        nodeRepo,
                        'node/.git',
                    ];
                    return [4 /*yield*/, utils_1.spawn('git', args, { cwd: buildPath, stdio: 'inherit' })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function gitResetHard(nodeVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var patches, commit, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log.info("Checking out " + nodeVersion);
                    patches = patches_json_1.default[nodeVersion];
                    commit = 'commit' in patches && patches.commit ? patches.commit : nodeVersion;
                    args = ['--work-tree', '.', 'reset', '--hard', commit];
                    return [4 /*yield*/, utils_1.spawn('git', args, { cwd: nodePath, stdio: 'inherit' })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function applyPatches(nodeVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var storedPatches, storedPatch, patches, _i, patches_1, patch, patchPath, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log.info('Applying patches');
                    storedPatches = patches_json_1.default[nodeVersion];
                    storedPatch = 'patches' in storedPatches ? storedPatches.patches : storedPatches;
                    patches = 'sameAs' in storedPatch
                        ? patches_json_1.default[storedPatch.sameAs]
                        : storedPatch;
                    _i = 0, patches_1 = patches;
                    _a.label = 1;
                case 1:
                    if (!(_i < patches_1.length)) return [3 /*break*/, 4];
                    patch = patches_1[_i];
                    patchPath = path_1.default.join(patchesPath, patch);
                    args = ['-p1', '-i', patchPath];
                    return [4 /*yield*/, utils_1.spawn('patch', args, { cwd: nodePath, stdio: 'inherit' })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function compileOnWindows(nodeVersion, targetArch, targetPlatform) {
    return __awaiter(this, void 0, void 0, function () {
        var args, major, config_flags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = ['/c', 'vcbuild.bat', targetArch];
                    major = getMajor(nodeVersion);
                    config_flags = getConfigureArgs(major, targetPlatform);
                    // Event Tracing for Windows
                    args.push('noetw');
                    // Performance counters on Windows
                    if (major <= 10) {
                        args.push('noperfctr');
                    }
                    // Link Time Code Generation
                    if (major >= 12) {
                        args.push('ltcg');
                    }
                    // Can't cross compile for arm64 with small-icu
                    if (system_1.hostArch !== targetArch &&
                        !config_flags.includes('--with-intl=full-icu')) {
                        config_flags.push('--without-intl');
                    }
                    return [4 /*yield*/, utils_1.spawn('cmd', args, {
                            cwd: nodePath,
                            env: __assign(__assign({}, process.env), { config_flags: config_flags.join(' ') }),
                            stdio: 'inherit',
                        })];
                case 1:
                    _a.sent();
                    if (major <= 10) {
                        return [2 /*return*/, path_1.default.join(nodePath, 'Release/node.exe')];
                    }
                    return [2 /*return*/, path_1.default.join(nodePath, 'out/Release/node.exe')];
            }
        });
    });
}
var _a = process.env.MAKE_JOB_COUNT, MAKE_JOB_COUNT = _a === void 0 ? os_1.default.cpus().length : _a;
function compileOnUnix(nodeVersion, targetArch, targetPlatform) {
    return __awaiter(this, void 0, void 0, function () {
        var args, cpu, _a, _b, CFLAGS, _c, CXXFLAGS, output;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    args = [];
                    cpu = {
                        x86: 'ia32',
                        x64: 'x64',
                        armv6: 'arm',
                        armv7: 'arm',
                        arm64: 'arm64',
                        ppc64: 'ppc64',
                        s390x: 's390x',
                    }[targetArch];
                    if (cpu) {
                        args.push('--dest-cpu', cpu);
                    }
                    if (targetArch === 'armv7') {
                        _a = process.env, _b = _a.CFLAGS, CFLAGS = _b === void 0 ? '' : _b, _c = _a.CXXFLAGS, CXXFLAGS = _c === void 0 ? '' : _c;
                        process.env.CFLAGS = CFLAGS + " -marm -mcpu=cortex-a7";
                        process.env.CXXFLAGS = CXXFLAGS + " -marm -mcpu=cortex-a7";
                        args.push('--with-arm-float-abi=hard');
                        args.push('--with-arm-fpu=vfpv3');
                    }
                    if (system_1.hostArch !== targetArch) {
                        log_1.log.warn('Cross compiling!');
                        log_1.log.warn('You are responsible for appropriate env like CC, CC_host, etc.');
                        args.push('--cross-compiling');
                    }
                    args.push.apply(args, getConfigureArgs(getMajor(nodeVersion), targetPlatform));
                    // TODO same for windows?
                    return [4 /*yield*/, utils_1.spawn('./configure', args, { cwd: nodePath, stdio: 'inherit' })];
                case 1:
                    // TODO same for windows?
                    _d.sent();
                    return [4 /*yield*/, utils_1.spawn(system_1.hostPlatform === 'freebsd' ? 'gmake' : 'make', ['-j', String(MAKE_JOB_COUNT)], {
                            cwd: nodePath,
                            stdio: 'inherit',
                        })];
                case 2:
                    _d.sent();
                    output = path_1.default.join(nodePath, 'out/Release/node');
                    return [4 /*yield*/, utils_1.spawn(process.env.STRIP || 'strip', __spreadArray(__spreadArray([], (targetPlatform === 'macos' ? ['-x'] : [])), [output]), {
                            stdio: 'inherit',
                        })];
                case 3:
                    _d.sent();
                    if (!(targetPlatform === 'macos')) return [3 /*break*/, 5];
                    // Newer versions of Apple Clang automatically ad-hoc sign the compiled executable.
                    // However, for final executable to be signable, base binary MUST NOT have an existing signature.
                    return [4 /*yield*/, utils_1.spawn('codesign', ['--remove-signature', output], {
                            stdio: 'inherit',
                        })];
                case 4:
                    // Newer versions of Apple Clang automatically ad-hoc sign the compiled executable.
                    // However, for final executable to be signable, base binary MUST NOT have an existing signature.
                    _d.sent();
                    _d.label = 5;
                case 5: return [2 /*return*/, output];
            }
        });
    });
}
function compile(nodeVersion, targetArch, targetPlatform) {
    return __awaiter(this, void 0, void 0, function () {
        var win;
        return __generator(this, function (_a) {
            log_1.log.info('Compiling Node.js from sources...');
            win = system_1.hostPlatform === 'win';
            if (win) {
                return [2 /*return*/, compileOnWindows(nodeVersion, targetArch, targetPlatform)];
            }
            return [2 /*return*/, compileOnUnix(nodeVersion, targetArch, targetPlatform)];
        });
    });
}
function build(nodeVersion, targetArch, targetPlatform, local) {
    return __awaiter(this, void 0, void 0, function () {
        var output, outputHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.remove(buildPath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.mkdirp(buildPath)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, gitClone(nodeVersion)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, gitResetHard(nodeVersion)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, applyPatches(nodeVersion)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, compile(nodeVersion, targetArch, targetPlatform)];
                case 6:
                    output = _a.sent();
                    return [4 /*yield*/, utils_1.hash(output)];
                case 7:
                    outputHash = _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.mkdirp(path_1.default.dirname(local))];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.copy(output, local)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.promises.writeFile(local + ".sha256sum", outputHash + "  " + path_1.default.basename(local) + "\n")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.remove(buildPath)];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = build;
//# sourceMappingURL=build.js.map