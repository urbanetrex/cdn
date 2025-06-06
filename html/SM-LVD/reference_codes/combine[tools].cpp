#include <iostream>
#include <string>

using namespace std;

char vc_judge (char c) {
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
        return 'v';
    } else {
        return 'c';
    }
}

string vc_str (string s) {
    string result = "";
    for (size_t i = 0; i < s.length()-1; i++) result += vc_judge(s[i]);
    switch (s[s.length()-1]) {
        case 'a': case 'e': case 'i': case 'o': case 'u': case 'y': case 'w':
            result += "v"; break;
        default:
            result += "c"; break;
    }
    return result;
}

string spelling_combine (string s1, string s2) {
    if (s1[s1.size()-1] == 'e' && vc_judge(s2[0])=='v') {
        return s1.substr(0, s1.size()-1) + s2;
    }
    if (s1.size() < 5 && vc_judge(s1[s1.size()-1]) == 'c' && vc_judge(s2[0]) == 'v' && vc_str(s1).substr(vc_str(s1).size()-3) == "cvc" && s1[s1.size()-1] != 'x') {
        return s1 + s1.back() + s2;
    }
    if (s1[s1.size()-1] == 'y' && vc_judge (s1[s1.size()-2]) == 'c' && s2[0] !='i') {
        return s1.substr(0, s1.size() - 1) + 'i' + s2;
    }
    return s1 + s2;
}

string plural (string s) {
    if (s[s.size()-1] == 's' || s[s.size()-1] == 'x' || s[s.size()-1] == 'z') {
        return s + "es";
    }
    if (s[s.size()-1] == 'h' && (s[s.size()-2] == 'c' || s[s.size()-2] == 's')) {
        return s + "es";
    }
    if (s[s.size()-1] == 'y' && vc_judge(s[s.size()-2]) == 'c') {
        return s.substr(0, s.size() - 1) + "ies";
    }
    return s + "s";
}


