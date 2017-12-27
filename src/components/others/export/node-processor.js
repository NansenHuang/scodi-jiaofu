import Cookies from 'js-cookie';
import isJSON from 'is-json';

import Field from 'src/config/field';
import Services from 'src/services';

export default async function (type, data, state) {
    // clone data
    let srcData = JSON.parse(JSON.stringify(data));

    // check data
    if (!(srcData && Array.isArray(srcData))) {
        // eslint-disable-next-line no-console
        console.error(`${type.key} data to process is invalid. Please check.`);
        return [];
    };

    // 1、
    // pase JSON fields
    srcData.map((dataItem) => {
        Object.keys(dataItem).map((key) => {
            if (isJSON(dataItem[key])) {
                dataItem[key] = JSON.parse(dataItem[key]);
            };
        });
    });

    // 2、
    // fill tableType field
    srcData.map((dataItem) => {
        dataItem['tableType'] = type.fileName;
    });

    // 3、
    // process LeftParts
    let newData = [];
    let alignments = state['highway']['basic']['alignment'];
    switch (type.key) {
        case 'Section':
            srcData.map((item) => {
                if (item[Field.Section.RightPart]) {
                    let newItem = JSON.parse(JSON.stringify(item));
                    delete newItem[Field.Section.LeftPart];
                    newData.push(newItem);
                };
                if (item[Field.Section.LeftPart] && Array.isArray(item[Field.Section.LeftPart])) {
                    for (let i = 0; i < item[Field.Section.LeftPart].length; i++) {
                        let newItem = JSON.parse(JSON.stringify(item));
                        newItem[Field.Section.RightPart] = newItem[Field.Section.LeftPart][i];
                        delete newItem[Field.Section.LeftPart];
                        newData.push(newItem);
                    };
                };
            });
            srcData = newData;
            break;
        case 'Bridge':
        case 'Tunnel':
            srcData.map((dataItem) => {
                if (dataItem['leftParts'] && Array.isArray(dataItem['leftParts'])) {
                    // get the right alignment id
                    let rightAlignmentId = dataItem['rightPart'] && dataItem['rightPart']['alignmentID'];
                    // separate leftParts
                    let leftsAlongWithRight = dataItem['leftParts'].filter(item => item['alignmentID'] === rightAlignmentId);
                    let leftsSeparated = dataItem['leftParts'].filter(item => item['alignmentID'] !== rightAlignmentId);
                    // process right
                    let itemWithRight = JSON.parse(JSON.stringify(dataItem));
                    itemWithRight['leftParts'] = leftsAlongWithRight.length ? leftsAlongWithRight[0] : null;
                    newData.push(itemWithRight);
                    // process left
                    leftsSeparated.map((item) => {
                        let itemOnlyLeft = JSON.parse(JSON.stringify(dataItem));
                        delete itemOnlyLeft['rightPart'];
                        itemOnlyLeft['leftParts'] = item;
                        newData.push(itemOnlyLeft);
                    });
                } else {
                    newData.push(JSON.parse(JSON.stringify(dataItem)));
                };
            });
            srcData = newData;
            break;
        case 'Bridge_Model':
            srcData.map((item) => {
                if (typeof item['leftParts'] !== 'string') {
                    item['leftParts'] = JSON.stringify(item['leftParts']);
                };
                let str = item['leftParts'] || '';
                item['leftParts'] = str.replace(/,/g, '#');
            });
            break;
    };

    // add alignments
    switch (type.key) {
        case 'Geology':
        case 'Culvert':
        case 'Overbridge':
            srcData.map((dataItem) => {
                let al = alignments.filter(alignmentItem => alignmentItem[Field.Alignment.id] === dataItem['alignmentID']);
                dataItem['leftParts'] = '[]';
                dataItem['rightParts'] = '[]';
                if (al.length) {
                    let targetField = al[0][Field.Alignment.Direction] === 'left' ? 'leftParts' : 'rightParts';
                    dataItem[targetField] = JSON.stringify([{
                        'alignmentID': dataItem['alignmentID'],
                        'alignmentCnName': dataItem['alignmentCnName'],
                        'stationMark': dataItem['stationMark'],
                        'startStation': dataItem['startStation'],
                        'endStation': dataItem['endStation'],
                    }]);
                };
            });
            break;
        case 'Bridge':
        case 'Tunnel':
            srcData.map((dataItem) => {
                dataItem['leftPartsCopy'] = '[]';
                dataItem['rightPartsCopy'] = '[]';
                if (dataItem['leftParts'] && dataItem['leftParts'].hasOwnProperty('alignmentID')) {
                    dataItem['leftPartsCopy'] = JSON.stringify([dataItem['leftParts']]);
                };
                if (dataItem['rightPart'] && dataItem['rightPart'].hasOwnProperty('alignmentID')) {
                    dataItem['rightPartsCopy'] = JSON.stringify([dataItem['rightPart']]);
                };
            });
            break;
    };

    // 4、
    // other process
    switch (type.key) {
        case 'Blignment':
            srcData.map((blignmentItem) => {
                let al = alignments.filter(item => item[Field.Alignment.id] === blignmentItem[Field.Blignment.AlignmentID]);
                if (al.length) {
                    let str = JSON.stringify({
                        regionID: al[0][Field.Alignment.OwerID],
                        regionType: al[0][Field.Alignment.OwerType],
                        regionCnName: al[0][Field.Alignment.OwerCnName],
                        siteID: '',
                        siteType: '',
                        siteCnName: '',
                    });
                    blignmentItem['region'] = str.replace(/,/g, '#').replace(/None/g, '');
                };
            });
            break;
        case 'Clignment':
            srcData.map((clignmentItem) => {
                let al = alignments.filter(item => item[Field.Alignment.id] === clignmentItem[Field.Blignment.AlignmentID]);
                if (al.length) {
                    clignmentItem['direction'] = al[0][Field.Alignment.Direction];
                };
            });
            break;
        case 'Chain':
            srcData.map((chainItem) => {
                let al = alignments.filter(item => item[Field.Alignment.id] === chainItem[Field.Chain.AlignmentID]);
                if (al.length) {
                    chainItem['stationMark'] = al[0][Field.Alignment.StationMark];
                };
            });
            break;
    };

    // 5、
    // get file access urls
    let urlsObject = {};
    let fileType;
    for (let i = 0; i < srcData.length; i++) {
        let dataItem = srcData[i];
        {
            let filesInfo = dataItem['alignmentFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                fileType = filesInfo.type;
                filesInfo.files.map((item) => {
                    urlsObject[item.name] = item;
                });
            };
        };
        {
            let filesInfo = dataItem['corridorFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                fileType = filesInfo.type;
                filesInfo.files.map((item) => {
                    urlsObject[item.name] = item;
                });
            };
        };
        {
            let filesInfo = dataItem['bimFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                fileType = filesInfo.type;
                filesInfo.files.map((item) => {
                    urlsObject[item.name] = item;
                });
            };
        };
    };
    const size = 50;
    let index = 0;
    let taskList = Object.values(urlsObject);
    while (taskList.length) {
        let startIndex = index * size;
        let endIndex = startIndex + 49;
        endIndex = endIndex < taskList.length ? endIndex : taskList.length - 1;
        let filesToQuery = taskList.filter((item, index) => index >= startIndex && index <= endIndex);
        let remoteFiles = await Services.Storage.getDownloadUrls(Cookies.get('project'), fileType, filesToQuery.map(item => item.name));
        remoteFiles.map((item) => {
            urlsObject[item.name] = {
                ...urlsObject[item.name],
                ...item,
            };
        });
        index += 1;
        if (index * 50 >= taskList.length) {
            break;
        };
    };
    for (let i = 0; i < srcData.length; i++) {
        let dataItem = srcData[i];
        {
            let filesInfo = dataItem['alignmentFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                let requestedFiles = filesInfo.files.map(item => urlsObject[item.name].uri);
                dataItem['alignmentFiles'] = requestedFiles.join(',');
            };
        };
        {
            let filesInfo = dataItem['corridorFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                let requestedFiles = filesInfo.files.map(item => urlsObject[item.name].uri);
                dataItem['corridorFiles'] = requestedFiles.join(',');
            };
        };
        {
            let filesInfo = dataItem['bimFiles'];
            if (filesInfo && Array.isArray(filesInfo.files) && filesInfo.files.length) {
                let requestedFiles = filesInfo.files.map(item => urlsObject[item.name].uri);
                dataItem['bimFiles'] = requestedFiles.join(',');
            };
        };
    };

    //
    return srcData;
};
