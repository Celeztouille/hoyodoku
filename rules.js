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

const versionTimelineZenless = [
    "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7",
    "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8",
    "3.0", "3.1"
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
    hint: "Si la région d'origine est différente de la région de sa principale résidence, c'est la deuxième option qui compte (L'Hexenzirkel est considéré comme faisant partie de Mondstadt).",
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
        hint: "Ne sont pas considérés comme humains:\n• Les personnages possédant des traits animaux.\n• Les personnages ayant un membre de leur famille biologique possédant des traits animaux.\n• Les androides, yôkai, poupées et divinités.\n• Les non-natifs de Teyvat.\n• Les personnages à longue durée de vie, si ce n'est pas dû à une malédiction ou un saut temporel.\n(Les personnages humains ayant des coupes de cheveux ou accessoires simulant des traits animaux comptent comme humains.)",
        type: "human",
        test: (char) => char.human
    },
    {
        id: "human_false",
        text: "N'est pas un humain",
        hint: "Ne sont pas considérés comme humains:\n• Les personnages possédant des traits animaux.\n• Les personnages ayant un membre de leur famille biologique possédant des traits animaux.\n• Les androides, yôkai, poupées et divinités.\n• Les non-natifs de Teyvat.\n• Les personnages à longue durée de vie, si ce n'est pas dû à une malédiction ou un saut temporel.\n(Les personnages humains ayant des coupes de cheveux ou accessoires simulant des traits animaux comptent comme humains.)",
        type: "human",
        test: (char) => !char.human
    },
];

const makeWorldRule = (world) => ({
    id: `world_${world.toLowerCase()}`,
    text: `Vit à ${world}`,
    hint: "",
    type: "world",
    image: `img/starrail/worlds/Icon_${world.replaceAll(' ', '_')}.webp`, 
    test: (char) => char.world === world
});

const makeElementRuleHSR = (element) => ({
    id: `element_${element.toLowerCase()}`,
    text: `De type ${element}`,
    hint: "",
    type: "element",
    image: `img/starrail/elements/Type_${element}.webp`, 
    test: (char) => char.element === element
});

const makePathRule = (path) => ({
    id: `path_${path.toLowerCase()}`,
    text: `Voie ${path}`,
    hint: "",
    type: "path",
    image: `img/starrail/paths/Path_${path}.webp`, 
    test: (char) => char.path === path
});

const makecwCostRule = (cwCost) => ({
    id: `cwCost_${cwCost}`,
    text: `Coûte ${cwCost} en Currency War`,
    hint: "",
    type: "cwCost",
    test: (char) => char.cwcost === cwCost
})

const makecwCostDoubleRule = (cwCost1, cwCost2) => ({
    id: `cwCostDouble_${cwCost1}${cwCost2}`,
    text: `Coûte ${cwCost1} ou ${cwCost2} en Currency War`,
    hint: "",
    type: "cwCost",
    test: (char) => char.cwcost === cwCost1 || char.cwcost === cwCost2 
})

const makecwBondsRule = (bond) => ({
    id: `cwBond_${bond.replaceAll(' ', '')}`,
    text: `De la synergie ${bond} (Currency War)`,
    hint: "",
    type: "cwBond",
    test: (char) => char.cwbonds.includes(bond)
})

