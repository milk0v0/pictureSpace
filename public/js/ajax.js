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

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        options.success(this.responseText);
    }

    xhr.open(options.method, options.url, true);

    xhr.send();
}