// 初始化 Masonry
let msnry;
const grid = document.querySelector('.gallery-grid');

function initMasonry() {
    msnry = new Masonry(grid, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        gutter: 20,
        fitWidth: true,
        transitionDuration: '0.3s'
    });
}

function loadGalleryImages() {
    GALLERY_IMAGES.forEach(imagePath => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = '画廊图片';

        item.appendChild(img);
        grid.appendChild(item);
    });

    // 等待所有图片加载完成后初始化 Masonry
    imagesLoaded(grid).on('done', function() {
        initMasonry();
    });

    // 为每个图片添加点击事件
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            openModal(img.src);
        });
    });
}

// 模态框功能
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close');

function openModal(imagePath) {
    modal.style.display = 'flex';
    modalImg.src = imagePath;
}

closeBtn.onclick = () => modal.style.display = 'none';

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

// 监听窗口大小变化，重新布局
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        msnry.layout();
    }, 200);
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadGalleryImages);


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