const ruleCatalogStarRail = [

    makeWorldRule("Herta Space Station"),
    makeWorldRule("Belobog"),
    makeWorldRule("Xianzhou"),
    makeWorldRule("Penacony"),
    makeWorldRule("Amphoreus"),
    makeWorldRule("Planarcadia"),

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

    makecwCostRule(1),
    makecwCostRule(2),
    makecwCostRule(3),
    makecwCostRule(4),
    makecwCostRule(5),
    
    makecwCostDoubleRule(1, 2),
    makecwCostDoubleRule(2, 3),
    makecwCostDoubleRule(3, 4),
    makecwCostDoubleRule(4, 5),

    makecwBondsRule('Xianzhou'),
    makecwBondsRule('Wolf Hunt'),
    makecwBondsRule('Night Demigod'),
    makecwBondsRule('Day Demigod'),
    makecwBondsRule('Express Cohort'),
    makecwBondsRule('Cosmic Scholar'),
    makecwBondsRule('Galactic Voyager'),
    makecwBondsRule('The Planet of Festivities'),
    makecwBondsRule('Stellaron Hunters'),
    makecwBondsRule('Break'),
    makecwBondsRule('Follow-Up ATK'),
    makecwBondsRule('Energy'),
    makecwBondsRule('AoE ATK'),
    makecwBondsRule('Bloodflame'),

    {
        id: "cwBond_None",
        text: "Non inclus dans Currency War",
        hint: "",
        type: "cwBond",
        test: (char) => char.cwcost === 0
    },

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
        id: "gender_male",
        text: "Homme",
        hint: "",
        type: "human",
        test: (char) => char.gender === "Male"
    },
    {
        id: "gender_female",
        text: "Femme",
        hint: "",
        type: "human",
        test: (char) => char.gender === "Female"
    },
    
    {
        id: "human_true",
        text: "Est un humain",
        hint: "Sont considérés comme humains :\n• Les personnages explicitements humains (qu'ils soient génétiquement modifiés ou non).\n• Les natifs de Xianzhou non Foxiens et non Vidyadhariens (quelque soit leur durée de vie).\n• Les Avginiens.\n• Les personnages dont l'espèce n'est pas précisée.",
        type: "human",
        test: (char) => char.human
    },
    {
        id: "human_false",
        text: "N'est pas un humain",
        hint: "Sont considérés comme non-humains :\n• Les Foxiens, Vidyadhariens, Onis, Haloviens, Imagenae, Servants.\n• Les poupées et entités mémorielles ou virtuelles.\n(Les personnages qui étaient humains mais qui ne le sont plus comptent comme non-humains.)",
        type: "human",
        test: (char) => !char.human
    },
];

const makeAttributeRule = (attribute) => ({
    id: `attribute_${attribute.toLowerCase()}`,
    text: `Attribut ${attribute}`,
    hint: "",
    type: "attribute",
    image: `img/zenless/attributes/Icon_${attribute}.webp`, 
    test: (char) => char.attribute === attribute
});

const makeSpecialtyRule = (specialty) => ({
    id: `specialty_${specialty.toLowerCase()}`,
    text: `Spécialité ${specialty}`,
    hint: "",
    type: "specialty",
    image: `img/zenless/specialties/Icon_${specialty}.webp`, 
    test: (char) => char.specialty === specialty
});


