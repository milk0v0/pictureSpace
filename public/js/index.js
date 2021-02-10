import ajax from './ajax.js';
const upLoadEle = document.querySelector('#upLoad');
const fileEle = document.querySelector('#file');
const upLoadedEle = document.querySelector('#upLoaded');
const upLoadAllEle = document.querySelector('#upLoadAll');
const closeEle = document.querySelector('#close');
const task_panelEle = document.querySelector('#task_panel');
const task_bodyEle = document.querySelector('#task_body');
const clearEle = document.querySelector('#clear');

// window.localStorage.getItem()

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
            url: '/upLoad',
            data: { file },
            onprogress(e) {
                li.querySelector('.progress').style.width = e.loaded / e.total * 100 + '%';
            },
            success() {
                li.setAttribute('success', true);
                upLoadedEle.innerHTML = ++upLoadedEle.innerHTML;
                li.querySelector('.task-progress-status').innerHTML = '<span class="icon task-progress-status-success"></span>';
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