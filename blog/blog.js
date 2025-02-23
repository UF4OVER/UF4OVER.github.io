function generateTOC() {
    const contentElement = document.getElementById('content');
    const headings = contentElement.querySelectorAll('h2, h3'); // 获取所有 h2 和 h3 标签
    const toc = document.getElementById('toc'); // 假设你有一个 toc 的元素

    toc.innerHTML = ''; // 清空现有目录

    headings.forEach(heading => {
        const id = heading.textContent.replace(/\s+/g, '-').toLowerCase(); // 生成 ID
        heading.id = id; // 设置 ID

        const link = document.createElement('a');
        link.href = `#${id}`; // 链接到对应的标题
        link.textContent = heading.textContent; // 设置链接文本

        const listItem = document.createElement('li');
        listItem.appendChild(link);
        toc.appendChild(listItem); // 添加到目录中
    });
}


// 显示默认内容
function showDefaultContent() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <div class="default-message">
            <h2>欢迎来到我的博客</h2>
            <p>这里是充满创意和梦想的天地~请从左侧选择一篇文章开始阅读。</p>
        </div>
    `;
}

// 加载文章列表
async function loadArticleList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // 清空现有内容

    for (const article of BLOG_ARTICLES) {
        const item = document.createElement('div');
        item.className = 'article-item'; // 使用 article-item 类
        item.innerHTML = `
            <h3>${article.title.replace('.md', '')}</h3>
            <span class="article-date">${article.date}</span>
            ${article.tags ? `
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
        `;
        
        // 点击事件加载文章
        item.addEventListener('click', () => {
            loadArticle(article.path); // 使用文章的路径
            highlightActiveItem(item); // 高亮当前选中项
        });
        
        fileList.appendChild(item);
    }
}

// 加载文章内容
async function loadArticle(path) {
    try {
        console.log(`加载文章路径: ${path}`); // 打印路径以进行调试
        const response = await fetch(path);
        if (!response.ok) throw new Error('文章加载失败');
        
        const markdown = await response.text();
        const content = marked.parse(markdown);
        
        document.getElementById('content').innerHTML = content;
        
        // 代码高亮
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });

        // 生成目录
        generateTOC();
        
    } catch (error) {
        console.error('加载文章失败:', error);
        document.getElementById('content').innerHTML = `
            <div class="error-message">
                <h2>⚠️ 文章加载失败</h2>
                <p>请确保文章文件存在且路径正确</p>
                <p>错误信息: ${error.message}</p>
            </div>
        `;
    }
}

// 高亮当前选中项
function highlightActiveItem(activeItem) {
    document.querySelectorAll('.article-item').forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active'); // 添加高亮样式
}

// 搜索文章
function searchArticles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const fileItems = document.querySelectorAll('.article-item');

    fileItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            item.style.display = ''; // 显示匹配的文章
        } else {
            item.style.display = 'none'; // 隐藏不匹配的文章
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    showDefaultContent(); // 显示默认内容
    loadArticleList(); // 加载文章列表

    // 绑定搜索事件
    document.getElementById('searchInput').addEventListener('input', searchArticles);

});

const themeToggle = document.getElementById('themeToggle');

// 检查本地存储中的主题设置并应用
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'dark-theme';
}

// 主题切换事件监听器
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});

