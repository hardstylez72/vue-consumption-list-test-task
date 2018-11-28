

const state = {
	consumptionList: []
};
const getters = {
	getConsumptionList: state => {
	    const list = window.localStorage.getItem('CONSUMPTION_LIST');

	    console.log('Мы в геттере :', list)
	    if (list === null) {
			return state.consumptionList;
        }

        return JSON.parse(list);
    }
};
const mutations = {
	consumptionList: (state, payload) => {
		window.localStorage.setItem('CONSUMPTION_LIST', JSON.stringify(payload));
		state.consumptionList = window.localStorage.getItem('CONSUMPTION_LIST');
	}
};

const actions = {
    addToConsumptionList: async (context, payload) => {
        const list = context.getters['getConsumptionList'];
        list.push(payload);
        context.commit('consumptionList', list);
    },
    deleteFromConsumptionList: async (context, payload) => {
        console.log('context ', context)
		let list = context.getters['getConsumptionList'];
		list = list.filter(el => el.id !== payload);
		console.log('Стало: ', list.length);
		context.commit('consumptionList', list);
		list = context.getters['getConsumptionList'];
		console.log('Стало после геттера: ', list.length);

	}
};
export default {
    state,
    getters,
    mutations,
    actions
};
