import IntervalTree from 'interval-tree2';

import ActionType from 'src/config/action-type';

function IsNumber (val) {
    return typeof val === 'number' || typeof Number(val) === 'number';
};

function GetNumber (val) {
    return typeof val === 'number' ? val : Number(val);
};

export const mutations = {
    [ActionType.BuildChainIntervalTree] (state, payload) {
        let chainSrc = state['highway']['alignment']['chain'].map((storeItem) => {
            return {
                ...storeItem,
                ...JSON.parse(storeItem['config']),
            };
        });
        let longChain = chainSrc.filter(item => item['type'] === 'long');

        let itreeObject = {};
        longChain.map((item) => {
            if (IsNumber(item['station']) && IsNumber(item['measureStation']) && GetNumber(item['station']) < GetNumber(item['measureStation'])) {
                if (!itreeObject.hasOwnProperty(item['alignmentID'])) {
                    itreeObject[item['alignmentID']] = new IntervalTree(GetNumber(item['station']));
                }
                itreeObject[item['alignmentID']].add(GetNumber(item['station']), GetNumber(item['measureStation']) - 0.00001, item['id']);
            } else {
                // eslint-disable-next-line no-console
                console.error(`Failed to process this chain: \n${JSON.stringify(item, null, 4)}`);

                state['highway']['globalMessage'].push({
                    config: {
                        title: '长链未处理',
                        desc: `路线：${item['alignmentCnName']}<br/>测量桩号：${item['measureStation']}<br/>断链桩号：${item['station']}`,
                        duration: 5,
                    },
                    type: 'error',
                    timestamp: (new Date()).getTime(),
                });
            };
        });
        state['highway']['intervalTree'] = itreeObject;
        state['highway']['globalMessage'].push({
            config: {
                title: '断链数据准备完成！',
                duration: 5,
            },
            type: 'info',
            timestamp: (new Date()).getTime(),
        });
    },

};
