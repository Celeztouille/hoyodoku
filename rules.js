const alphabet = "abcdefghijklmnopqrstuvwxyz";

const versionTimeline = [
    "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6",
    "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8",
    "3.0", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7",
    "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8",
    "5.0", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8",
    "Luna I", "Luna II", "Luna III", "Luna IV", "Luna V", "Luna VI", "Luna VII", "Luna VIII"
];

function getVersionIndex(versionString) {
    return versionTimeline.indexOf(versionString);
}

function createRule(id, text, hint, type, testFunction)
{
    return {
        id,
        text,
        hint,
        type,
        test: testFunction
    };
}

const makeIncludeLetterRule = (letter) => ({
    id: `name_has_${letter}`,
    text: `Son nom contient un '${letter.toUpperCase()}'`,
    hint: "",
    type: "include_letter",
    test: (char) => char.name.toLowerCase().includes(letter.toLowerCase())
});

const makeBeginLetterRule = (letter) => ({
    id: `name_begin_${letter}`,
    text: `Son nom commence par un '${letter.toUpperCase()}'`,
    hint: "",
    type: "begin_letter",
    test: (char) => char.name.toLowerCase()[0] === letter
});

const makeEndLetterRule = (letter) => ({
    id: `name_end_${letter}`,
    text: `Son nom termine par un '${letter.toUpperCase()}'`,
    hint: "",
    type: "end_letter",
    test: (char) => char.name.toLowerCase().at(-1) === letter
});


const makeRegionRule = (region) => ({
    id: `region_${region.toLowerCase()}`,
    text: `Vit à ${region}`,
    hint: "Le lieu de vie actuel prime sur l'origine du personnage si les deux diffèrent.",
    type: "region",
    test: (char) => char.region === region
});

const makeElementRule = (element) => ({
    id: `element_${element.toLowerCase()}`,
    text: `Vision ${element}`,
    hint: "",
    type: "element",
    test: (char) => char.element === element
});

const makeWeaponRule = (weapon) => ({
    id: `weapon_${weapon.toLowerCase()}`,
    text: `Arme ${weapon}`,
    hint: "",
    type: "weapon",
    test: (char) => char.weapon === weapon
});

const makeBeforeVersionRule = (targetVersion) => {
    const targetIndex = getVersionIndex(targetVersion);
    
    return {
        id: `before_v${targetVersion.replace('.', '_')}`,
        text: `Sorti en ${targetVersion} ou avant`,
        hint: "",
        type: "version",
        test: (char) => {
            const charIndex = getVersionIndex(char.version);
            if (charIndex === -1) return false; 
            return charIndex <= targetIndex;
        }
    };
};

const makeAfterVersionRule = (targetVersion) => {
    const targetIndex = getVersionIndex(targetVersion);
    
    return {
        id: `after_v${targetVersion.replace('.', '_')}`,
        text: `Sorti en ${targetVersion} ou après`,
        hint: "",
        type: "version",
        test: (char) => {
            const charIndex = getVersionIndex(char.version);
            if (charIndex === -1) return false; 
            return charIndex >= targetIndex;
        }
    };
};

