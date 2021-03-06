const Regex = {
    chtType: /香港永久性居民身份證/,
    chtTypeSplited: /香港永久性/,
    chtTypeSplited2: /居民身份證/,
    chtType2: /香港永久居民身份證/,
    engType: /HONG KONG PERMANENT IDENTITY CARD/i,
    chtBdayType: /出生日期/,
    chtIssueDayType: /簽發日期/,
    dateOfBirthType: /Date of Birth/i,
    dateOfIssueType: /Date of Issue/i,
    chtDateOfIssueType: /(著發日期|簽發日期)/,
    HongKong: /HONG KONG/i,
    SampleText: /(?:sample)/i,
    chtName: /[\u3400-\u9FBF]{2,6}/,
    engName: /(?<last>[a-zA-Z]+)(?:, | )(?<mid>[a-zA-Z]+)(?: *)(?<first>[a-zA-Z]+)(?:(?:(?: *)([a-zA-Z]))*)/,
    ctc: /(?<last>\d\d\d\d)(?: *)(?<mid>\d\d\d\d)(?: *)(?<first>\d\d\d\d)(?:(?:(?: *)(\d\d\d\d))*)/,
    birthday: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>[1-2]\d\d\d)(?: *)$/,
    newBirthdayAndSex: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>[1-2]\d\d\d)(?: *)(?<cht>男?|女?)?(?: *)(?<eng>F|M|f|m)(?: *)$/,
    newIssueDateAndID: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>\d\d)(?: *)(\w|\d)(?:.?)(\d\d\d\d\d\d)(?:.?)([(][\d|\w][)])/,
    hkid: /(\w|\d)(?:.?)(\d\d\d\d\d\d)(?:.?)([(][\d|\w][)])/,
    sex: /^(?: *)(?<cht>男|女)(?: *)(?<eng>F|M|f|m)(?: *)$/,
    dateOfIssue: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>\d\d)(?: *)/,
    symbol: /(\*+(?: *))([A-Z](?: *)[A-Z]+)/,
    firstIssueDate: /[(|C](?: *)(\d\d)(?: *)-(?: *)(\d\d)(?: *)[)]/,
    singleSexChar: /(?<eng>F|M)/i,
    newIDTopRightCorner: /^(?:\w|\d)(?:\d\d\d\d\d\d)$/
}

const regexList = Object.keys(Regex);

const getGroups = result => {
    const val = {};
    for(var i = 1; i < result.length; i++){
        val[`Group${i}`] = result[i]
    }
    return val;
}

const findMatch = text => {
    for(var i = 0; i < regexList.length; i++){
        var nowRegex = Regex[regexList[i]];
        var result = nowRegex.exec(text);
        if(result == null) continue;
        if (regexList[i] == "chtName" && (result[0].includes("永久性") || result[0].includes("身份證"))) continue;
        return {
            type: regexList[i],
            result: {
                "Full_Match": result[0],
                "Groups": getGroups(result)
            },
        };
    }
    return {
        type: null,
        rawText: text
    };
}

const isNewCard = textArr => {
    var matched = [false, false, false];
    for(var i = 0; i < textArr.length; i++){
        if(Regex.newBirthdayAndSex.exec(textArr[i])) matched[0] = true;
        if(Regex.newIssueDateAndID.exec(textArr[i])) matched[1] = true;
        if(Regex.newIDTopRightCorner.exec(textArr[i])) matched[2] = true;
    }
    return matched[0] || matched[1] || matched[2];
}

module.exports = {
    findMatch, isNewCard
};