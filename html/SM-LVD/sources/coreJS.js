// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('analyze').addEventListener('click', analyzeChar);
    document.getElementById('pattern').addEventListener('click', analyzeString);
    document.getElementById('combine').addEventListener('click', combineMorphographs);
    document.getElementById('pluralize').addEventListener('click', pluralize);
});

// Core validation
function isLetterOnly(s) {
    return /^[a-zA-Z]+$/.test(s);
}

function isValidCharInput(id) {
    const val = document.getElementById(id).value;
    return val.length === 1 && isLetterOnly(val);
}

function show(id, msg) {
    document.getElementById(id).innerHTML = msg;
}

// Vowel or consonant classification
function vcJudge(c) {
    return ['a', 'e', 'i', 'o', 'u'].includes(c.toLowerCase()) ? 'v' : 'c';
}

function analyzeChar() {
    const input = document.getElementById('charInput').value;
    if (!isValidCharInput('charInput')) {
        show('charResult', "Please enter a single alphabetic letter.");
        return;
    }

    const lower = input.toLowerCase();
    const type = vcJudge(lower) === 'v' ? "vowel" : "consonant";

    show('charResult', `The character <strong>${lower}</strong> is a <strong>${type}</strong>.`);
}

function analyzeString() {
    const input = document.getElementById('vcStringInput').value;
    if (!isLetterOnly(input)) {
        show('vcResult1', "Please enter letters only.");
        show('vcResult2', "");
        return;
    }

    const s = input.toLowerCase();
    let result = "";
    const last = s.length - 1;

    for (let i = 0; i <= last; i++) {
        if (i === last) {
            if (s[i] === 'x') result += "c(+c)";
            else if (['y', 'w'].includes(s[i])) result += "v";
            else result += vcJudge(s[i]);
        } else {
            result += vcJudge(s[i]);
        }
    }

    show('vcResult1', `The V/C string for <strong>${s}</strong> is: <strong>${result}</strong>.`);
    
    if (['y', 'w'].includes(s[last])) {
        show('vcResult2', `The last character is a vowel (y and w are vowels at the end of a morphograph).`);
    } else if (s[last] === 'x') {
        show('vcResult2', `The last character is a consonant (x sounds like two consonants).`);
    } else {
        show('vcResult2', "");
    }
}

function combineMorphographs() {
    const s1 = document.getElementById('morph1').value;
    const s2 = document.getElementById('morph2').value;

    if (!isLetterOnly(s1) || !isLetterOnly(s2)) {
        show('combineResult', "Please enter valid letter strings.");
        return;
    }

    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const vc1 = getVCString(s1);
    let result = s1 + s2;
    let rule = "";

    if (s1.endsWith('e') && vcJudge(s2[0]) === 'v') {
        result = s1.slice(0, -1) + s2;
        rule = "Drop the final 'e' when followed by a vowel morphograph.";
    } else if (
        s1.length < 5 &&
        vcJudge(s1.slice(-1)) === 'c' &&
        vcJudge(s2[0]) === 'v' &&
        vc1.endsWith("cvc") &&
        !s1.endsWith('x')
    ) {
        result = s1 + s1.slice(-1) + s2;
        rule = "Double the final consonant for short CVC words followed by a vowel.";
    } else if (
        s1.endsWith('y') &&
        vcJudge(s1.slice(-2, -1)) === 'c' &&
        s2[0] !== 'i'
    ) {
        result = s1.slice(0, -1) + 'i' + s2;
        rule = "Change y to i when preceded by a consonant and not followed by 'i'.";
    }

    show('combineResult', `Combined: <strong>${result}</strong>`);
    show('combineRule', rule);
}

function getVCString(s) {
    s = s.toLowerCase();
    let vc = "";
    for (let i = 0; i < s.length - 1; i++) {
        vc += vcJudge(s[i]);
    }
    const last = s.slice(-1);
    if (['a','e','i','o','u','y','w'].includes(last)) vc += 'v';
    else vc += 'c';
    return vc;
}

