import ajax from './ajax.js';
const nameEle = document.querySelector('#userName');
const pwdEls = document.querySelectorAll('.userPwd');
const nameWarningEle = document.querySelector('#nameWarning');
const pwdWarningEle = document.querySelector('#pwdWarning');
const confirmEle = document.querySelector('#confirm');

let nameState;

nameEle.onblur = function () {
    ajax({
        method: 'post',
        url: '/register/checkName',
        data: {
            name: this.value
        },
        success(xhr) {
            const _data = xhr.responseText;
            nameState = JSON.parse(_data);
            const { state, data } = nameState;
            nameWarningEle.innerHTML = '';
            state !== 1 && (nameWarningEle.innerHTML = data);
        }
    })
}

pwdEls[1].onblur = () => {
    pwdWarningEle.innerHTML = '';
    if (!pwdEls[0].value || pwdEls[0].value !== pwdEls[1].value) {
        pwdWarningEle.innerHTML = '两次密码不一样'
    }
}

confirmEle.onclick = () => {
    if (!pwdEls[0].value) {
        return alert('密码不能为空')
    }

    if (!nameEle.value) {
        return alert('姓名不能为空')
    }

    if (pwdEls[0].value !== pwdEls[1].value) {
        return alert('两次密码不一样')
    }

    if (nameState.state !== 1) {
        return alert(nameState.data)
    }

    ajax({
        method: 'post',
        url: '/register',
        data: {
            name: nameEle.value,
            pwd: pwdEls[0].value
        },
        success(xhr) {
            const _data = xhr.responseText;
            const { state, data } = JSON.parse(_data);
            alert(data);
            state ===1 && (window.location.href = '/login.html');
        }
    })
}