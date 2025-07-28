<template>
<form class="d-search header__search">
                <input
                  type="text"
                  placeholder="Найти у поставщиков"
                  class="d-search__field header__search-field"
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
                <ul class="d-search__suggestions">
                  <!-- <li class="d-search__suggestion">
													Россия, Москва, Большой Предтеченский переулок, 13с4
												</li>
												<li class="d-search__suggestion">
													Россия, Москва, Большой Предтеченский переулок, 13с4
												</li>
												<li class="d-search__suggestion">
													Россия, Москва, Большой Предтеченский переулок, 13с4
												</li>
												<li class="d-search__suggestion">
													Россия, Москва, Большой Предтеченский переулок, 13с4
												</li> -->
                </ul>
              </form>
</template>
<script>
export default {
  name: "SearchField"
}
</script>
<style lang="scss">
  .header__search-field{
    background: transparent;
  }
</style>
