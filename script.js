
// 添加菜单切换按钮选择器（放在代码最顶部）
const menuToggle = document.querySelector('#menuToggle'); // 根据实际HTML结构调整选择器

function createCherryBlossom() {
    const blossom = document.createElement('div');
    blossom.classList.add('cherry-blossom-petal');
    blossom.style.left = Math.random() * window.innerWidth + 'px';
    blossom.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.cherry-blossom').appendChild(blossom);
    
    setTimeout(() => {
        blossom.remove();
    }, 5000);
}

setInterval(createCherryBlossom, 300);

// 修改菜单切换逻辑
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    menuToggle.style.background = isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.9)';
    menuToggle.textContent = isActive ? '×' : '☰';
});

// 添加菜单项点击处理
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
        menuToggle.style.background = 'rgba(255,255,255,0.9)';
    });
});

