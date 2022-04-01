<template>
<div v-show="isPageLoading" class="page">Идет загрузка...</div>
<div v-show="!isPageLoading" class="page">
  <div class="currencies">
    <div class="currency currency_title">
      <div class="currency_charcode">
        Букв. код
      </div>
      <div class="currency_name">
        Название
      </div>
      <div class="currency_value">
        Стоимость
      </div>
      <div class="currency_gap">
        Изменение
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
          {{ `${currency.Value.toFixed(2)} ₽` }}
        </div>
        <div class="currency_gap green" v-if="currency.Value > currency.Previous">
          <span class="rotate-up">❱</span>{{ `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
        </div>
        <div class="currency_gap red" v-else>
          <span class="rotate-down">❱</span>{{ `${(100 - (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
        </div>
      </summary>
      <div class="currency_description">
        <div class="currency">
          <div></div>
          <div>{{  `${this.currentDate.substring(0, 4)} ${this.currentDate.substring(5, 7)} ${this.currentDate.substring(8, 10)} 11:30 MSK` }}</div>
          <div>{{  `${currency.Value.toFixed(2)} ₽` }}</div>
          <div>
            <div class="currency_gap green" v-if="currency.Value > currency.Previous">
              <span class="rotate-up">❱</span>{{ `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
            </div>
            <div class="currency_gap red" v-else>
              <span class="rotate-down">❱</span>{{ `${(100 - (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currencies: [],
      currenciesPrevious: [],
      currentDate: '',
      previousDate: '',
      isPageLoading: false,
      count: 1,
    }
  },
  methods: {
    async fetchCurrencies() {
      try {
        // console.log('Now -', 0)
        this.isPageLoading = true
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        this.currentDate = response.data.Date
        this.currencies = response.data.Valute
      } catch(e) {
        console.log('ошибка 1')
      } finally {
        await this.fetchPreviousCurrencies()
      }
    },
    async fetchPreviousCurrencies() {
      try {
        // console.log('Previous -', 1)
        this.currenciesPrevious = []
        let responsePrevious = await axios.get('https://www.cbr-xml-daily.ru/archive/2022/04/01/daily_json.js')
        this.previousDate = responsePrevious.data.Date
        this.currenciesPrevious = responsePrevious.data.Valute
        this.addNewRow(this.currenciesPrevious)
      } catch(e) {
        console.log('ошибка 2')
      } finally {
        this.count += 1
        // console.log('count -', this.count)
        // if (this.count < 10) {
        //   await this.fetchPreviousCurrencies()
        // }
        // if (this.count === 10) {
        //   this.isPageLoading = false
        // }
        this.isPageLoading = false
      }
    },
    addNewRow(array) {
      let getCharsCodes = document.getElementsByClassName('currency_charcode')
        for (let item in array) {
          for (let i = 0; i < getCharsCodes.length; i++) {
            if (item === getCharsCodes[i].innerHTML) {
              let element = document.createElement('div');
              element.classList.add('currency')
              if (array[item].Value > array[item].Previous) {
                element.innerHTML = `<div></div><div>${this.previousDate.substring(0, 4)} ${this.previousDate.substring(5, 7)} ${this.previousDate.substring(8, 10)} 11:30 MSK</div><div>${array[item].Value.toFixed(2)} ₽</div><div class="currency_gap green"><span class="rotate-up">❱</span>${(-100 + (array[item].Value / array[item].Previous) * 100).toFixed(3)}%</div>`
              } else {
                element.innerHTML = `<div></div><div>${this.previousDate.substring(0, 4)} ${this.previousDate.substring(5, 7)} ${this.previousDate.substring(8, 10)} 11:30 MSK</div><div>${array[item].Value.toFixed(2)} ₽</div><div class="currency_gap red"><span class="rotate-down">❱</span>${(100 - (array[item].Value / array[item].Previous) * 100).toFixed(3)}%</div>`
              }
              getCharsCodes[i].parentNode.parentNode.childNodes[1].appendChild(element);
            }
          }
        }
    },
  },
  mounted() {
      this.fetchCurrencies()
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto Condensed', sans-serif;
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
  grid-template-columns: 14% 45% 19% 20%;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  padding: 10px 5px;
}

.currency_title {
  font-weight: 700;
  padding: 10px 5px;
}

.currency_description .currency {
  padding: 5px;
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
  box-shadow: 1px 3px 2px rgba($color: #000, $alpha: 0.05);
  margin-bottom: 12px;
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
