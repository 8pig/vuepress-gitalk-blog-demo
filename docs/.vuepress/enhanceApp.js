function integrateGitalk(router) {
    const linkGitalk = document.createElement('link');
    linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
    linkGitalk.rel = 'stylesheet';
    document.body.appendChild(linkGitalk);
    const scriptGitalk = document.createElement('script');
    scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    document.body.appendChild(scriptGitalk);

    router.afterEach((to) => {
        if (scriptGitalk.onload) {
            loadGitalk(to);
        } else {
            scriptGitalk.onload = () => {
                loadGitalk(to);
            }
        }
    });

    function loadGitalk(to) {
        let commentsContainer = document.getElementById('gitalk-container');
        if (!commentsContainer) {
            commentsContainer = document.createElement('div');
            commentsContainer.id = 'gitalk-container';
            commentsContainer.classList.add('content');
        }
        const $page = document.querySelector('.page');
        if ($page) {
            $page.appendChild(commentsContainer);
            if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
                renderGitalk(to.fullPath);
            }
        }
    }
    function renderGitalk(fullPath) {
        const gitalk = new Gitalk({
            clientID: '', // 需申请
            clientSecret: '', // come from github development
            repo: 'zhou',  // 仓库名称
            owner: '8pig',  // 用户
            admin: ['8pig'], // 用户
            id: 'comment',
            distractionFreeMode: false,
            language: 'zh-CN',
        });
        gitalk.render('gitalk-container');
    }
}

export default ({Vue, options, router}) => {
    try {
        document && integrateGitalk(router)
    } catch (e) {
        console.error(e.message)
    }
}