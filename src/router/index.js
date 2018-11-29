import ConsumptionList from '../views/Consumption/list';
import ConsumptionAdd from '../views/Consumption/add';
import ConsumptionEdit from '../views/Consumption/edit';

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
			path: '/edit/:id',
			component: ConsumptionEdit,
		},
        {
            path: '*',
            redirect: '/'
        }
    ],
});


export default router;