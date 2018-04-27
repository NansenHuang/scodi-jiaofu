'use strict';

const NumRegExp = /Z?K?(\d{2,3})\+?(\d{2,3}(\.\d+)?)~?～?-?Z?K?(\d{2,3})\+?(\d{2,3}(\.\d+)?)/;

const NumRegExpRJ = /(\d{5,6})~?～?-?(\d{5,6})/;

const NumRegExpJC = /.?K?(\d{1,3})\+?(\d{1,3}(\.\d+)?)~?～?-?.?K?(\d{1,3})?\+?(\d{1,3}(\.\d+)?)/;

const NumRegExpJCDTQ = /.?K?(\d{1,3})\+?(\d{1,3}(\.\d+)?)-?(\d{2,3})?(\d{1,3}(\.\d+)?)/;

export {NumRegExp, NumRegExpRJ, NumRegExpJC, NumRegExpJCDTQ};
