(function() {
    const HOST = 'http://106.55.159.191:3000';
    // const HOST = 'http://10.10.48.117:3000';
    function publicInit() {
        const btn = document.querySelector('.J-pb');
        btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.classList.add('publish-btn__disabled');
            btn.textContent = '正在发布，请稍后.....';
            axios.get(`${HOST}/publish`).then(res => {
                if(res.status === 200 && res.data === 'ok') {
                    alert('发布成功,请刷新博客页面!');
                    btn.disabled = false;
                    btn.classList.remove('publish-btn__disabled');
                    btn.textContent = '发布';
                } else {
                    alert('发布失败,请去服务器查看报错!');
                    btn.textContent = '发布失败';
                }
            }).catch(res => {
                console.log('errpr', res)
                alert('发布失败,请去服务器查看报错!');
                btn.textContent = '发布失败';
            })
    })
    }
    function upload(file) {
        const formData =  new FormData();
        formData.append('file',file);
        axios.post(`${HOST}/upload`,formData).then(res => {
            console.log('res',res);
            if(res && res.data) {
             addResult(res.data);
            }
        }).catch(err => {
         console.log('err',err);
        })
    }
    function addResult(url) {
         const resultWrapDom = document.querySelector('.J-success-wrap');
         const spanDom = document.createElement('span');
         spanDom.innerText = url;
         spanDom.className = 'url-item';
         resultWrapDom.appendChild(spanDom);
    }
    function initUpload() {
        const fileDom = document.querySelector('.J-file-select');
        fileDom.addEventListener('change', (e) => {
            console.log(e);
            const file = e.target.files && e.target.files[0];
            upload(file);
        })
    }
    function hiddenChild() {
        document.querySelectorAll('.J-item-child').forEach(dom => {
            dom.classList.add('hidden');
        })
    }
    function init() {
        const leftWrapdom = document.querySelector('.J-left-listen');
        leftWrapdom.addEventListener('click', (e) => {
            for (const iterator of e.target.attributes) {
                if(iterator.name === 'data-type') {
                    hiddenChild();
                    document.querySelector('.J-' + iterator.nodeValue).classList.remove('hidden');
                }
            }
        })
    }
    init();
    publicInit();
    initUpload();
})();