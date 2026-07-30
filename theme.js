document.addEventListener('DOMContentLoaded', () => {

    const gameButtons = document.querySelectorAll('.game-btn');
    const gameTitle = document.getElementById('game-title');

    function updateButtonsVisibility(activeBtn) {
        gameButtons.forEach(btn => {
            if (btn === activeBtn) {
                
                btn.style.display = 'none'; 
                btn.classList.remove('active'); 
            } else {
                
                btn.style.display = 'flex';
                btn.classList.remove('active');
            }
        });
    }

    import('./grid.js').then(module => {
    
        const gameConfig = {
            genshin: {
                title: "Genshindoku",
                themeClass: "theme-genshin",
                key: 'genshin'
            },
            starrail: {
                title: "StarRaildoku",
                themeClass: "theme-starrail",
                key: 'starrail'
            },
            zenless: {
                title: "Zenlessdoku",
                themeClass: "theme-zenless",
                key: 'zenless'
            }
        };

        gameButtons.forEach(btn => {
            btn.addEventListener('click', async () => {

                const gameKey = btn.dataset.game;
                const config = gameConfig[gameKey];

                gameButtons.forEach(b => b.classList.remove('active'));
                
                btn.classList.add('active');

                if (config && typeof window.loadGame === 'function') {
                    gameTitle.textContent = config.title;
                    document.body.classList.remove('theme-genshin', 'theme-starrail', 'theme-zenless');
                    document.body.classList.add(config.themeClass);

                    updateButtonsVisibility(btn);

                    await window.loadGame(config.key)
                    
                    console.log(`Changement vers : ${config.title}`);
                }
            });
        });

        const initialActiveBtn = document.querySelector('.game-btn.active');
        if (initialActiveBtn && typeof window.loadGame === 'function') {
            const gameKey = initialActiveBtn.dataset.game;
            const config = gameConfig[gameKey];

            window.loadGame(config.key);
            updateButtonsVisibility(initialActiveBtn);
        }
    });
});