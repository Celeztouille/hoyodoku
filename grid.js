document.addEventListener('DOMContentLoaded', () => {

    const gridElement = document.getElementById('grid');
    const inputField = document.getElementById('input-field');
    const globalInput = document.getElementById('global-input');
    const suggestionsList = document.getElementById('suggestions-list');

    const totalCells = 9;
    let selectedCell = null;
    let allCharacters = [];

    let highlightedSuggestion = null;

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

        for (let i=0; i<totalCells; i++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;

            const textSpan = document.createElement('span');
            textSpan.classList.add('cell-text');
            textSpan.textContent = "";

            cell.appendChild(textSpan);

            cell.addEventListener('click', () => {
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
                globalInput.focus();
                hideSuggestions();

            });

            gridElement.appendChild(cell);
        }
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
        if (!selectedCell) return;

        const textSpan = selectedCell.querySelector('.cell-text');
        textSpan.textContent = characterName;
        selectedCell.classList.add('filled');

        globalInput.value = '';
        hideSuggestions();

        selectedCell.classList.remove('selected');
        selectedCell = null;
        inputField.classList.remove('active');
    }

    globalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (highlightedSuggestion) {
                fillCell(highlightedSuggestion.textContent);
                return;
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-area')) {
            hideSuggestions();
        }
    });

    loadCharacters();
});