// 樱花飘落效果
function createCherryBlossom() {
    const blossom = document.createElement('div');
    blossom.classList.add('cherry-blossom-petal');
    
    // 随机大小
    const size = Math.random() * 10 + 10;
    blossom.style.width = `${size}px`;
    blossom.style.height = `${size}px`;
    
    // 随机起始位置
    blossom.style.left = Math.random() * window.innerWidth + 'px';
    
    // 随机动画时长
    blossom.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    // 随机色调变化
    const hue = Math.random() * 30 - 15; // -15 到 15 的随机值
    blossom.style.filter = `hue-rotate(${hue}deg)`;
    
    document.querySelector('.cherry-blossom').appendChild(blossom);
    
    // 动画结束后移除元素
    setTimeout(() => {
        blossom.remove();
    }, 5000);
}

// 控制樱花生成频率
let isCreatingBlossoms = true;
const createBlossoms = () => {
    if (isCreatingBlossoms) {
        createCherryBlossom();
        setTimeout(createBlossoms, 300);
    }
};

// 开始生成樱花
createBlossoms();

// 性能优化：当页面不可见时停止生成樱花
document.addEventListener('visibilitychange', () => {
    isCreatingBlossoms = !document.hidden;
    if (isCreatingBlossoms) {
        createBlossoms();
    }
});

// 当窗口大小改变时，清除现有樱花并重新开始
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.querySelector('.cherry-blossom').innerHTML = '';
        if (isCreatingBlossoms) {
            createBlossoms();
        }
    }, 300);
});

// 添加滚动时导航栏效果
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.5)';
        header.style.boxShadow = 'none';
    }
});

// 主题切换逻辑
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
