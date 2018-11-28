<template>
    <div class="main-container">
        <button @click="onClickHandler">
            Добавить
        </button>
        <date-picker
                lang="ru"
                v-model="time"
        ></date-picker>
        <input type="number" placeholder="Сумма" @change="onSumChanged"/>
        <input type="text" placeholder="Описание" @change="onDescriptionChanged"/>
    </div>
</template>

<script>


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
        mounted() {

        },
        methods: {
			onSumChanged (e) {
                this.sum = e.target.value;
            },
			onClickHandler () {
                if (!this.time) {
                    this.time = Date.now();
                }

                const record = {
                	id: Date.now(),
                    time: this.time,
                    description: this.description,
                    sum: this.sum
                };

				this.$store.dispatch('addToConsumptionList', record);
            },
			onDescriptionChanged (e) {
				this.description = e.target.value;
            }
        }
    }
</script>

<style scoped>
.main-container {
    display: inline-grid;
}

</style>
