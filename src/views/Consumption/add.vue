<template>
    <div class="main-container">
        <button @click="onClickHandler">
            Добавить
        </button>
        <date-picker
                lang="ru"
                v-model="time"
        ></date-picker>
        <input
            type="number"
            placeholder="Сумма"
            v-model="sum"
            />
        <input
            type="text"
            placeholder="Описание"
            v-model="description"/>
    </div>
</template>

<script>

	import moment from 'moment';
	export default {
        name: 'ConsumptionAdd',
        props: {
            msg: String,
        },
        data() {
            return {
				time: '',
                sum: null,
				description: ''
            }
        },
        methods: {
			onClickHandler () {
                if (!this.time) {
                    this.time = moment().format('YYYY-MM-DD');
                }

                const record = {
                    id: Date.now(),
                    time: moment(this.time).format('YYYY-MM-DD'),
                    description: this.description,
                    sum: this.sum
                };

				this.$store.dispatch('addToConsumptionList', record);
            }
        }
    }
</script>

<style scoped>

    .main-container {
        display: inline-grid;
    }

</style>
