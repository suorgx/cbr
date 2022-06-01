<template>
  <v-app>
    <v-app-bar elevation="1">
      <v-toolbar-title
        class="text-subtitle-1 text-md-h6 text-lg-h5"
        v-text="titleApp"
        style="min-width: 165px"
      />
      <v-spacer></v-spacer>
      <v-switch
        @click="toggleTheme()"
        inset
        hide-details
        style="max-width: 55px"
      ></v-switch>
      <v-icon icon="mdi-theme-light-dark"></v-icon>
    </v-app-bar>
    <v-main>
      <div
        class="h-75 w-100 d-flex flex-column justify-center align-center"
        v-if="isPageLoading === true"
      >
        <v-progress-circular :size="150" indeterminate></v-progress-circular>
      </div>
      <v-container v-if="isPageLoading === false">
        <v-card
          max-width="500"
          class="mx-auto mb-4"
          v-for="currency in currencies"
          :key="currency.id"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="
                  text-xs-h6 text-md-h5 text-lg-h5
                  pr-0
                  pl-2
                  font-weight-medium
                "
              >
                {{ currency.CharCode }}
                <span
                  v-if="currency.Value > currency.Previous"
                  class="ml-1 text-green"
                >
                  <v-icon color="green">mdi-chevron-up</v-icon>
                  {{
                    `${(
                      -100 +
                      (currency.Value / currency.Previous) * 100
                    ).toFixed(3)}%`
                  }}
                </span>
                <span v-else class="ml-1 text-red">
                  <v-icon color="red">mdi-chevron-down</v-icon>
                  {{
                    `${(
                      100 -
                      (currency.Value / currency.Previous) * 100
                    ).toFixed(3)}%`
                  }}
                </span>
              </v-card-title>
              <v-card-subtitle
                class="
                  pr-0
                  pl-2
                  text-xs-subtitle-2 text-md-subtitle-1 text-lg-subtitle-1
                "
              >
                <span v-if="currency.Nominal > 1">
                  {{ currency.Nominal }} {{ currency.Name }}
                </span>
                <span v-else>{{ currency.Name }}</span>
              </v-card-subtitle>
              <v-card-actions class="pr-0 pl-0">
                <v-btn
                  class="ml-2"
                  variant="outlined"
                  size="small"
                  @click="showDialog()"
                >
                  Подробнее
                </v-btn>
              </v-card-actions>
            </div>
            <v-card-title class="text-h4 pl-0 pr-2">
              {{ `${currency.Value.toFixed(2)}₽` }}
            </v-card-title>
          </div>
        </v-card>
      </v-container>
      <v-dialog v-model="dialog">
        <v-card>
          <v-toolbar>title</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">value</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <v-footer app>
      <span>in developing &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      isPageLoading: false,
      titleApp: "Курсы валют ЦБ РФ относительно рубля",
      currentTheme: "",
      dialog: false,
      currencies: [],
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
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
        this.isPageLoading = false;
        console.log(this.isPageLoading);
        // console.log(this.currencies)
      }
    },
  },
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme() {
        if (theme.current.value === "light") {
          theme.current.value = this.currentTheme = "dark";
        } else {
          theme.current.value = this.currentTheme = "light";
        }
      },
    };
  },
  mounted() {
    this.fetchCurrencies();
  },
};
</script>
