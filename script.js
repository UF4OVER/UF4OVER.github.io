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

// 移动端菜单控制
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 切换菜单
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
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
// 检测是否是移动端，移动端时显示menu，隐藏nav-menu，桌面端时显示nav-menu，隐藏menu
if (navigator.userAgent.indexOf('Mobile') > -1) {
    document.querySelector('.menu-toggle').style.display = 'block';
    document.querySelector('.nav-menu').style.display = 'none';
    console.log('移动端');
} else {
    document.querySelector('.menu-toggle').style.display = 'none';
    document.querySelector('.nav-menu').style.display = 'block';
    console.log('桌面端');
}
