<template>
  <v-row justify="center" align="center">
    <div v-show="isPageLoading">
      <v-progress-circular
        :size="100"
        indeterminate
        class="mt-9"
      ></v-progress-circular>
    </div>
    <v-col cols="12" sm="10" md="9" v-show="!isPageLoading">
      <input />
      <v-card v-for="currency in currencies" :key="currency.id" class="mb-3">
        <v-card-title class="card_title">
          <div class="card_info">
            <div class="font-weight-bold">{{ currency.CharCode }}</div>
            <div v-if="currency.Nominal > 1">
              {{ currency.Nominal }} {{ currency.Name }}
            </div>
            <div v-else>{{ currency.Name }}</div>
            <div class="font-weight-bold">
              {{ `${currency.Value.toFixed(2)}₽` }}
            </div>
            <div class="green--text" v-if="currency.Value > currency.Previous">
              {{
                `${(-100 + (currency.Value / currency.Previous) * 100).toFixed(
                  3
                )}%`
              }}
              <v-icon color="green">mdi-chevron-up</v-icon>
            </div>
            <div class="red--text" v-else>
              {{
                `${(100 - (currency.Value / currency.Previous) * 100).toFixed(
                  3
                )}%`
              }}
              <v-icon color="red">mdi-chevron-down</v-icon>
            </div>
          </div>
          <v-icon class="text-h4 card_button" @click="showDialog(currency)">
            mdi-information-outline
          </v-icon>
        </v-card-title>
      </v-card>
      <v-dialog v-model="dialog" width="700">
        <v-card>
          <v-card-title class="text-h5">
            <span v-text="dialogTitle"></span>
            <v-spacer></v-spacer>
            <span v-text="dialogCode"></span>
          </v-card-title>

          <v-card-text>
            <div class="text-h6">Value: {{ dialogValue }}</div>
            <div class="text-h6">Previous: {{ dialogPrevious }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="dialog = false"> Закрыть </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "IndexPage",
  data() {
    return {
      dialog: false,
      isPageLoading: false,
      currencies: [],
      currenciesNow: [],
      dialogTitle: "",
      dialogPrevious: "",
      dialogValue: "",
      dialogCode: "",
      searchValue: "",
    };
  },
  methods: {
    async fetchCurrencies() {
      try {
        this.isPageLoading = true;
        const response = await axios.get(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        this.currencies = response.data.Valute;
      } catch (e) {
        console.log("error 1");
      } finally {
        console.log("end");
        // console.log(this.currencies)
        this.fetchCurrenciesNow();
      }
    },
    async fetchCurrenciesNow() {
      try {
        const response = await axios.get(
          "https://www.cbr-xml-daily.ru/latest.js"
        );
        this.currenciesNow = response.data.rates;
      } catch (e) {
        console.log("error 2");
      } finally {
        console.log("end 2");
        this.isPageLoading = false;
        console.log(this.currenciesNow);
      }
    },
    showDialog(item) {
      // console.log(item)
      this.dialog = true;
      if (item.Nominal > 1) {
        this.dialogTitle = `${item.Nominal} ${item.Name}`;
      } else {
        this.dialogTitle = `${item.Name}`;
      }
      this.dialogCode = item.CharCode;
      this.dialogPrevious = item.Previous;
      this.dialogValue = item.Value;
    },
  },
  mounted() {
    this.fetchCurrencies();
  },
};
</script>

<style scoped>
.card_title {
  position: relative;
}
.card_info {
  padding-right: 50px;
  display: flex;
  flex-direction: column;
}
.card_button {
  position: absolute;
  right: 10px;
}
</style>
