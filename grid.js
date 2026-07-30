import { ruleCatalogGenshin, ruleCatalogStarRail, ruleCatalogZenless, generateGridRules } from "./rules.js";

const gridElement = document.getElementById('grid');
const inputField = document.getElementById('input-field');
const globalInput = document.getElementById('global-input');
const suggestionsList = document.getElementById('suggestions-list');
const errorCounterElement = document.getElementById('error-counter');
const lifes = errorCounterElement ? errorCounterElement.querySelectorAll('.life') : [];
const gameOverOverlay = document.getElementById('game-over-overlay');
const restartBtn = document.getElementById('restart-btn');
const showSolutionsBtn = document.getElementById('solutions-btn');
const abandonBtn = document.getElementById('abandon-btn');
const abandonConfirmOverlay = document.getElementById('abandon-confirm-overlay');
const confirmAbandonYes = document.getElementById('confirm-abandon-yes');
const confirmAbandonNo = document.getElementById('confirm-abandon-no');
const solutionsPanel = document.getElementById('solutions-panel');
const solutionsListContainer = document.getElementById('solutions-list-container'); 
const retryBtn = document.getElementById('retry-btn');
const victoryDisplay = document.getElementById('victory-display');

let currentGameKey = 'genshin'

const totalCells = 9;
let selectedCell = null;
let allCharacters = [];

let currentRowRules = [];
let currentColRules = [];
let ruleCatalog = [];

let highlightedSuggestion = null;

let errorCount = 0;
const maxErrors = 3;
let isGameOver = false;
let isCorrectionMode = false;

export async function loadGame(gameKey, fromRetry = false) {
    console.log(`Chargement du jeu : ${gameKey}`);
    currentGameKey = gameKey;

    if (!fromRetry) allCharacters = [];
    currentRowRules = [];
    currentColRules = [];
    errorCount = 0;
    isGameOver = false;
    isCorrectionMode = false;
    selectedCell = null;
    
    if (gameOverOverlay) gameOverOverlay.classList.remove('active');
    if (solutionsPanel) solutionsPanel.classList.remove('active');
    document.body.classList.remove('correction-mode', 'victory-mode');
    updateErrorCounter();
    
    let charactersPath = '';
    let rulesData = null;

    if (gameKey === 'genshin') {
        charactersPath = 'charactersGenshin.json';
        rulesData = ruleCatalogGenshin; 
    } 
    else if (gameKey === 'starrail') {
        charactersPath = 'charactersStarRail.json';
        rulesData = ruleCatalogStarRail;
    }
    else if (gameKey === 'zenless') {
        charactersPath = 'charactersZenless.json';
        rulesData = ruleCatalogZenless;
    }

    try {

        if (!fromRetry)
        {
            console.log("Tentative de chargement du chemin :", charactersPath);
            const response = await fetch(charactersPath);
            if (!response.ok) throw new Error("Erreur chargement JSON");
            allCharacters = await response.json();
        }

        ruleCatalog = rulesData;

        if (allCharacters.length > 0 && generateGridRules) {
            const { rowRules, colRules } = generateGridRules(rulesData, allCharacters);
            currentRowRules = rowRules;
            currentColRules = colRules;
            
            createGrid(); 
            console.log("Jeu chargé avec succès !");
        } else {
            console.error("Pas de personnages ou de règles générées.");
            alert("Erreur: Données insuffisantes pour générer une grille.");
        }

    } catch (error) {
        console.error("Erreur critique lors du chargement :", error);
        alert("Impossible de charger le jeu. Vérifie la console.");
    }

    window.loadGame = loadGame; 
}
window.loadGame = loadGame;


