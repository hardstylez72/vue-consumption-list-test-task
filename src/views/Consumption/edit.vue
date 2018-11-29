<template>
    <div class="main-container">
        <button @click="onClickHandler">
            Сохранить
        </button>
        <date-picker
            lang="ru"
            v-model="cur.time"
        ></date-picker>
        <input
            type="number"
            placeholder="Сумма"
            v-model="cur.sum"/>
        <input
            type="text"
            placeholder="Описание"
            v-model="cur.description"/>
    </div>
</template>

<script>

    export default {
        name: 'ConsumptionEdit',
        props: {
            msg: String,
        },
        data() {
            return {
            	origin: {
            		id: null,
					time: '',
					sum: null,
					description: ''
                },
                cur: {
					id: null,
					time: '',
					sum: null,
					description: ''
                }
            }
        },
        mounted() {
			this.$store.dispatch('getFromConsumptionList', this.$route.params.id)
                .then(el => {
                	this.origin = el;
                	this.cur = Object.assign({}, this.origin);
                })
        },
        methods: {
			onClickHandler () {
				this.$store.dispatch('editFromConsumptionList', this.cur);
            }
        }
    }
</script>

<style scoped>

    .main-container {
        display: inline-grid;
    }

</style>
