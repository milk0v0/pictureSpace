function noop() { }

function ajax(options) {
    options = {
        ...{
            method: 'get',
            url: '',
            success: noop
        },
        ...options
    }
    options.query && (options.url += queryParse(options.query));

    const xhr = new XMLHttpRequest();
    
    options.onprogress && (xhr.upload.onprogress = e => options.onprogress(e));
    xhr.onload = function () {
        options.success(this.responseText);
    }

    xhr.open(options.method, options.url, true);

    let data = null;
    options.data && (data = bodyParse(options.data));

    xhr.send(data);
}

function queryParse(obj) {
    let arr = [];
    for (const key in obj) {
        arr.push(`${key}=${obj[key]}`);
    }
    const str = arr.join('&');
    if (str) {
        return '?' + str;
    } else {
        return ''
    }
}

function bodyParse(obj) {
    const formData = new FormData();
    for (const key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}