function pluralize() {
    const exclusives = {
        // f / fe exceptions
        "roof": "roofs",
        "chief": "chiefs",
        "belief": "beliefs",
        "proof": "proofs",
        "cliff": "cliffs",
        "chef": "chefs",
        "safe": "safes",
        "gulf": "gulfs",
        "handkerchief": "handkerchiefs",
        "handcuff": "handcuffs",
        "hoof": "hoofs",
        "cuff": "cuffs",
        "puff": "puffs",
        "sniff": "sniffs",
        "stuff": "stuffs",
        "turf": "turfs",
        "staff": "staffs",
        "beef": "beefs",
        "grief": "griefs",
        //  o exceptions
        "photo": "photos",
        "piano": "pianos",
        "video": "videos",
        "radio": "radios",
        "zoo": "zoos",
        "kilo": "kilos",
        "solo": "solos",
        "cello": "cellos",
        "bamboo": "bamboos",
        "soprano": "sopranos",
        "canto": "cantos",
        "kangaroo": "kangaroos",
        "tattoo": "tattoos",
        "studio": "studios",
        "casino": "casinos",
        // plural as same as singular
        "deer": "deer",
        "fish": "fish",
        "sheep": "sheep",
        "moose": "moose",
        "species": "species",
        "series": "series",
        "aircraft": "aircraft",
        "crossroads": "crossroads",
        "means": "means",
        "news": "news",
        "bison": "bison",
        "salmon": "salmon",
        "trout": "trout",
        "swine": "swine",
        "cattle": "cattle",
        "pike": "pike",
        "carp": "carp",
        "shrimp": "shrimp",
        "squid": "squid",
        "cod": "cod",
        "barracuda": "barracuda",
        "tuna": "tuna",
        "shrimp": "shrimp",
        "plankton": "plankton",
        // else exceptions
        "foot": "feet",
        "tooth": "teeth",
        "mouse": "mice",
        "louse": "lice",
        "person": "people",
        "child": "children",
        "ox": "oxen",
        "man": "men",
        "woman": "women",
        "goose": "geese",
        "die": "dice",
        "cactus": "cacti",
        "fungus": "fungi",
        "nucleus": "nuclei",
        "focus": "foci",
        "radius": "radii",
        "stimulus": "stimuli",
        "analysis": "analyses",
        "crisis": "crises",
        "thesis": "theses",
        "diagnosis": "diagnoses",
        "oasis": "oases",
        "basis": "bases",
        "appendix": "appendices",
        "index": "indices",
        "matrix": "matrices",
        "vertex": "vertices",
        "vortex": "vortices",
        "axis": "axes"
    }

    const word = document.getElementById('pluralInput').value.toLowerCase();
    if (!isLetterOnly(word)) {
        show('pluralResult', "Please enter letters only.");
        show('pluralRule', "");
        return;
    }

    let result = "", rule = "";

    if (exclusives.hasOwnProperty(word)) {
        result = exclusives[word];
        rule = `Special case: The plural of <strong>${word}</strong> is <strong>${result}</strong>. <br> <a href="./exclusives/plurals.html">See more exceptions</a>`;
    } else if (['s','x','z','o'].includes(word.slice(-1))) {
        result = word + "es";
        rule = "Add 'es' to words ending in s, x, z, or o.";
    } else if (word.endsWith('ch') || word.endsWith('sh')) {
        result = word + "es";
        rule = "Add 'es' to words ending in 'ch' or 'sh'.";
    } else if (word.endsWith('y') && vcJudge(word.slice(-2, -1)) === 'c') {
        result = word.slice(0, -1) + "ies";
        rule = "Consonant + y becomes 'ies'.";
    } else if (word.endsWith('f') || word.endsWith('fe')) {
        if (word.endsWith('fe')) {
            result = word.slice(0, -2) + "ves";
        } else {
            result = word.slice(0, -1) + "ves";
        }
        rule = "F or fe becomes 'ves'.";
    } else {
        result = word + "s";
    }

    show('pluralResult', `Plural: <strong>${result}</strong>`);
    show('pluralRule', rule);
}