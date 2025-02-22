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