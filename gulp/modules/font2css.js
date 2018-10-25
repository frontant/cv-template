var through = require('through2');
var path = require('path');

var cssFontStyleKeywords = [
    "normal",
    "italic",
    "oblique"
];

var cssFontWeightNames = {
    "thin": "100",
    "extralight": "200",
    "ultralight": "200",
    "light": "300",
    "book": "400",
    "normal": "400",
    "regular": "400",
    "roman": "400",
    "medium": "500",
    "semibold": "600",
    "demibold": "600",
    "bold": "700",
    "extrabold": "800",
    "ultrabold": "800",
    "black": "900",
    "heavy": "900"
};

var cssFontWeightNumbers = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
];

var cssFontWeightNames2 = extendCssFontWeightNames();
var cssFontStyleKeywords2 = extendCssFontStyleKeywords();


function extendCssFontWeightNames() {
    var ret = {};
    cssFontStyleKeywords.forEach(function (s) {
        for (var w in cssFontWeightNames) {
            if (cssFontWeightNames.hasOwnProperty(w)) {
                ret[w] = cssFontWeightNames[w];
                ret[w + s] = cssFontWeightNames[w];
                ret[s + w] = cssFontWeightNames[w];
            }
        }
    });

    return ret;
}

function extendCssFontStyleKeywords() {
    var ret = {};
    cssFontStyleKeywords.forEach(function (s) {
        for (var w in cssFontWeightNames) {
            if (cssFontWeightNames.hasOwnProperty(w)) {
                ret[s] = s;
                ret[w + s] = s;
                ret[s + w] = s;
            }
        }
    });

    return ret;
}

function getFontFamily(basename) {
    var bnArr = basename.split('-');
    var l = bnArr.length;

    if (l < 1) {
        return '';
    }

    var retStr = bnArr[0];
    for (var i = 1; i < l; i++) {
        var v = bnArr[i].toLowerCase();
        if (cssFontWeightNames2[v] ||
                cssFontWeightNumbers.indexOf(v) >= 0 ||
                cssFontStyleKeywords2[v]) {
            break;
        } else {
            retStr += '-' + bnArr[i];
        }
    }

    return retStr.split(/(?=[A-Z])/).join(" ");
}

function guessFontStyle(basename) {
    return basename.split('-').slice(1).map(function (item) {
        return item.toLowerCase();
    }).reduce(function (prev, item) {
        if (cssFontStyleKeywords2[item]) {
            return cssFontStyleKeywords2[item];
        }

        return prev;
    }, '');
}

function guessFontWeight(basename) {
    return basename.split('-').slice(1).map(function (item) {
        return item.toLowerCase();
    }).reduce(function (prev, item) {
        if (item === 'normal') {
            return prev;
        }

        if (cssFontWeightNames2[item]) {
            return  cssFontWeightNames2[item];
        }

        if (cssFontWeightNumbers.indexOf(item) >= 0) {
            return item;
        }

        return prev;
    }, '');
}

function generateFontFaceStr(inFontFaceArr) {
    var retStr = "";

    inFontFaceArr.forEach(function (ff) {
        retStr += "\n" +
                "@font-face {\n";
        if (ff.fontFamily.length > 0) {
            retStr += "  font-family: \'" + ff.fontFamily + "\';\n";
        }

        if (ff.fontWeight.length > 0) {
            retStr += "  font-weight: " + ff.fontWeight + ";\n";
        }

        if (ff.fontStyle.length > 0) {
            retStr += "  font-style: " + ff.fontStyle + ";\n";
        } else {
            retStr += "  font-style: normal;\n";
        }

        var l = ff.src.length;
        for (var i = 0; i < l; i++) {
            if (i === 0) {
                if (i < l - 1) {
                    retStr += "  src: " + ff.src[i] + ",\n";
                } else {
                    retStr += "  src: " + ff.src[i] + "\n";
                }
            } else if (i < l - 1) {
                retStr += "       " + ff.src[i] + ",\n";
            } else {
                retStr += "       " + ff.src[i] + "\n";
            }
        }

        retStr += "}\n";
    });

    return retStr;
}

module.exports = function (file, urlBase = '../fonts') {
    var fontFaceArr = [];
    var latestChunk;

    function contentReader(chunk, enc, cb) {
        var extName = path.extname(chunk.path);
        var basename = path.basename(chunk.path, extName);

        var extExtra = '';
        var format = extName.split('.')[1];
        if (format === 'eot') {
            extExtra = '#iefix';
        } else if (format === 'ttf') {
            format = 'truetype';
        }

        var url = 'url(\'' + urlBase + '/' + chunk.relative + extExtra + '\') format(\'' + format + '\')';
        var foundBasename = false;

        for (var i = 0; i < fontFaceArr.length; i++) {
            var item = fontFaceArr[i];
            if (item.basename && item.basename === basename) {
                if (!item.src) {
                    item.src = [];
                }
                item.src.push(url);
                foundBasename = true;
                break;
            }
        }

        if (!foundBasename) {
            var fontFamily = getFontFamily(basename);
            var fontStyle = guessFontStyle(basename);
            var fontWeight = guessFontWeight(basename);

            fontFaceArr.push({
                basename: basename,
                fontFamily: fontFamily,
                fontStyle: fontStyle,
                fontWeight: fontWeight,
                src: [url]
            });
        }

        latestChunk = chunk;

        cb();
    }

    function endStream(cb) {
        if (latestChunk) {
            var comment = `/* This file was generated automatically by gulp. Do not edit this file. */\r\n\r\n`;
            var ffStr = comment + generateFontFaceStr(fontFaceArr);

            var f = latestChunk.clone({contents: false});
            f.path = path.join(latestChunk.base, file);
            f.contents = Buffer.from(ffStr, 'utf-8');

            this.push(f);
        }
        cb();
    }

    return through.obj(contentReader, endStream);
};
