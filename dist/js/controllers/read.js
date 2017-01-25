"use strict";
const fs = require("fs");
function fileToString(path) {
    return fs.readFileSync(path, 'utf-8');
}
exports.fileToString = fileToString;
//# sourceMappingURL=read.js.map