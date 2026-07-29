const alphabet = "abcdefghijklmnopqrstuvwxyz";

const versionTimelineGenshin = [
    "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6",
    "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8",
    "3.0", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7",
    "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8",
    "5.0", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8",
    "Luna I", "Luna II", "Luna III", "Luna IV", "Luna V", "Luna VI", "Luna VII", "Luna VIII"
];

const versionTimelineStarRail = [
    "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6",
    "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7",
    "3.0", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8",
    "4.0", "4.1", "4.2", "4.3", "4.4"
];

function getVersionIndex(versionArray, versionString) {
    return versionArray.indexOf(versionString);
}

const makeIncludeLetterRule = (letter) => ({
    id: `name_has_${letter}`,
    text: `Son nom contient un ${letter.toUpperCase()}`,
    hint: "",
    type: "include_letter",
    test: (char) => char.name.toLowerCase().includes(letter.toLowerCase())
});

const makeBeginLetterRule = (letter) => ({
    id: `name_begin_${letter}`,
    text: `Son nom commence par un ${letter.toUpperCase()}`,
    hint: "",
    type: "begin_letter",
    test: (char) => char.name.toLowerCase()[0] === letter
});

const makeEndLetterRule = (letter) => ({
    id: `name_end_${letter}`,
    text: `Son nom termine par un ${letter.toUpperCase()}`,
    hint: "",
    type: "end_letter",
    test: (char) => char.name.toLowerCase().at(-1) === letter
});


const makeRegionRule = (region) => ({
    id: `region_${region.toLowerCase()}`,
    text: `Vit à ${region}`,
    hint: "Le lieu de vie actuel prime sur l'origine du personnage si les deux diffèrent.",
    type: "region",
    image: `img/genshin/regions/Emblem_${region}.png`, 
    test: (char) => char.region === region
});

const makeElementRule = (element) => ({
    id: `element_${element.toLowerCase()}`,
    text: `Vision ${element}`,
    hint: "",
    type: "element",
    image: `img/genshin/visions/Element_${element}.png`, 
    test: (char) => char.element === element
});

const makeWeaponRule = (weapon) => ({
    id: `weapon_${weapon.toLowerCase()}`,
    text: weapon==='Sword' ? "Utilise une épée" : weapon==='Claymore' ? "Utilise une épée à deux mains" : weapon==='Polearm' ? "Utilise une lance" : weapon==='Bow' ? "Utilise un arc" : "Utilise un catalyseur",
    hint: "",
    type: "weapon",
    image: `img/genshin/weapons/UI_GachaTypeIcon_${weapon}.png`, 
    test: (char) => char.weapon === weapon
});

const makeBeforeVersionRule = (versionTimeline, targetVersion) => {
    const targetIndex = getVersionIndex(versionTimeline, targetVersion);
    
    return {
        id: `before_v${targetVersion.replace('.', '_')}`,
        text: `Sorti en ${targetVersion} ou avant`,
        hint: "",
        type: "version",
        test: (char) => {
            const charIndex = getVersionIndex(versionTimeline, char.version);
            if (charIndex === -1) return false; 
            return charIndex <= targetIndex;
        }
    };
};

const makeAfterVersionRule = (versionTimeline, targetVersion) => {
    const targetIndex = getVersionIndex(versionTimeline, targetVersion);
    
    return {
        id: `after_v${targetVersion.replace('.', '_')}`,
        text: `Sorti en ${targetVersion} ou après`,
        hint: "",
        type: "version",
        test: (char) => {
            const charIndex = getVersionIndex(versionTimeline, char.version);
            if (charIndex === -1) return false; 
            return charIndex >= targetIndex;
        }
    };
};

