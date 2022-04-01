<template>
<div v-if="!isPageLoading" class="page">
  <div class="currencies">
    <div class="currency currency_title">
      <div class="currency_charcode">
        Буквенный код
      </div>
      <div class="currency_name">
        Название
      </div>
      <div class="currency_value">
        Стоимость
      </div>
      <div class="currency_gap">
        Разница c предыдущим значением
      </div>
    </div>
    <details v-for="currency in currencies" :key="currency.id">
      <summary class="currency">
        <div class="currency_charcode">
          {{ currency.CharCode }}
        </div>
        <div class="currency_name">
          {{ currency.Name }}
        </div>  
        <div class="currency_value">
          {{ `${currency.Value.toFixed(2)}₽` }}
        </div>
        <div class="currency_gap green" v-if="currency.Value > currency.Previous">
          <span class="rotate-up">❱</span>{{ `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(2)}%` }}
        </div>
        <div class="currency_gap red" v-else>
          <span class="rotate-down">❱</span>{{ `${(100 - (currency.Value / currency.Previous) * 100).toFixed(2)}%` }}
        </div>
      </summary>
      <div class="currency_description">
        <div class="currency">
          <p></p>
          <p>{{  `${this.currentDate.substring(0, 4)} ${this.currentDate.substring(5, 7)} ${this.currentDate.substring(8, 10)}` }}</p>
          <p>{{  `${currency.Value.toFixed(2)}₽` }}</p>
          <p></p>
        </div>
        <div class="currency">
          <p></p>
          <p>{{  `${this.previousDate.substring(0, 4)} ${this.previousDate.substring(5, 7)} ${this.previousDate.substring(8, 10)}` }}</p>
          <p>{{  `${currency.Previous.toFixed(2)}₽` }}</p>
          <p></p>
        </div>
      </div>
    </details>
  </div>
</div>
<div v-else>Идет загрузка...</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currencies: [],
      currentDate: '',
      previousDate: '',
      isPageLoading: false,
    }
  },
  methods: {
    async fetchCurrencies() {
      try {
        this.isPageLoading = true
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        this.currentDate = response.data.Date
        this.previousDate = response.data.PreviousDate
        this.currencies = response.data.Valute
      } catch(e) {
        console.log('ошибка 1')
      } finally {
        this.isPageLoading = false
      }
      
    },
  },
  mounted() {
      this.fetchCurrencies()
  },
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  text-overflow: ellipsis;
  overflow: auto;
}

body {
  padding: 1.5vw;
}

#app {
  display: flex;
}

.page {
  width: 100%;
}

.currencies {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.currency {
  display: grid;
  grid-template-columns: 14.5% 39.5% 19.5% 24.5%;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 13px;
  line-height: 13px;
  padding: 15px 10px;
}

.currency_title {
  font-weight: 700;
  padding: 10px;
}

details > summary {
  list-style: none;
}

details > summary::marker,
details > summary::-webkit-details-marker {
  display: none;
}

details .currency {
  cursor: pointer;
}

details, .currency_title {
  box-shadow: 2px 4px 2px rgba($color: #000, $alpha: 0.05);
  margin-bottom: 10px;
}

.green {
  color:limegreen;
}

.red {
  color:crimson
}

.currency_gap {
  display: flex;
}

.rotate-up, .rotate-down {
  display: block;
  flex-shrink: 0;
  margin: 0 5px;
}

.rotate-up {
  transform: rotate(-90deg);
}
.rotate-down {
  transform: rotate(90deg);
}

details[open] summary ~ * {
  animation: uncover 0.3s linear;
}

@keyframes uncover {
  0%    {opacity: 0; margin-top: -10px}
  100%  {opacity: 1; margin-top: 0px}
}
</style>
