<template>
    <div class="main-container">
        <button @click="onClickHandler">
            Добавить новый расход
        </button>
        Фильтр
        <date-picker
                lang="ru"
                v-model="time"
                range
                :shortcuts="shortcuts"
        ></date-picker>
        Общая сумма расходов: {{getTotalSum}} <br>
        Сортировка
        <select placeholder="Сортировка" @change="onSelectSortOriginHandler">
            <option v-for="item in sortOptions" >{{item}}</option>
        </select>
Список расходов
        <table>
            <tr>
                <th>Время</th>
                <th>Описание</th>
                <th>Сумма</th>
                <th>Действия</th>
            </tr>
            <tr v-for="item in getFilteredAndSortedList">
                <td>{{item.time}}</td>
                <td>{{item.description}}</td>
                <td>{{item.sum}}</td>
                <td>
                    <button @click="onDeleteHandler(item.id)">
                        удалить
                    </button>
                    <button @click="onEditHandler(item.id)">
                        редактировать
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

	import moment from 'moment';
    export default {
        name: 'ConsumptionList',
        props: {
            msg: String,
        },
        data() {
            return {
                valid: true,
				time: [],
                curFilterValue: '',
                curSortValue: 'По сумме',
                curFilterSettings: {
                    timeFrom: '',
                    timeTo: '',
                },
                sortOptions: [
					'По сумме',
                    'По дате'
                ],
				shortcuts: [
					{
						text: 'Today',
						onClick: () => {
							this.time = [ new Date(), new Date() ]
						}
					}
				],
                list: []
            }
        },
        computed: {
        	getFilteredAndSortedList() {
				let list = this.getList;

			    if (this.time.length) {
			    	list = list.filter(el => moment(el.time).isBetween(moment(this.time[0]), moment(this.time[1])));
                }

				switch (this.curSortValue) {
                    case this.sortOptions[0]:
						list = this.sortBySum(list);
                    	break;
                    case this.sortOptions[1]:
						list = this.sortByDate(list);
						break;
                    default:
                    	break;
                }
                return list;
            },
			getList() {
                return this.$store.getters['getConsumptionList'];
            },
			getTotalSum() {
				const consumptionList = this.getFilteredAndSortedList;
				let result = 0;
                if (consumptionList.length) {
					result = consumptionList.reduce((acc, cur) => {
                        return (cur.sum === null) ? acc : (acc + Number(cur.sum));
                    }, 0)
                }
                return result;
            }
        },
        methods: {
        	sortBySum (list) {
                list.sort((a, b) => Number(b.sum) - Number(a.sum));
                return list;
            },
			sortByDate (list) {
				list.sort((a, b) => moment(a.time) - moment(b.time));
				return list;
			},
            onDeleteHandler (id) {
                this.$store.dispatch('deleteFromConsumptionList', id)
            },
			onEditHandler (id) {
                this.$router.push(`/edit/${id}`);
            },
            onSelectSortOriginHandler (e) {
        		this.curSortValue = e.target.value;
            },
			onClickHandler () {
				this.$router.push('/add');
            }
        }
    }
</script>

<style scoped>
.main-container {
    display: inline-grid;
}

</style>
