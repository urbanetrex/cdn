function vcJudge(c) {
    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {
        return 'v';
    } else {
        return 'c';
    }
}

function vcStr(s) {
    let result = "";
    for (let i = 0; i < s.length - 1; i++) {
        result += vcJudge(s[i]);
    }
    switch (s[s.length - 1]) {
        case 'a': case 'e': case 'i': case 'o': case 'u': case 'y': case 'w':
            result += "v";
            break;
        default:
            result += "c";
            break;
    }
    return result;
}

function spellingCombine(s1, s2) {
    if (s1[s1.length - 1] === 'e' && vcJudge(s2[0]) === 'v') {
        return s1.slice(0, -1) + s2;
    }
    if (s1.length < 5 && vcJudge(s1[s1.length - 1]) === 'c' && vcJudge(s2[0]) === 'v' &&
        vcStr(s1).slice(-3) === "cvc" && s1[s1.length - 1] !== 'x') {
        return s1 + s1[s1.length - 1] + s2;
    }
    if (s1[s1.length - 1] === 'y' && vcJudge(s1[s1.length - 2]) === 'c' && s2[0] !== 'i') {
        return s1.slice(0, -1) + 'i' + s2;
    }
    return s1 + s2;
}

function plural(s) {
    if (s[s.length - 1] === 's' || s[s.length - 1] === 'x' || s[s.length - 1] === 'z') {
        return s + "es";
    }
    if (s[s.length - 1] === 'h' && (s[s.length - 2] === 'c' || s[s.length - 2] === 's')) {
        return s + "es";
    }
    if (s[s.length - 1] === 'y' && vcJudge(s[s.length - 2]) === 'c') {
        return s.slice(0, -1) + "ies";
    }
    return s + "s";
}