import ajax from './ajax.js';
const upLoadEle = document.querySelector('#upLoad');
const fileEle = document.querySelector('#file');
const upLoadedEle = document.querySelector('#upLoaded');
const upLoadAllEle = document.querySelector('#upLoadAll');
const closeEle = document.querySelector('#close');
const task_panelEle = document.querySelector('#task_panel');
const task_bodyEle = document.querySelector('#task_body');
const clearEle = document.querySelector('#clear');
const userNameEle = document.querySelector('#userName');
const logOutEle = document.querySelector('#logOut');
const contentListEle = document.querySelector('.content-list');

upLoadEle.onclick = () => fileEle.click();

fileEle.onchange = function () {
    if (!this.files.length) return;

    task_panelEle.style.display = 'block';
    upLoadAllEle.innerHTML = +upLoadAllEle.innerHTML + this.files.length;

    for (const file of this.files) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${file.name}</span>
            <div class="task-progress-status">
                上传中……
            </div>
            <div class="progress"></div>
        `;
        task_bodyEle.appendChild(li);

        ajax({
            method: 'post',
            // url: 'http://127.0.0.1:3000/upLoad', // CORS
            url: 'api/upLoad', // 服务器代理
            data: { file },
            headers: { authorization: 'Bearer ' + window.localStorage.getItem('authorization') },
            onprogress(e) {
                li.querySelector('.progress').style.width = e.loaded / e.total * 100 + '%';
            },
            success(xhr) {
                li.setAttribute('success', true);
                upLoadedEle.innerHTML = ++upLoadedEle.innerHTML;
                li.querySelector('.task-progress-status').innerHTML = '<span class="icon task-progress-status-success"></span>';

                task_body.querySelectorAll('li').length === task_body.querySelectorAll('li[success=true]').length && closeEle.click();

                const { data } = JSON.parse(xhr.responseText);
                const firstEle = contentListEle.querySelector('img:nth-of-type(1)');
                const img = new Image();
                img.src = data;
                if (firstEle) {
                    contentListEle.insertBefore(img, firstEle);
                } else {
                    contentListEle.appendChild(img);
                }
            }
        });
    }
}

closeEle.onclick = () => (task_panelEle.style.display = 'none');

clearEle.onclick = () => {
    const li = task_body.querySelectorAll('li[success=true]');
    for (const item of li) {
        item.remove();
    }
    upLoadedEle.innerHTML = 0;
    upLoadAllEle.innerHTML = task_body.querySelectorAll('li').length;
}

logOutEle.onclick = () => {
    window.localStorage.clear('authorization', 'userName');
    window.location.href = '/login.html';
}

function getPhotos() {
    const userName = window.localStorage.getItem('userName');
    const authorization = window.localStorage.getItem('authorization');
    if (!userName || !authorization) {
        return window.location.href = '/login.html';
    }
    userNameEle.innerHTML = userName;
    ajax({
        method: 'post',
        // url: 'http://127.0.0.1:3000/getPhotos', // CORS
        url: 'api/getPhotos', // 服务器代理
        headers: { authorization: 'Bearer ' + authorization },
        success(xhr) {
            const { data } = JSON.parse(xhr.responseText);
            let str = '';
            data.forEach(item => {
                str = `<img src=${item}/>` + str;
            });
            contentListEle.innerHTML = str;
        }
    });
}

getPhotos();