const ruleCatalog = [

    makeRegionRule("Mondstadt"),
    makeRegionRule("Liyue"),
    makeRegionRule("Sumeru"),
    makeRegionRule("Inazuma"),
    makeRegionRule("Fontaine"),
    makeRegionRule("Natlan"),
    makeRegionRule("Nod-Krai"),
    makeRegionRule("Snezhnaya"),

    makeElementRule("Anemo"),
    makeElementRule("Geo"),
    makeElementRule("Electro"),
    makeElementRule("Dendro"),
    makeElementRule("Hydro"),
    makeElementRule("Pyro"),
    makeElementRule("Cryo"),

    makeWeaponRule("Sword"),
    makeWeaponRule("Claymore"),
    makeWeaponRule("Polearm"),
    makeWeaponRule("Bow"),
    makeWeaponRule("Catalyst"),

    makeBeforeVersionRule("1.0"),
    makeBeforeVersionRule("1.1"),
    makeBeforeVersionRule("1.2"),
    makeBeforeVersionRule("1.3"),
    makeBeforeVersionRule("1.4"),
    makeBeforeVersionRule("1.5"),
    makeBeforeVersionRule("1.6"),
    makeBeforeVersionRule("2.0"),
    makeBeforeVersionRule("2.1"),
    makeBeforeVersionRule("2.2"),
    makeBeforeVersionRule("2.3"),
    makeBeforeVersionRule("2.4"),
    makeBeforeVersionRule("2.5"),
    makeBeforeVersionRule("2.6"),
    makeBeforeVersionRule("2.7"),
    makeBeforeVersionRule("2.8"),
    makeBeforeVersionRule("3.0"),
    makeBeforeVersionRule("3.1"),
    makeBeforeVersionRule("3.2"),
    makeBeforeVersionRule("3.3"),
    makeBeforeVersionRule("3.4"),
    makeBeforeVersionRule("3.5"),
    makeBeforeVersionRule("3.6"),
    makeBeforeVersionRule("3.7"),

    
    makeAfterVersionRule("4.0"),
    makeAfterVersionRule("4.1"),
    makeAfterVersionRule("4.2"),
    makeAfterVersionRule("4.3"),
    makeAfterVersionRule("4.4"),
    makeAfterVersionRule("4.5"),
    makeAfterVersionRule("4.6"),
    makeAfterVersionRule("4.7"),
    makeAfterVersionRule("4.8"),
    makeAfterVersionRule("5.0"),
    makeAfterVersionRule("5.1"),
    makeAfterVersionRule("5.2"),
    makeAfterVersionRule("5.3"),
    makeAfterVersionRule("5.4"),
    makeAfterVersionRule("5.5"),
    makeAfterVersionRule("5.6"),
    makeAfterVersionRule("5.7"),
    makeAfterVersionRule("5.8"),
    makeAfterVersionRule("Luna I"),
    makeAfterVersionRule("Luna II"),
    makeAfterVersionRule("Luna III"),
    makeAfterVersionRule("Luna IV"),
    makeAfterVersionRule("Luna V"),
    makeAfterVersionRule("Luna VI"),
    makeAfterVersionRule("Luna VII"),
    makeAfterVersionRule("Luna VIII"),

    makeIncludeLetterRule("a"),
    makeIncludeLetterRule("b"),
    makeIncludeLetterRule("c"),
    makeIncludeLetterRule("d"),
    makeIncludeLetterRule("e"),
    makeIncludeLetterRule("f"),
    makeIncludeLetterRule("g"),
    makeIncludeLetterRule("h"),
    makeIncludeLetterRule("i"),
    makeIncludeLetterRule("j"),
    makeIncludeLetterRule("k"),
    makeIncludeLetterRule("l"),
    makeIncludeLetterRule("m"),
    makeIncludeLetterRule("n"),
    makeIncludeLetterRule("o"),
    makeIncludeLetterRule("p"),
    makeIncludeLetterRule("q"),
    makeIncludeLetterRule("r"),
    makeIncludeLetterRule("s"),
    makeIncludeLetterRule("t"),
    makeIncludeLetterRule("u"),
    makeIncludeLetterRule("v"),
    makeIncludeLetterRule("w"),
    makeIncludeLetterRule("x"),
    makeIncludeLetterRule("y"),
    makeIncludeLetterRule("z"),

    makeBeginLetterRule("a"),
    makeBeginLetterRule("b"),
    makeBeginLetterRule("c"),
    makeBeginLetterRule("d"),
    makeBeginLetterRule("e"),
    makeBeginLetterRule("f"),
    makeBeginLetterRule("g"),
    makeBeginLetterRule("h"),
    makeBeginLetterRule("i"),
    makeBeginLetterRule("j"),
    makeBeginLetterRule("k"),
    makeBeginLetterRule("l"),
    makeBeginLetterRule("m"),
    makeBeginLetterRule("n"),
    makeBeginLetterRule("o"),
    makeBeginLetterRule("p"),
    makeBeginLetterRule("q"),
    makeBeginLetterRule("r"),
    makeBeginLetterRule("s"),
    makeBeginLetterRule("t"),
    makeBeginLetterRule("u"),
    makeBeginLetterRule("v"),
    makeBeginLetterRule("w"),
    makeBeginLetterRule("x"),
    makeBeginLetterRule("y"),
    makeBeginLetterRule("z"),

    makeEndLetterRule("a"),
    makeEndLetterRule("b"),
    makeEndLetterRule("c"),
    makeEndLetterRule("d"),
    makeEndLetterRule("e"),
    makeEndLetterRule("f"),
    makeEndLetterRule("g"),
    makeEndLetterRule("h"),
    makeEndLetterRule("i"),
    makeEndLetterRule("j"),
    makeEndLetterRule("k"),
    makeEndLetterRule("l"),
    makeEndLetterRule("m"),
    makeEndLetterRule("n"),
    makeEndLetterRule("o"),
    makeEndLetterRule("p"),
    makeEndLetterRule("q"),
    makeEndLetterRule("r"),
    makeEndLetterRule("s"),
    makeEndLetterRule("t"),
    makeEndLetterRule("u"),
    makeEndLetterRule("v"),
    makeEndLetterRule("w"),
    makeEndLetterRule("x"),
    makeEndLetterRule("y"),
    makeEndLetterRule("z"),

    {
        id: "rarity_5",
        text: "Personnage 5 Étoiles",
        hint: "",
        type: "rarity",
        test: (char) => char.rarity === 5
    },
    {
        id: "rarity_4",
        text: "Personnage 4 Étoiles",
        hint: "",
        type: "rarity",
        test: (char) => char.rarity === 4
    },

    {
        id: "body_tall_male",
        text: "Homme de grande taille",
        hint: "",
        type: "body",
        test: (char) => char.gender === "Male" && char.bodyType === "Tall"
    },
    {
        id: "body_tall_female",
        text: "Femme de grande taille",
        hint: "",
        type: "body",
        test: (char) => char.gender === "Female" && char.bodyType === "Tall"
    },
    {
        id: "body_medium_male",
        text: "Homme de taille moyenne",
        hint: "",
        type: "body",
        test: (char) => char.gender === "Male" && char.bodyType === "Medium"
    },
    {
        id: "body_medium_female",
        text: "Femme de taille moyenne",
        hint: "",
        type: "body",
        test: (char) => char.gender === "Female" && char.bodyType === "Medium"
    },
    {
        id: "body_short_female",
        text: "Personnage de petite taille",
        hint: "",
        type: "body",
        test: (char) => char.bodyType === "Short"
    },
    
    {
        id: "human_true",
        text: "Est un humain",
        hint: "Personnage humain dont lui et aucun membre de sa famille biologique ne possèdent de traits animaux, ayant une durée de vie naturellement humaine (attention : les personnages ayant des coupes de cheveux ou des accessoires simulant des traits animaux comptent comme humains, idem pour les personnages ayant une durée de vie allongée suite à une malédiction où à un saut temporel).",
        type: "human",
        test: (char) => char.human
    },
    {
        id: "human_false",
        text: "N'est pas un humain",
        hint: "Robot, poupée, divinité ou personnage dont lui ou un membre de sa famille biologique possède des traits animaux ou ayant une durée de vie non-humaine (attention : les personnages ayant des coupes de cheveux ou des accessoires simulant des traits animaux comptent comme humains, idem pour les personnages ayant une durée de vie allongée suite à une malédiction où à un saut temporel).",
        type: "human",
        test: (char) => !char.human
    },
];

