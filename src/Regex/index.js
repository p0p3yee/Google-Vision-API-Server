const Regex = {
    chtType: /香港永久性居民身份證/,
    engType: /HONG KONG PERMANENT IDENTITY CARID/,
    chtName: /([\u3400-\u9FBF]){2,6}/,
    engName: /(?<last>\w)(?:, | )(?<mid>\w)(?: *)(?<first>\w)(?<extra>(?:(?: *)\w)*)/,
    ctc: /(?<last>\d\d\d\d) (?<mid>\d\d\d\d) (?<first>\d\d\d\d)/,
    birthday: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>[1-2]\d\d\d)(?: *)$/,
    hkid: /(\w|\d)(?:.?)(\d\d\d\d\d\d)(?:.?)([(][\d|\w][)])/,
    sex: /^(?: *)(?<cht>男|女)(?: *)(?<eng>F|M|f|m)(?: *)$/,
    dateOfIssue: /(?: *)(?<day>[0-3]\d)(?: *)-(?: *)(?<month>[0-1]\d)(?: *)-(?: *)(?<year>\d\d)(?: *)/
}