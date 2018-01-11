import Cookies from 'js-cookie';
import ActionType from 'src/config/action-type';

function deepFind (obj, pathArray) {
    let current = obj;
    for (let i = 0; i < pathArray.length; i++) {
        if (current[pathArray[i]] === undefined) {
            return undefined;
        } else {
            current = current[pathArray[i]];
        }
    }
    return current;
}

export function getRequestFunc ({commit, state}, queryFunc, query = {}, recursive = false, idField, path, loadMore = false) {
    return async function request (searchAfter, index = 0) {
        let queryParams = {
            size: 53,
            sort: [{Timestamp: {order: 'desc'}}],
            ...query,
        };
        if (loadMore) {
            let cachedData = deepFind(state, path);
            let lastItem = cachedData.length ? cachedData[cachedData.length - 1] : null;
            let sort = lastItem ? lastItem['sort'] : null;
            if (sort && sort.length) {
                queryParams['search_after'] = sort;
            };
        };
        if (searchAfter && searchAfter.length) {
            queryParams['search_after'] = searchAfter;
        };

        let resp = await queryFunc(Cookies.get('project'), JSON.stringify(queryParams));
        if (resp && resp['hits'] && resp['hits']['hits'] && resp['hits']['hits'].length) {
            let ids = [];
            let data = resp['hits']['hits'].map((item) => {
                ids.push(item['_source']['ID']);
                return {
                    [idField]: item['_source']['ID'],
                    ...item['_source']['Data'],
                    sort: item['sort'],
                };
            });
            commit({
                type: (searchAfter && searchAfter.length) || loadMore ? ActionType.Append : ActionType.Write,
                path,
                data,
            });
            let sortArray = resp['hits']['hits'][resp['hits']['hits'].length - 1]['sort'];
            if (sortArray && sortArray.length && recursive) {
                // TODO 例外情况未处理：hits的结果中，sort为null??
                // console.log(`第${index}次递归调用的result: `, JSON.stringify(ids, null, 4));
                let result = await request(sortArray, index + 1);
                return Promise.resolve(data.concat(result));
            } else {
                return Promise.resolve(data);
            };
        } else {
            return Promise.resolve([]);
        };
    };
};

// use '_source' as root, migrate from getRequestFunc
export function getRequestFunc2 ({commit, state}, queryFunc, query = {}, recursive = false, idField, path, loadMore = false,
    appendAction = ActionType.Append, writeAction = ActionType.Write
) {
    return async function request (searchAfter, index = 0) {
        let queryParams = {
            size: 53,
            sort: [{Timestamp: {order: 'desc'}}],
            ...query,
        };
        if (loadMore) {
            let cachedData = deepFind(state, path);
            let lastItem = cachedData.length ? cachedData[cachedData.length - 1] : null;
            let sort = lastItem ? lastItem['sort'] : null;
            if (sort && sort.length) {
                queryParams['search_after'] = sort;
            };
        };
        if (searchAfter && searchAfter.length) {
            queryParams['search_after'] = searchAfter;
        };

        let resp = await queryFunc(Cookies.get('project'), JSON.stringify(queryParams));
        if (resp && resp['hits'] && resp['hits']['hits'] && resp['hits']['hits'].length) {
            let ids = [];
            let data = resp['hits']['hits'].map((item) => {
                ids.push(item['_source']['ID']);
                return {
                    [idField]: item['_source']['ID'],
                    ...item['_source'],
                    sort: item['sort'],
                };
            });
            commit({
                type: (searchAfter && searchAfter.length) || loadMore ? appendAction : writeAction,
                path,
                data,
            });
            let sortArray = resp['hits']['hits'][resp['hits']['hits'].length - 1]['sort'];
            if (sortArray && sortArray.length && recursive) {
                // TODO 例外情况未处理：hits的结果中，sort为null??
                // console.log(`第${index}次递归调用的result: `, JSON.stringify(ids, null, 4));
                if (recursive) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 200);
                    });
                };
                let result = await request(sortArray, index + 1);
                return Promise.resolve(data.concat(result));
            } else {
                return Promise.resolve(data);
            };
        } else {
            return Promise.resolve([]);
        };
    };
};

export function delayRequest (func, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let result = await func();
            // console.log('最终的result: ', JSON.stringify(result, null, 4));
            resolve(result);
        }, delay ? (Number.isInteger(delay) ? delay : 1500) : 0);
    });
};
