'use strict';

export default class Station {
    static IsValidStationFormat(station) {
        var isStringFormat;
        var isNumberFormat;
        try {
            this.NumberToLetterStaion(station);
            isNumberFormat = true;
        } catch (e) {
            isNumberFormat = false;
        }
        try {
            this.LetterStaionToNumber(station);
            isStringFormat = true;
        } catch (e) {
            isStringFormat = false;
        }

        return (isStringFormat || isNumberFormat);
    }

    static LetterStaionToNumberString(station) {
        return Station.LetterStaionToNumber(station).toString();
    }

    static LetterStaionToNumber(station) {
        station = station.replace(/[^\d+.]/g, '');
        let details = station.split(/[ +]+/);
        if (details[0] === '') {
            throw new Error();
        }
        if (details.length <= 1) {
            return Number(details[0]);
        }
        let num = Number(details[0] * 1000) + Number(details[1]);
        return num;
    }

    static NumberToLetterStaion(station) {
        let str = station.toString();
        station = Number(station);
        if (!station) {
            throw new Error();
        }
        station = Math.floor(station);
        let ks = Math.floor(station / 1000);
        let hs = station - ks * 1000;
        let ss = 'K' + ks.toString() + '+' + hs.toString();

        let strs = str.split('.');
        if (strs.length > 1) {
            ss += '.' + strs[1];
        }

        return ss;
    }
}
