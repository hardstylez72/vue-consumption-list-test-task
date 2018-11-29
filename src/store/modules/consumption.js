

const state = {
	consumptionList: [],
	totalCost: []
};
const getters = {
	getConsumptionList: state => {
	    let list = window.localStorage.getItem('CONSUMPTION_LIST');

	    if (list === null) {
			state.consumptionList = [];
        }
		state.consumptionList = JSON.parse(list);

        return state.consumptionList;
    }
};
const mutations = {
	consumptionList: (state, payload) => {
		window.localStorage.setItem('CONSUMPTION_LIST', JSON.stringify(payload));
		state.consumptionList = JSON.parse(window.localStorage.getItem('CONSUMPTION_LIST'));
	}
};

const actions = {
    addToConsumptionList: (context, payload) => {
        const list = context.getters['getConsumptionList'];
        list.push(payload);
        context.commit('consumptionList', list);
    },
    deleteFromConsumptionList: async (context, payload) => {
		let list = context.getters['getConsumptionList'];
		list = list.filter(el => el.id !== payload);
		context.commit('consumptionList', list);
	},
	getFromConsumptionList: async (context, payload) => {
		let list = context.getters['getConsumptionList'];
		let index = '';
		const isExist = list.some((el, i) => {
			if (String(el.id) === payload) {
				index = i;
				return true;
			}
			return false;
		});

		return isExist ? list[index] : null;
	},
	editFromConsumptionList: async (context, payload) => {
		let list = context.getters['getConsumptionList'];
		let index = '';
		const isExist = list.some((el, i) => {
			if (el.id === payload.id) {
				list[i] = payload;
				return true;
			}
			return false;
		});

		context.commit('consumptionList', list);
		return isExist ? list[index] : null;
	}
};
export default {
    state,
    getters,
    mutations,
    actions
};