function generateGridRules(charactersList)
{
    let attempts = 0;
    const maxAttempts = 500;
    let isValid = false;
    
    let finalRowRules = [];
    let finalColRules = [];

    const rulesByType = {};
    ruleCatalog.forEach(rule => {
        if (!rulesByType[rule.type]) {
            rulesByType[rule.type] = [];
        }
        rulesByType[rule.type].push(rule);
    })

    const availableTypes = Object.keys(rulesByType);

    while (!isValid && attempts < maxAttempts) {
        
        attempts++;

        const rowRules = [];
        const colRules = [];
        const usedTypesForRow = new Set(); 
        const usedTypesForCol = new Set();

        while (colRules.length < 3)
        {
            let typePool = availableTypes;

            const unusedTypes = availableTypes.filter(t => !usedTypesForCol.has(t));
            if (unusedTypes.length > 0) {
                typePool = unusedTypes;
            }

            const randomType = typePool[Math.floor(Math.random() * typePool.length)];
            const rulesOfThisType = rulesByType[randomType];
            const rule = rulesOfThisType[Math.floor(Math.random() * rulesOfThisType.length)];

            if (!colRules.includes(rule))
            {
                colRules.push(rule);
                usedTypesForCol.add(randomType);
            }
        }

        while (rowRules.length < 3)
        {
            let typePool = availableTypes;

            const unusedTypes = availableTypes.filter(t => !usedTypesForRow.has(t) && !usedTypesForCol.has(t));
            if (unusedTypes.length > 0) {
                typePool = unusedTypes;
            }

            const randomType = typePool[Math.floor(Math.random() * typePool.length)];
            const rulesOfThisType = rulesByType[randomType];
            const rule = rulesOfThisType[Math.floor(Math.random() * rulesOfThisType.length)];

            if (!rowRules.includes(rule))
            {
                rowRules.push(rule);
                usedTypesForRow.add(randomType);
            }
        }

        let basicCheck = true;
        const gridPossibilities = [];

        for (let r = 0; r < 3; r++) {
            const rowOptions = [];
            for (let c = 0; c < 3; c++) {
                const candidates = charactersList.filter(char => rowRules[r].test(char) && colRules[c].test(char));
                if (candidates.length === 0 || candidates.length > 20) {
                    basicCheck = false;
                    break;
                }
                rowOptions.push(candidates);
            }
            if (!basicCheck) break;
            gridPossibilities.push(rowOptions);
        }

        if (!basicCheck) continue;

        const solution = solveGrid(gridPossibilities);

        if (solution) {
            isValid = true;
            finalRowRules = rowRules;
            finalColRules = colRules;
            console.log(`Grille générée avec succès après ${attempts} tentative(s).`);
        }
    }

    if (!isValid) {
        console.error("Échec : Impossible de générer une grille valide après 1000 essais.");
        // Pour l'instant, on retourne ce qu'on a pour ne pas crasher
        return { rowRules: finalRowRules.length ? finalRowRules : rowRules, colRules: finalColRules.length ? finalColRules : colRules };
    }

    return { rowRules: finalRowRules, colRules: finalColRules };
}

function solveGrid(grid)
{
    const usedIds = new Set();
    const solutionGrid = Array(3).fill(null).map(() => Array(3).fill(null));

    function backtrack(r, c)
    {
        if (r === 3) return true;

        const nextR = c === 2 ? r+1 : r;
        const nextC = c === 2 ? 0 : c+1;
        const candidates = grid[r][c];

        for (const char of candidates)
        {
            if (!usedIds.has(char.name)) {
                usedIds.add(char.name);
                solutionGrid[r][c] = char;

                if (backtrack(nextR, nextC)) return true;
                
                usedIds.delete(char.name);
                solutionGrid[r][c] = null;
            }
        }
        return false;
    }

    if (backtrack(0, 0)) {
        return solutionGrid;
    } else {
        return null;
    }
}

export { ruleCatalog, generateGridRules };