function createGrid()
{
    gridElement.innerHTML = '';
    
    errorCount = 0;
    updateErrorCounter();


    if (!currentRowRules || !currentColRules) {
        console.error("Erreur: createGrid appelé sans règles générées !");
        return;
    }

    const corner = document.createElement('div');
    corner.classList.add('cell', 'corner-cell');

    let cornerImgSrc = '';
    
    if (currentGameKey === 'genshin') {
        cornerImgSrc = 'img/genshin/paimon.png'; 
    } else if (currentGameKey === 'starrail') {
        cornerImgSrc = 'img/starrail/pompom.png'; 
    } else if (currentGameKey === 'zenless') {
        cornerImgSrc = 'img/zenless/eous.webp'; 
    }
    
    const img = document.createElement('img');
    img.src = cornerImgSrc;
    img.style.width = '80%';
    img.style.height = '80%';
    img.style.objectFit = 'contain';
    img.style.pointerEvents = 'none';
    
    corner.appendChild(img);

    gridElement.appendChild(corner);

    currentColRules.forEach((rule, index) => {
        const header = createHeaderCell(rule, 'col', index);
        gridElement.appendChild(header);
    });

    for (let r=0; r<3; r++)
    {
        const rowHeader = createHeaderCell(currentRowRules[r], 'row', r);
        gridElement.appendChild(rowHeader);

        for (let c=0; c<3; c++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'game-cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.rowRuleId = currentRowRules[r].id;
            cell.dataset.colRuleId = currentColRules[c].id;

            const validCharacters = allCharacters.filter(char =>
                currentRowRules[r].test(char) && currentColRules[c].test(char)
            );

            const countSpan = document.createElement('span');
            countSpan.classList.add('cell-count');

            if (validCharacters.length === 0)
            {
                countSpan.textContent = "0 réponses possibles";
                countSpan.style.color = "#e74c3c";
            }
            else if (validCharacters.length === 1)
            {
                countSpan.textContent = "1 réponse possible";
                countSpan.style.color = "#e67e22";
            }
            else 
            {
                countSpan.textContent = `${validCharacters.length} réponses possibles`;
            }
            cell.appendChild(countSpan);

            const textSpan = document.createElement('span');
            textSpan.classList.add('cell-text');
            textSpan.textContent = "";
            
            cell.appendChild(textSpan);

            cell.addEventListener('click', () => handleCellClick(cell));
            gridElement.appendChild(cell);
        }
    }


    gridElement.addEventListener('mouseover', (e) => {
        if (!isCorrectionMode) return;

        const cell = e.target.closest('.game-cell');
        const header = e.target.closest('.header-cell');

        if (header) {
            solutionsPanel.classList.remove('active');
        } else if (cell) {
            solutionsPanel.classList.add('active');
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            showSolutionsForCell(r, c, currentRowRules[r], currentColRules[c]);
        } 
    });
    
    gridElement.addEventListener('mouseleave', () => {
        if (!isCorrectionMode) return;

        solutionsPanel.classList.remove('active');
    });
}

function createHeaderCell(rule, type, index) {

    const header = document.createElement('div');
    header.classList.add('cell', 'header-cell');
    header.dataset.type = type;
    header.dataset.index = index;

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('header-content');

    if (rule.image) {
        const img = document.createElement('img');
        img.src = rule.image;
        img.alt = rule.text;
        img.classList.add('header-icon');
        img.style.pointerEvents = 'none'; 
        
        contentContainer.appendChild(img);
    }

    const textDiv = document.createElement('div');
    textDiv.classList.add('header-text');
    textDiv.textContent = rule.text;
    textDiv.style.pointerEvents = 'none';

    if (rule.hint.trim())
    {
        const helpIconContainer = document.createElement('div');
        helpIconContainer.classList.add('hint-icon-container');

        const helpIcon = document.createElement('span');
        helpIcon.classList.add('hint-icon');
        helpIcon.textContent = '?';

        const tooltip = document.createElement('div');
        tooltip.classList.add('hint-tooltip');
        tooltip.textContent = rule.hint;

        helpIcon.appendChild(tooltip);
        helpIconContainer.appendChild(helpIcon);
        header.appendChild(helpIconContainer);
    }
    
    contentContainer.appendChild(textDiv);
    header.appendChild(contentContainer);

    header.addEventListener('click', () => {
        if (selectedCell) {
            selectedCell.classList.remove('selected');
            selectedCell = null;
            inputField.classList.remove('active');
        }
    });

    return header;
}

function handleCellClick(cell)
{
    if (isGameOver) return; 

    if (selectedCell === cell) {
        selectedCell.classList.remove('selected');
        selectedCell = null;
        inputField.classList.remove('active');
        return;
    }
    
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }

    selectedCell = cell;
    selectedCell.classList.add('selected');
    inputField.classList.add('active');

    globalInput.value = '';
    hideSuggestions();

    setTimeout(() => {
        globalInput.removeAttribute('disabled'); 
        globalInput.focus();

        if (document.activeElement !== globalInput) {
            globalInput.focus();
        }
    }, 50);
}

globalInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length >= 3 && selectedCell)
    {
        showSuggestions(query)
    }
    else
    {
        hideSuggestions();
    }
})

