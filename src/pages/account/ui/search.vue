<template>
  <form class="d-search header__search" @submit.prevent="toSearch()">
    <input
      type="text"
      placeholder="Найти у поставщиков"
      class="d-search__field header__search-field"
      @focus="
        (event) => {
          event.target.select()
        }
      "
      v-model="search"
    />
    <button
      type="submit"
      class="d-button d-button-primary d-button-primary-small box-shadow-none d-search__button header__search-button"
    >
      Найти
    </button>
    <button type="submit" class="d-search__icon-button header__search-icon-button">
      <i class="d-icon-search-big header__icon-button-icon"></i>
    </button>
    <ul
      class="d-search__suggestions"
      v-if="this.showSearchSuggestions"
      :class="{
        ['d-search__suggestions--active']: this.showSearchSuggestions,
      }"
    >
      <li
        class="d-search__suggestion"
        v-for="(suggestion, index) in searchSuggestions"
        :key="index"
        @click="
          () => {
            this.search = suggestion.name
            this.toSearch()
          }
        "
      >
        <div class="d-search__suggestion-card">
          <img :src="suggestion.image" alt="" class="d-search__suggestion-card__img" />
          <div class="d-search__suggestion-card__content">
            <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
            <span class="d-search__suggestion-card__article">арт. {{ suggestion.article }}</span>
          </div>
        </div>
      </li>
    </ul>
  </form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'SearchField',
  data() {
    return {
      loading: false,
      search: '',
      showSearchSuggestions: false,
      searchSuggestions: [],
      searchTimer: null,
    }
  },
  props: {
    searchUpdater: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      getOptProductsSearch: 'catalog/getOptProductsSearch',
      getOfferOptProductsSearch: 'offer/getOfferOptProductsSearch',
    }),
    toSearch() {
      if (this.search.length < 3 && this.search.length > 0) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Предупреждение поиска',
          detail: 'Длина поиска должна быть больше двух символов',
          life: 3000,
        })
        return
      }
      this.showSearchSuggestions = false
      if (this.$router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer') {
        this.$router.push({
          name: 'purchasesCatalogSearchOffer',
          query: {
            search: this.search,
          },
        })
      } else {
        this.$router.push({ name: 'purchasesCatalogSearch', query: { search: this.search } })
      }
    },

    async searchProducts() {
      if (this.search.length < 3 && this.search.length > 0) return
      this.searchSuggestions = []
      const data = {
        search: this.search,
        page: 1,
        perpage: 5,
      }
      let response = {}
      if (this.$router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer') {
        response = await this.getOfferOptProductsSearch(data)
      } else {
        response = await this.getOptProductsSearch(data)
      }
      return response.data.data.items
    },
    debounce(func, delay) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(func, delay)
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
    }
  },
  watch: {
    search(newVal) {
      if ((newVal.length < 3 && newVal.length > 0) || newVal == this.$route.query.search) {
        this.showSearchSuggestions = false
        return
      } else {
        if (newVal.length == 0) {
          this.toSearch()
        }
      }

      this.showSearchSuggestions = !!newVal

      this.debounce(async () => {
        // console.log(await this.searchProducts());
        this.searchSuggestions = await this.searchProducts()
      }, 300)
    },
    $route() {
      if (this.$route.query.search) {
        this.showSearchSuggestions = false
        this.search = this.$route.query.search
      } else {
        this.search = ''
      }
    },
    searchUpdater: function (newVal) {
      if (newVal == true) {
        this.debounce(async () => {
          // console.log(await this.searchProducts());
          this.searchSuggestions = await this.searchProducts()
        }, 300)
      }
    },
  },
}
</script>
<style lang="scss">
.header__search-field {
  background: transparent;
}
.d-search {
  position: relative;
  display: block;
  box-shadow: none;
  border: none;
  background: transparent;
  .d-search__field {
    display: block;
    padding: 5px 100px 5px 15px;
    margin: 0;
    width: 100%;
    border-radius: 30px;
    position: relative;
    background: #fff;
    box-shadow: 0px 4px 13.4px 0px rgba(0, 0, 0, 0.2588235294);
    border: 3px solid #ffffff;
    width: 100%;
  }
  .d-search__button,
  .header__search-icon-button {
    position: absolute;
    height: auto;
    max-height: 90%;
    min-height: auto;
    right: 2px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .d-search__field,
  .d-search__button,
  .header__search-icon-button {
    z-index: 3;
  }
  .d-search__suggestions {
    top: 0;
    left: 0;
    padding: 60px 4px 10px 4px !important;
    z-index: 1;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    background: #ededed;
    max-height: 500px;
    overflow-y: hidden;
    .d-search__suggestion-card {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        border-radius: 4px;
      }
      .d-search__suggestion-card__content {
        padding-left: 10px;
        span {
          display: block;
          &.d-search__suggestion-card__title {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 1.3;
            color: #282828;
          }
          &.d-search__suggestion-card__article {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #757575;
          }
        }
      }
    }
    li {
      border-radius: 3px;
      &:hover {
        background: #fbfbfb;
      }
    }
  }
}
.d-search .d-search__suggestions .d-search__suggestion-card img {
  min-height: 50px;
  max-height: 50px;
  object-fit: cover;
}
</style>
