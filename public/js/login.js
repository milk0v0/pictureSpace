import ajax from './ajax.js';
const nameEle = document.querySelector('#userName');
const userPwdEle = document.querySelector('#userPwd');
const confirmEle = document.querySelector('#confirm');

confirmEle.onclick = () => {
    if(!nameEle.value || !userPwdEle.value) {
        return alert('请填写用户名及密码')
    }
    ajax({
        method: 'post',
        url: 'login',
        data: {
            name: nameEle.value,
            pwd: userPwdEle.value
        },
        success(_data) {
            const {state, data} = JSON.parse(_data);
            if(state === 1) {
                return window.location.href = '/index.html'
            }
            alert(data);
        }
    });
}