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
        Сортировка
        <select placeholder="Сортировка" @change="onSelectHandler">
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
            <tr v-for="item in list">
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


    export default {
        name: 'ConsumptionList',
        props: {
            msg: String,
        },
        data() {
            return {
                valid: true,
				time: [],
                sortOptions: [
                    'По дате',
                    'По сумме'
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
        mounted() {
            this.list =  this.$store.getters['getConsumptionList'];
        },
        methods: {
            onDeleteHandler (id) {
                this.$store.dispatch('deleteFromConsumptionList', id);
				this.list =  this.$store.getters['getConsumptionList'];
            },
			onEditHandler (e) {

            },
            onSelectHandler (e) {
				console.log(this.time)
                console.log(e.target.value)
            },
			onClickHandler (e) {
				this.$router.push('/add')
                console.log(this.time)
            }
        }
    }
</script>

<style scoped>
.main-container {
    display: inline-grid;
}

</style>