const ruleCatalogZenless = [

    makeAttributeRule("Physical"),
    makeAttributeRule("Electric"),
    makeAttributeRule("Fire"),
    makeAttributeRule("Ice"),
    makeAttributeRule("Ether"),

    makeSpecialtyRule("Attack"),
    makeSpecialtyRule("Stun"),
    makeSpecialtyRule("Defense"),
    makeSpecialtyRule("Support"),
    makeSpecialtyRule("Anomaly"),
    makeSpecialtyRule("Rupture"),

    {
        id: "faction_hares_mockingbird",
        text: "Fait partie des Lièvres Rusés ou des Oiseaux Moqueurs",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Cunning Hares" || char.faction === "Mockingbird"
    },
    {
        id: "faction_belobog_victoria",
        text: "Fait partie des Usines Belobog ou de la Société d'entretien Victoria",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Belobog Heavy Industries" || char.faction === "Victoria Housekeeping"
    },
    {
        id: "faction_obol_silver_section6",
        text: "Fait partie de l'Escouade Obole ou Argent, ou de la Section 6",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Obol Squad" || char.faction === "Silver Squad" || char.faction === "Section 6"
    },
    {
        id: "faction_neps_krampus",
        text: "Fait partie de la N.E.P.S. ou de Krampus",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "N.E.P.S." || char.faction === "Krampus"
    },
    {
        id: "faction_neps_phaethon_calydon",
        text: "Fait partie des Fils de Calydon ou de Phaethon",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Sons of Calydon" || char.faction === "Phaethon"
    },
    {
        id: "faction_lyra_aod_roscaelifer",
        text: "Fait partie des Etoiles de la Lyre, des Anges de l'Illusion ou vit à Roscaelifer",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Stars of Lyra" || char.faction === "Angels of Delusion" || char.faction === "Roscaelifer"
    },
    {
        id: "faction_yunkui_shack",
        text: "Fait partie des Cimes de Yunkui ou de la Maison Hantée",
        hint: "",
        type: "faction",
        test: (char) => char.faction === "Yunkui Summit" || char.faction === "Spook Shack"
    },

    {
        id: "rank_s",
        text: "Personnage de rang S",
        hint: "",
        type: "rank",
        image: `img/zenless/rank/Icon_AgentRank_S.webp`, 
        test: (char) => char.rank === "S"
    },
    {
        id: "rarity_4",
        text: "Personnage de rang A",
        hint: "",
        type: "rank",
        image: `img/zenless/rank/Icon_AgentRank_A.webp`,
        test: (char) => char.rank === 'A'
    },

    {
        id: "species_human",
        text: "Est un humain",
        hint: "• Les clones et les répliques d'humains sont considérés comme des constructions intelligentes.\n• Les onis et les anges sont considérés comme des Thiriens.\n• Les étheriens sont considérés comme des humains.\n• Les personnages dont l'espèce est inconnue sont considérés comme des humains.",
        type: "species",
        test: (char) => char.species === "Human"
    },
    {
        id: "species_thiren",
        text: "Est un Thirien",
        hint: "• Les clones et les répliques d'humains sont considérés comme des constructions intelligentes.\n• Les onis et les anges sont considérés comme des Thiriens.\n• Les étheriens sont considérés comme des humains.\n• Les personnages dont l'espèce est inconnue sont considérés comme des humains.",
        type: "species",
        test: (char) => char.species === "Thiren"
    },
    {
        id: "species_construct",
        text: "Est un clone ou une construction intelligente",
        hint: "• Les clones et les répliques d'humains sont considérés comme des constructions intelligentes.\n• Les onis et les anges sont considérés comme des Thiriens.\n• Les étheriens sont considérés comme des humains.\n• Les personnages dont l'espèce est inconnue sont considérés comme des humains.",
        type: "species",
        test: (char) => char.species === "Construct"
    },

    {
        id: "bodyType_short_female",
        text: "Femme de petite taille",
        hint: "Personnages féminins dont la taille est inférieure ou égale à 155cm",
        type: "bodyType",
        test: (char) => char.bodyType === "Size 01 Female"
    },

    {
        id: "bodyType_medium_female",
        text: "Femme de taille moyenne",
        hint: "Personnages féminins dont la taille est comprise entre 156cm et 165cm",
        type: "bodyType",
        test: (char) => char.bodyType === "Size 02 Female"
    },

    {
        id: "bodyType_tall_female",
        text: "Femme de grande taille",
        hint: "Personnages féminins dont la taille est supérieure à 166cm",
        type: "bodyType",
        test: (char) => char.bodyType === "Size 03 Female"
    },

    {
        id: "bodyType_male",
        text: "Homme",
        hint: "",
        type: "bodyType",
        test: (char) => char.bodyType === "Size 01 Male" || char.bodyType === "Size 02 Male" || char.bodyType === "Size 03 Male"
    },


    makeBeforeVersionRule(versionTimelineZenless, "1.0"),
    makeBeforeVersionRule(versionTimelineZenless, "1.1"),
    makeBeforeVersionRule(versionTimelineZenless, "1.2"),
    makeBeforeVersionRule(versionTimelineZenless, "1.3"),
    makeBeforeVersionRule(versionTimelineZenless, "1.4"),
    makeBeforeVersionRule(versionTimelineZenless, "1.5"),
    makeBeforeVersionRule(versionTimelineZenless, "1.6"),
    makeBeforeVersionRule(versionTimelineZenless, "1.7"),

    
    makeAfterVersionRule(versionTimelineZenless, "2.0"),
    makeAfterVersionRule(versionTimelineZenless, "2.1"),
    makeAfterVersionRule(versionTimelineZenless, "2.2"),
    makeAfterVersionRule(versionTimelineZenless, "2.3"),
    makeAfterVersionRule(versionTimelineZenless, "2.4"),
    makeAfterVersionRule(versionTimelineZenless, "2.5"),
    makeAfterVersionRule(versionTimelineZenless, "2.6"),
    makeAfterVersionRule(versionTimelineZenless, "2.7"),
    makeAfterVersionRule(versionTimelineZenless, "2.8"),
    makeAfterVersionRule(versionTimelineZenless, "3.0"),
    makeAfterVersionRule(versionTimelineZenless, "3.1"),

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
                if (candidates.length === 0 || candidates.length > 15) {
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

export { ruleCatalogGenshin, ruleCatalogStarRail, ruleCatalogZenless, generateGridRules };