const ruleCatalogGenshin = [

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

    makeBeforeVersionRule(versionTimelineGenshin, "1.0"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.1"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.2"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.3"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.4"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.5"),
    makeBeforeVersionRule(versionTimelineGenshin, "1.6"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.0"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.1"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.2"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.3"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.4"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.5"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.6"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.7"),
    makeBeforeVersionRule(versionTimelineGenshin, "2.8"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.0"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.1"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.2"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.3"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.4"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.5"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.6"),
    makeBeforeVersionRule(versionTimelineGenshin, "3.7"),

    
    makeAfterVersionRule(versionTimelineGenshin, "4.0"),
    makeAfterVersionRule(versionTimelineGenshin, "4.1"),
    makeAfterVersionRule(versionTimelineGenshin, "4.2"),
    makeAfterVersionRule(versionTimelineGenshin, "4.3"),
    makeAfterVersionRule(versionTimelineGenshin, "4.4"),
    makeAfterVersionRule(versionTimelineGenshin, "4.5"),
    makeAfterVersionRule(versionTimelineGenshin, "4.6"),
    makeAfterVersionRule(versionTimelineGenshin, "4.7"),
    makeAfterVersionRule(versionTimelineGenshin, "4.8"),
    makeAfterVersionRule(versionTimelineGenshin, "5.0"),
    makeAfterVersionRule(versionTimelineGenshin, "5.1"),
    makeAfterVersionRule(versionTimelineGenshin, "5.2"),
    makeAfterVersionRule(versionTimelineGenshin, "5.3"),
    makeAfterVersionRule(versionTimelineGenshin, "5.4"),
    makeAfterVersionRule(versionTimelineGenshin, "5.5"),
    makeAfterVersionRule(versionTimelineGenshin, "5.6"),
    makeAfterVersionRule(versionTimelineGenshin, "5.7"),
    makeAfterVersionRule(versionTimelineGenshin, "5.8"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna I"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna II"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna III"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna IV"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna V"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna VI"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna VII"),
    makeAfterVersionRule(versionTimelineGenshin, "Luna VIII"),

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

const makeWorldRule = (world) => ({
    id: `world_${world.toLowerCase()}`,
    text: `Vit à ${world}`,
    hint: "",//"Le lieu de vie actuel prime sur l'origine du personnage si les deux diffèrent.",
    type: "world",
    //image: `img/genshin/regions/Emblem_${region}.png`, 
    test: (char) => char.world === world
});

const makeElementRuleHSR = (element) => ({
    id: `element_${element.toLowerCase()}`,
    text: `De type ${element}`,
    hint: "",
    type: "element",
    //image: `img/genshin/visions/Element_${element}.png`, 
    test: (char) => char.element === element
});

const makePathRule = (path) => ({
    id: `path_${path.toLowerCase()}`,
    text: `Voie ${path}`,
    hint: "",
    type: "path",
    //image: `img/genshin/weapons/UI_GachaTypeIcon_${weapon}.png`, 
    test: (char) => char.path === path
});

const ruleCatalogStarRail = [

    makeRegionRule("Herta Space Station"),
    makeWorldRule("Belobog"),
    makeWorldRule("Xianzhou"),
    makeRegionRule("Penacony"),
    makeRegionRule("Amphoreus"),
    makeRegionRule("Planarcadia"),

    makeElementRuleHSR("Physical"),
    makeElementRuleHSR("Fire"),
    makeElementRuleHSR("Ice"),
    makeElementRuleHSR("Wind"),
    makeElementRuleHSR("Lightning"),
    makeElementRuleHSR("Quantum"),
    makeElementRuleHSR("Imaginary"),

    makePathRule("Destruction"),
    makePathRule("Hunt"),
    makePathRule("Erudition"),
    makePathRule("Harmony"),
    makePathRule("Nihility"),
    makePathRule("Preservation"),
    makePathRule("Abundance"),
    makePathRule("Remembrance"),
    makePathRule("Elation"),


    makeBeforeVersionRule(versionTimelineStarRail, "1.0"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.1"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.2"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.3"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.4"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.5"),
    makeBeforeVersionRule(versionTimelineStarRail, "1.6"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.0"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.1"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.2"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.3"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.4"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.5"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.6"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.7"),
    makeBeforeVersionRule(versionTimelineStarRail, "2.7"),

    makeAfterVersionRule(versionTimelineStarRail, "3.0"),
    makeAfterVersionRule(versionTimelineStarRail, "3.1"),
    makeAfterVersionRule(versionTimelineStarRail, "3.2"),
    makeAfterVersionRule(versionTimelineStarRail, "3.3"),
    makeAfterVersionRule(versionTimelineStarRail, "3.4"),
    makeAfterVersionRule(versionTimelineStarRail, "3.5"),
    makeAfterVersionRule(versionTimelineStarRail, "3.6"),
    makeAfterVersionRule(versionTimelineStarRail, "3.7"),
    makeAfterVersionRule(versionTimelineStarRail, "3.8"),
    makeAfterVersionRule(versionTimelineStarRail, "4.0"),
    makeAfterVersionRule(versionTimelineStarRail, "4.1"),
    makeAfterVersionRule(versionTimelineStarRail, "4.2"),
    makeAfterVersionRule(versionTimelineStarRail, "4.3"),
    makeAfterVersionRule(versionTimelineStarRail, "4.4"),

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
        id: "human_true",
        text: "Est un humain",
        hint: "",// "Personnage humain dont lui et aucun membre de sa famille biologique ne possèdent de traits animaux, ayant une durée de vie naturellement humaine (attention : les personnages ayant des coupes de cheveux ou des accessoires simulant des traits animaux comptent comme humains, idem pour les personnages ayant une durée de vie allongée suite à une malédiction où à un saut temporel).",
        type: "human",
        test: (char) => char.human
    },
    {
        id: "human_false",
        text: "N'est pas un humain",
        hint: "",//"Robot, poupée, divinité ou personnage dont lui ou un membre de sa famille biologique possède des traits animaux ou ayant une durée de vie non-humaine (attention : les personnages ayant des coupes de cheveux ou des accessoires simulant des traits animaux comptent comme humains, idem pour les personnages ayant une durée de vie allongée suite à une malédiction où à un saut temporel).",
        type: "human",
        test: (char) => !char.human
    },
];

function generateGridRules(ruleCatalog, charactersList)
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
            console.log(`Grille générée avec succès après ${attempts} tentative(s). ${charactersList[0].name}`);
        }
    }

    if (!isValid) {
        console.error("Échec : Impossible de générer une grille valide après 1000 essais.");
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

export { ruleCatalogGenshin, ruleCatalogStarRail, generateGridRules };