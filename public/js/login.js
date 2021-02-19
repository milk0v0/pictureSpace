import ajax from './ajax.js';
const nameEle = document.querySelector('#userName');
const userPwdEle = document.querySelector('#userPwd');
const confirmEle = document.querySelector('#confirm');

confirmEle.onclick = () => {
    if (!nameEle.value || !userPwdEle.value) {
        return alert('请填写用户名及密码')
    }
    ajax({
        method: 'post',
        url: 'login',
        data: {
            name: nameEle.value,
            pwd: userPwdEle.value
        },
        success(xhr) {
            const { state, data } = JSON.parse(xhr.responseText);
            const authorization = xhr.getResponseHeader('Authorization');
            if (state === 1 && authorization) {
                window.localStorage.setItem('authorization', authorization);
                window.localStorage.setItem('userName', data);
                return window.location.href = '/index.html'
            }
            alert(data);
        }
    });
}