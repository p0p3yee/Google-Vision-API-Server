const Regex = {
    chtType: /香港永久性居民身份證/,
    engType: /HONG KONG PERMANENT IDENTITY CARID/,
    chtBdayType: /出生日期/,
    chtIssueDayType: /簽發日期/,
    chtName: /([\u3400-\u9FBF]){2,6}/,
    engName: /(?<last>[a-zA-Z]+)(?:, | )(?<mid>[a-zA-Z]+)(?: *)(?<first>[a-zA-Z]+)(?<extra>(?:(?: *)[a-zA-Z])*)/,
    ctc: /(?<last>\d\d\d\d)(?: *)(?<mid>\d\d\d\d)(?: *)(?<first>\d\d\d\d)/,
    birthday: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>[1-2]\d\d\d)(?: *)$/,
    hkid: /(\w|\d)(?:.?)(\d\d\d\d\d\d)(?:.?)([(][\d|\w][)])/,
    sex: /^(?: *)(?<cht>男|女)(?: *)(?<eng>F|M|f|m)(?: *)$/,
    dateOfIssue: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>\d\d)(?: *)/
}

const regexList = Object.keys(Regex);

const findMatch = text => {
    for(var i = 0; i < regexList.length; i++){
        var result = Regex[regexList[i]].exec(text);
        if(result == null) continue;
        return {
            type: regexList[i],
            result: result[0]
        };
    }
    return {
        type: null,
        rawText: text
    };
}

module.exports = findMatch;