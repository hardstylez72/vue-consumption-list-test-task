import ConsumptionList from '../views/Consumption/list'
import ConsumptionAdd from '../views/Consumption/add'

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: ConsumptionList,
        },
		{
			path: '/add',
			component: ConsumptionAdd,
		},
        {
            path: '*',
            redirect: '/'
        }
    ],
});


export default router;