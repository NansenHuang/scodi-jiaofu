import { actions as BasicDataActions } from './basic-data';
import { mutations as IntervalTreeMutations } from './interval-tree';

export const actions = {
    ...BasicDataActions,
};

export const mutations = {
    ...IntervalTreeMutations,
};
