ajax({
    method: 'get',
    url: '/test',
    success(data) {
        console.log(data);
    }
})