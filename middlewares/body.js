const KoaBody = require('koa-body');

module.exports = dir => {
    let options = {
        multipart: true
    }
    dir && (options.formidable = {
        uploadDir: dir,
        keepExtensions: true
    });

    return KoaBody(options);
}