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
      <summary class="currency currency_marker">
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
          <span class="rotate-up"></span>{{ `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
        </div>
        <div class="currency_gap red" v-else>
          <span class="rotate-down"></span>{{ `${(100 - (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
        </div>
      </summary>
      <div class="currency_description">
        <div class="currency">
          <div></div>
          <div>{{  `${this.dailyDate.substring(0, 4)} ${this.dailyDate.substring(5, 7)} ${this.dailyDate.substring(8, 10)} ${this.dailyDate.substring(11, 16)} MSK` }}</div>
          <div>{{  `${currency.Value.toFixed(2)} ₽` }}</div>
          <div>
            <div class="currency_gap green" v-if="currency.Value > currency.Previous">
              <span class="rotate-up"></span>{{ `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
            </div>
            <div class="currency_gap red" v-else>
              <span class="rotate-down"></span>{{ `${(100 - (currency.Value / currency.Previous) * 100).toFixed(3)}%` }}
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
      dailyDate: '',
      currentDate: '',
      previousDate: '',
      dayOfMonth: '',
      isPageLoading: false,
      count: 1,
    }
  },
  methods: {
    async fetchCurrencies() {
      try {
        this.isPageLoading = true
        const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        this.currentDate = this.dailyDate = response.data.Date
        this.previousDate = response.data.PreviousDate
        this.currencies = response.data.Valute
      } catch(e) {
        console.log('ошибка 1')
      } finally {
        await this.fetchPreviousCurrencies()
      }
    },
    async fetchPreviousCurrencies() {
      try {
        this.currenciesPrevious = []
        let responsePrevious = await axios.get(`https://www.cbr-xml-daily.ru/archive/${this.getPreviousDay(this.currentDate.substring(0, 4), this.currentDate.substring(5, 7), this.currentDate.substring(8, 10))}/daily_json.js`)
        this.previousDate = responsePrevious.data.PreviousDate
        this.currentDate = responsePrevious.data.Date
        this.currenciesPrevious = responsePrevious.data.Valute
        this.addNewRow(this.currenciesPrevious)
        this.count += 1
      } catch(e) {
        console.log('ошибка 2')
        this.dayOfMonth = (this.previousDate.substring(8, 10) < 10) ? `0${Number(this.previousDate.substring(8, 10))+1}` : `${Number(this.previousDate.substring(8, 10))+1}`
        this.currentDate = this.previousDate.substring(0, 8) + this.dayOfMonth + this.previousDate.substring(10)
      } finally {
        // console.log('count -', this.count)
        if (this.count < 10) {
          await this.fetchPreviousCurrencies()
        }
        if (this.count >= 10) {
          this.isPageLoading = false
        }
        // this.isPageLoading = false
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
                element.innerHTML = `<div></div><div>${this.currentDate.substring(0, 4)} ${this.currentDate.substring(5, 7)} ${this.currentDate.substring(8, 10)} ${this.currentDate.substring(11, 16)}  MSK</div><div>${array[item].Value.toFixed(2)} ₽</div><div class="currency_gap green"><span class="rotate-up"></span>${(-100 + (array[item].Value / array[item].Previous) * 100).toFixed(3)}%</div>`
              } else {
                element.innerHTML = `<div></div><div>${this.currentDate.substring(0, 4)} ${this.currentDate.substring(5, 7)} ${this.currentDate.substring(8, 10)} ${this.currentDate.substring(11, 16)} MSK</div><div>${array[item].Value.toFixed(2)} ₽</div><div class="currency_gap red"><span class="rotate-down"></span>${(100 - (array[item].Value / array[item].Previous) * 100).toFixed(3)}%</div>`
              }
              getCharsCodes[i].parentNode.parentNode.childNodes[1].appendChild(element);
            }
          }
        }
    },
    getPreviousDay(year, month, day) {
      let thisDay = new Date(year, month-1, day)
      thisDay = thisDay.toISOString()
      return `${thisDay.substring(0, 4)}/${thisDay.substring(5, 7)}/${thisDay.substring(8, 10)}`
    }
  },
  mounted() {
      this.fetchCurrencies()
  },
}
</script>

<style lang="css">
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
  padding: 10px 5px 10px 15px;
}
.currency_title {
  font-weight: 700;
  padding: 10px 5px 10px 15px;
}
.currency_description .currency {
  padding: 4px 5px 4px 15px;
}
.currency_marker {
  position: relative;
}
.currency_marker::before {
  position: absolute;
  content: '›';
  left: 7.5px;
}
details[open] .currency_marker::before {
  content: '-';
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
  box-shadow: 1px 4px 4px 1px rgba(34, 60, 80, 0.1);
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
  align-items: center;
}
.rotate-up, .rotate-down {
  display: block;
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-right: 2px;
}
.rotate-up {
  background: transparent url(@/img/arrowup.svg) no-repeat center / 90%;
}
.rotate-down {
  background: transparent url(@/img/arrow.svg) no-repeat center / 90%;
  transform: rotate(180deg);
}
details[open] summary ~ * {
  animation: uncover 0.3s linear;
}
@keyframes uncover {
  0%    {opacity: 0; margin-top: -10px}
  100%  {opacity: 1; margin-top: 0px}
}

@media screen and (min-width: 521px) {
  body {
    padding: 2.5vw;
  }
  .currency {
    font-size: 3vw;
    line-height: 3.2vw;
    padding: 2.5vw 1.25vw 2.5vw 3.75vw;
  }
  .currency_title {
    padding: 2.5vw 1.25vw 2.5vw 3.75vw;
  }
  .currency_description .currency {
    padding: 1.25vw 1.25vw 1.25vw 3.75vw;
  }
  details, .currency_title {
    margin-bottom: 2.5vw;
  }
  .currency_marker::before {
    left: 2vw;
  }
  .rotate-up, .rotate-down {
    width: 1.5vw;
    height: 1.5vw;
    margin-right: 0.25vw
  }
}

@media screen and (min-width: 900px) {
  body {
    padding: 2vw;
  }
  .currency {
    font-size: 2vw;
    line-height: 2.1vw;
    padding: 1.7vw 0.8vw 1.7vw 2.5vw;
  }
  .currency_title {
    padding: 1.7vw 1.25vw 1.7vw 2.5vw;
  }
  .currency_description .currency {
    padding: 0.8vw 0.8vw 0.8vw 2.5vw;
  }
  details, .currency_title {
    margin-bottom: 1.7vw;
  }
  .currency_marker::before {
    left: 1.3vw;
  }
  .rotate-up, .rotate-down {
    width: 1vw;
    height: 1vw;
    margin-right: 0.17vw
  }
} 
</style>
