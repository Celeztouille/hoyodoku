import { ruleCatalog, generateGridRules } from "./rules.js";

document.addEventListener('DOMContentLoaded', () => {

    const gridElement = document.getElementById('grid');
    const inputField = document.getElementById('input-field');
    const globalInput = document.getElementById('global-input');
    const suggestionsList = document.getElementById('suggestions-list');
    const errorCounterElement = document.getElementById('error-counter');
    const lifes = errorCounterElement ? errorCounterElement.querySelectorAll('.life') : [];
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const restartBtn = document.getElementById('restart-btn');
    const showSolutionsBtn = document.getElementById('solutions-btn');
    const solutionsPanel = document.getElementById('solutions-panel');
    const solutionsListContainer = document.getElementById('solutions-list-container'); 

    
    const totalCells = 9;
    let selectedCell = null;
    let allCharacters = [];

    let currentRowRules = [];
    let currentColRules = [];

    let highlightedSuggestion = null;

    let errorCount = 0;
    const maxErrors = 3;
    let isGameOver = false;
    let isCorrectionMode = false;

    async function loadCharacters() 
    {
        try 
        {
            const response = await fetch('characters.json');
            if (!response.ok) {
                throw new Error("Erreur au chargement des personnages")
            }
            allCharacters = await response.json();
            
            createGrid();
        }
        catch (error) {
            console.error("Erreur : ", error);
        }
    }

    
    function createGrid()
    {
        gridElement.innerHTML = '';
        
        errorCount = 0;
        updateErrorCounter();


        const { rowRules, colRules } = generateGridRules(allCharacters);
        currentRowRules = rowRules; 
        currentColRules = colRules;

        const corner = document.createElement('div');
        corner.classList.add('cell', 'corner-cell');
        gridElement.appendChild(corner);

        colRules.forEach((rule, index) => {
            const header = createHeaderCell(rule, 'col', index);
            gridElement.appendChild(header);
        });

        for (let r=0; r<3; r++)
        {
            const rowHeader = createHeaderCell(rowRules[r], 'row', r);
            gridElement.appendChild(rowHeader);

            for (let c=0; c<3; c++)
            {
                const cell = document.createElement('div');
                cell.classList.add('cell', 'game-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.dataset.rowRuleId = rowRules[r].id;
                cell.dataset.colRuleId = colRules[c].id;

                const validCharacters = allCharacters.filter(char =>
                    rowRules[r].test(char) && colRules[c].test(char)
                );

                const countSpan = document.createElement('span');
                countSpan.classList.add('cell-count');

                if (validCharacters.length === 0)
                {
                    countSpan.textContent = "0 réponses possibles";
                    countSpan.style.color = "#e74c3c";
                    countSpan.style.fontStyle = "italic";
                }
                else if (validCharacters.length === 1)
                {
                    countSpan.textContent = "1 réponse possible";
                    countSpan.style.color = "#e67e22";
                    countSpan.style.fontStyle = "italic";
                }
                else 
                {
                    countSpan.textContent = `${validCharacters.length} réponses possibles`;
                    countSpan.style.fontStyle = "italic";
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

        gridElement.addEventListener('mouseleave', () => {
            if (isCorrectionMode) {
                solutionsPanel.classList.remove('active');
            }
        });

        gridElement.addEventListener('mouseover', (e) => {
            if (!isCorrectionMode) return;

            const headerCell = e.target.closest('header-cell');
            if (headerCell)
            {
                solutionsPanel.classList.remove('active');
                return;
            }

            const cell = e.target.closest('.game-cell');

            if (cell) {
                solutionsPanel.classList.add('active');
                
                const r = parseInt(cell.dataset.row);
                const c = parseInt(cell.dataset.col);
                showSolutionsForCell(r, c, rowRules[r], colRules[c]);
            }
        });
    }

    function createHeaderCell(rule, type, index) {

        const header = document.createElement('div');
        header.classList.add('cell', 'header-cell');
        header.dataset.type = type;
        header.dataset.index = index;

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
        
        header.appendChild(textDiv);

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
            globalInput.focus();
        }, 10);
    }

    globalInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length >= 2 && selectedCell)
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
                const li  = document.createElement('li')
                li.textContent = char.name;

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

                    setTimeout(() => {
                        textSpan.textContent = "";
                        cell.classList.remove('filled');
                        cell.classList.remove('clearing');
                    }, 300);
                }
            }
        }

        setTimeout(() => {
            const textSpan = currentCell.querySelector('.cell-text');
            
            if (characterName)
            {
                textSpan.textContent = characterName;
                currentCell.classList.add('filled');
                currentCell.style.transform = "scale(1.1)";
                currentCell.style.transition = "transform 0.2s ease-in";
                setTimeout(() => {
                    currentCell.style.transform = "";
                    currentCell.style.transition = "transform 0.2s ease-in";
                    currentCell.classList.remove('selected');
                    selectedCell = null;
                }, 200);
            }
            else 
            {
                textSpan.textContent = "";
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
        createGrid();
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

        let html = `
            <div class="solution-item">
                <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">
                <ul>
        `;

        if (validChars.length === 0) 
        {
            html += `<li style="color:red; font-weight:bold;">Aucune solution possible !</li>`;
        } 
        else 
        {
            for (let i = 0; i < validChars.length; i++) 
            {
                html += `<li>${validChars[i].name}</li>`;
            }
        }

        html += `</ul></div>`;
        
        contentDiv.innerHTML = html;
    }

    restartBtn.addEventListener('click', restartGame);

    showSolutionsBtn.addEventListener('click', () => {
        startCorrectionMode();
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

    loadCharacters();
});