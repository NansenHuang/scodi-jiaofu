import Cookies from 'js-cookie';
import isJSON from 'is-json';

import Field, {SubField} from 'src/config/field';
import Services from 'src/services';

function delayedQuery (project, modelType, files) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            let result = await Services.Storage.getDownloadUrls(project, modelType, files);
            resolve(result);
        }, 100);
    });
};

export default async function (type, data, state) {
    // clone data
    let srcData = JSON.parse(JSON.stringify(data));
    if (!(srcData && Array.isArray(srcData))) {
        throw new Error(`${type.key} data to process is invalid. Please check.`);
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
    // add tableType
    srcData.map((dataItem) => {
        dataItem['tableType'] = type.fileName;
    });
    // 3、
    // process LeftParts
    if (type.key === 'Section') {
        let newData = [];
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
    };
    if (type.key === 'Bridge' || type.key === 'Tunnel') {
        let newData = [];
        srcData.map((dataItem) => {
            if (dataItem[Field.Bridge.LeftPart] && Array.isArray(dataItem[Field.Bridge.LeftPart])) {
                // find the right alignmentid
                let rightAlignmentId = dataItem[Field.Bridge.RightPart] && dataItem[Field.Bridge.RightPart][SubField.Bridge.RightPart.AlignmentID];
                // seperate left part alignments
                let leftsAlongWithRight = dataItem[Field.Bridge.LeftPart].filter(
                    item => item[SubField.Bridge.LeftPart.AlignmentID] === rightAlignmentId
                );
                let leftsSeperated = dataItem[Field.Bridge.LeftPart].filter(
                    item => item[SubField.Bridge.LeftPart.AlignmentID] !== rightAlignmentId
                );

                // process right
                if (leftsAlongWithRight.length) {
                    let itemWithRight = JSON.parse(JSON.stringify(dataItem));
                    itemWithRight[Field.Bridge.LeftPart] = leftsAlongWithRight[0];
                    newData.push(itemWithRight);
                };
                // process left
                leftsSeperated.map((item) => {
                    let itemOnlyLeft = JSON.parse(JSON.stringify(dataItem));
                    delete itemOnlyLeft[Field.Bridge.RightPart];
                    itemOnlyLeft[Field.Bridge.LeftPart] = item;
                    newData.push(itemOnlyLeft);
                });
            } else {
                newData.push(JSON.parse(JSON.stringify(dataItem)));
            };
        });
        srcData = newData;
    };
    if (type.key === 'Blignment') {
        let alignments = state['highway']['alignment']['alignment'];
        srcData.map((blignmentItem) => {
            let al = alignments.filter(item => {
                return item[Field.Alignment.id] === blignmentItem[Field.Blignment.AlignmentID];
            });
            if (al.length) {
                let str = JSON.stringify({
                    regionID: al[0][Field.Alignment.OwerID],
                    regionType: al[0][Field.Alignment.OwerType],
                    regionCnName: al[0][Field.Alignment.OwerCnName],
                    siteID: '',
                    siteType: '',
                    siteCnName: '',
                });
                blignmentItem['region'] = str.replace(/,/g, '#');
            };
        });
    };
    if (type.key === 'Chain') {
        let alignments = state['highway']['alignment']['alignment'];
        srcData.map((chainItem) => {
            let al = alignments.filter(item => {
                return item[Field.Alignment.id] === chainItem[Field.Chain.AlignmentID];
            });
            if (al.length) {
                chainItem['stationMark'] = al[0][Field.Alignment.StationMark];
            };
        });
    };
    // 4、
    // get file access urls
    for (let i = 0; i < srcData.length; i++) {
        let dataItem = srcData[i];
        if (type.key === 'Blignment') {
            {
                let filesInfo = dataItem['alignmentFiles'];
                if (filesInfo && Array.isArray(filesInfo) && filesInfo.files && filesInfo.files.length) {
                    let remoteFiles = await
                        delayedQuery(Cookies.get('project'), filesInfo.type, filesInfo.files.map(item => item.name));
                    dataItem['alignmentFiles'] = remoteFiles.map(item => item.uri).join(',');
                };
            };
            {
                let filesInfo = dataItem['corridorFiles'];
                if (filesInfo && Array.isArray(filesInfo) && filesInfo.files && filesInfo.files.length) {
                    let remoteFiles = await
                        delayedQuery(Cookies.get('project'), filesInfo.type, filesInfo.files.map(item => item.name));
                    dataItem['corridorFiles'] = remoteFiles.map(item => item.uri).join(',');
                };
            };
        };
        if (type.key === 'Bridge_Model') {
            // if (type.key === 'Culvert' || type.key === 'Overbridge' || type.key === 'Bridge' || type.key === 'Geology' || type.key === 'Tunnel') {
            let filesInfo = dataItem['bimFiles'];
            if (filesInfo && Array.isArray(filesInfo) && filesInfo.files && filesInfo.files.length) {
                let remoteFiles = await
                    delayedQuery(Cookies.get('project'), filesInfo.type, filesInfo.files.map(item => item.name));
                dataItem['alignmentFiles'] = remoteFiles.map(item => item.uri).join(',');
            };
        };

    };
    //
    // finish
    return srcData;
};
