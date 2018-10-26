var pkg = require('../package.json');

// 兼容 verify 和 @xiping.wang/verify 
var name = pkg.name.split('/').pop();
var version = pkg.version;

var banner = 
`/*!
 * verify ${version} (https://github.com/xiping.wang/verify)
 * API https://github.com/xiping.wang/verify/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} xiping.wang. All Rights Reserved
 * Licensed under MIT (https://github.com/xiping.wang/verify/blob/master/LICENSE)
 */
`;

exports.name = name;
exports.banner = banner;