function showSuggestions(query) 
{
    suggestionsList.innerHTML = '';
    highlightedSuggestion = null;

    const matches = allCharacters.filter(char => char.name.toLowerCase().includes(query));

    if (matches.length > 0)
    {
        matches.forEach(char => {
            const li  = document.createElement('li');
            li.style.display = 'flex';
            li.style.flexDirection = 'column';
            li.style.alignItems = 'center';
            li.style.justifyContent = 'center'
            li.style.padding = '8px';
            li.style.maxWidth = '90px';

            const img = document.createElement('img');
            img.src = char.image;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            img.style.marginBottom = '10px';
            img.style.pointerEvents = 'none';

            const span = document.createElement('span');
            span.textContent = char.name;
            span.style.fontSize = '0.8rem';
            span.style.textAlign = 'center';
            span.style.whiteSpace = 'normal';
            span.style.fontWeight = 'lighter';
            span.style.lineHeight = '1.1';
            span.style.pointerEvents = 'none';
            span.style.width = '100%';
            span.style.overflow = 'visible';
            span.style.textOverflow = 'clip';
            span.style.whiteSpace = 'normal';

            li.appendChild(img);
            li.appendChild(span);

            li.addEventListener('mouseenter', () => {
                if (highlightedSuggestion) {
                    highlightedSuggestion.classList.remove('highlighted');
                }
                highlightedSuggestion = li;
                li.classList.add('highlighted');
            });

            li.addEventListener('mouseleave', () => {
                if (highlightedSuggestion === li) {
                    li.classList.remove('highlighted');
                    highlightedSuggestion = null;
                }
            })

            li.addEventListener('click', () => {
                fillCell(char.name);
            });

            suggestionsList.appendChild(li);
        });
        suggestionsList.classList.add('active');
    }
    else 
    {
        hideSuggestions();
    }
}

function hideSuggestions()
{
    suggestionsList.classList.remove('active');
    suggestionsList.innerHTML = '';
    highlightedSuggestion = null;
}

function fillCell(characterName)
{
    if (isGameOver || !selectedCell) return;

    const currentCell = selectedCell;
    const rowRuleId = currentCell.dataset.rowRuleId;
    const colRuleId = currentCell.dataset.colRuleId;

    const rowRule = ruleCatalog.find(r => r.id === rowRuleId);
    const colRule = ruleCatalog.find(r => r.id === colRuleId);

    let clearingDetected = false;

    if (!rowRule || !colRule) {
        console.error("Règles introuvables")
        return;
    }

    if (characterName)
    {
        const character = allCharacters.find(char => char.name === characterName);
        let isValid = false;
        if (character)
        {
            isValid = rowRule.test(character) && colRule.test(character);
        }

        if (!isValid)
        {
            currentCell.classList.remove('error');
            void currentCell.offsetWidth; // pour recalc le css
            currentCell.classList.add('error');
            
            if (errorCount < maxErrors)
            {
                errorCount++;
                updateErrorCounter();
            }

            globalInput.value = '';
            hideSuggestions();
            globalInput.focus();
            return;
        }

        currentCell.classList.remove('error');
        const allCells = document.querySelectorAll('.game-cell');

        for (const cell of allCells) {

            if (cell === selectedCell) continue;

            const textSpan = cell.querySelector('.cell-text');

            if (textSpan.textContent === characterName) {
                
                cell.classList.add('clearing');
                clearingDetected = true;

                setTimeout(() => {
                    textSpan.textContent = "";
                    cell.classList.remove('filled');
                    cell.classList.remove('clearing');
                }, 300);
            }
        }
    }

    setTimeout(() => {
        const cellSpan = currentCell.querySelector('.cell-text');
        
        if (characterName)
        {
            const character = allCharacters.find(char => char.name === characterName);

            cellSpan.textContent = ""; 
            cellSpan.innerHTML = ""; 
            cellSpan.style.display = 'flex'; 
            cellSpan.style.flexDirection = 'column';
            cellSpan.style.alignItems = 'center';
            cellSpan.style.justifyContent = 'center';
            cellSpan.style.gap = '8px';
            cellSpan.style.height = '100%';
            cellSpan.style.width = '100%';

            const charImg = document.createElement('img');
            charImg.src = character.image
            charImg.style.width = '100px';  
            charImg.style.height = '100px';
            charImg.style.objectFit = 'cover';
            charImg.alt = characterName;

            const nameSpan = document.createElement('span');
            nameSpan.textContent = characterName;
            nameSpan.style.fontSize = '0.9rem';
            nameSpan.style.fontWeight = 'lighter';
            nameSpan.style.color = '#333';
            nameSpan.style.textAlign = 'center';
            nameSpan.style.lineHeight = '1.1';
            nameSpan.style.overflow = 'visible';
            nameSpan.style.textOverflow = 'clip';
            nameSpan.style.whiteSpace = 'normal';
            nameSpan.style.width = '100%';

            cellSpan.appendChild(charImg);
            cellSpan.appendChild(nameSpan);

            currentCell.classList.add('filled');
            currentCell.style.transform = "scale(1.1)";
            currentCell.style.transition = "transform 0.2s ease-in";
            setTimeout(() => {
                currentCell.style.transform = "";
                currentCell.style.transition = "transform 0.2s ease-in";
                currentCell.classList.remove('selected');
                selectedCell = null;
                if (!clearingDetected) checkWinCondition();
            }, 200);
        }
        else 
        {
            cellSpan.textContent = "";
            cellSpan.style.display = 'flex';
            cellSpan.style.flexDirection = 'column';
            cellSpan.style.alignItems = 'center';
            cellSpan.style.justifyContent = 'center';
            currentCell.classList.remove('filled');
            currentCell.classList.remove('selected');
            currentCell.classList.remove('error');
            selectedCell = null;
        }
    }, 50);

    globalInput.value = '';
    hideSuggestions(); 
    inputField.classList.remove('active'); 
}

function updateErrorCounter() {
    lifes.forEach((life, index) => {
        
        if (index < errorCount) {
            life.classList.add('lost');
        } else {
            life.classList.remove('lost');
        }
    });

    if (errorCount >= maxErrors) {
        isGameOver = true;
        showGameOver();
    }
}

function showGameOver() {

    gameOverOverlay.classList.add('active');
    
    if (selectedCell) {
        selectedCell.classList.remove('selected', 'error');
        selectedCell = null;
        inputField.classList.remove('active');
    }
}

function restartGame() {
    errorCount = 0;
    isGameOver = false;
    selectedCell = null;
    updateErrorCounter();
    gameOverOverlay.classList.remove('active');
    loadGame(currentGameKey, true);
}

function startCorrectionMode() {
    isCorrectionMode = true;
    gameOverOverlay.classList.remove('active');
    document.body.classList.add('correction-mode');
    solutionsPanel.classList.add('active');
}

function showSolutionsForCell(row, col, rowRule, colRule) 
{
    const contentDiv = document.getElementById('solutions-content');
    
    const validChars = allCharacters.filter(char => rowRule.test(char) && colRule.test(char));

    let html = `<div class="solutions-grid-container">`;


    if (validChars.length === 0) 
    {
        html += `
            <div class="solution-empty">
                <p style="color:red; font-weight:bold; margin:0;">Aucune solution possible !</p>
                <p style="font-size:0.8rem; color:#666; margin-top:5px;">Vérifiez les contraintes.</p>
            </div>
        `;
    } 
    else 
    {
        for (let i = 0; i < validChars.length; i++) 
        {
            const char = validChars[i];
            const imgSrc = char.image;

            html += `
                <div class="solution-card">
                    <img src="${imgSrc}" alt="${char.name}" class="solution-card-img">
                    <span class="solution-card-name">${char.name}</span>
                </div>
            `;
        }
    }

    html += `</div>`;
    contentDiv.innerHTML = html;
}

function checkWinCondition() {
    const filledCells = document.querySelectorAll('.game-cell.filled');
    
    if (filledCells.length === 9) {

        const errorCells = document.querySelectorAll('.game-cell.error');
        if (errorCells.length === 0) {

            isGameOver = true; 
            isCorrectionMode = true;

            setTimeout(() => {
                victoryDisplay.classList.remove('active');
                void victoryDisplay.offsetWidth;  // refresh le css
                victoryDisplay.classList.add('active');
                document.body.classList.add('victory-mode');
                document.body.classList.add('correction-mode');
            }, 300);
        }
    }
}

restartBtn.addEventListener('click', restartGame);

showSolutionsBtn.addEventListener('click', () => {
    startCorrectionMode();
});

abandonBtn.addEventListener('click', () => {
    if (isGameOver) return;
    abandonConfirmOverlay.classList.add('active');
});

confirmAbandonNo.addEventListener('click', () => {
    abandonConfirmOverlay.classList.remove('active');
});

confirmAbandonYes.addEventListener('click', () => {
    
    abandonConfirmOverlay.classList.remove('active');
    isGameOver = true;

    setTimeout(() => {
        startCorrectionMode();
    }, 50);
});

retryBtn.addEventListener('click', () => {
    
    isCorrectionMode = false;
    isGameOver = false;
    document.body.classList.remove('correction-mode');
    document.body.classList.remove('victory-mode');

    solutionsPanel.classList.remove('active');
    victoryDisplay.classList.remove('active');
    
    restartGame();
});

document.addEventListener('click', (e) => {

    if (!selectedCell) return;

    const grid = document.getElementById('grid');
    const inputField = document.querySelector('.input-field');
    const headers = document.querySelectorAll('.header-cell');

    const clickedInsideGrid = grid && grid.contains(e.target);
    const clickedInsideInput = inputField && inputField.contains(e.target);
    
    let clickedOnHeader = false;
    headers.forEach(header => {
        if (header.contains(e.target)) clickedOnHeader = true;
    });

    if (!clickedInsideGrid && !clickedInsideInput && !clickedOnHeader) {
        selectedCell.classList.remove('selected');
        selectedCell = null;
        inputField.classList.remove('active');
        hideSuggestions();
    }
});