<template>
  <h2>{{ title }}</h2>
  <Tabs class="product-modal__info-content">
    <TabList class="product-modal__info-tabs">
      <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
        <button class="collection__tabs-link" @click.prevent="tabException = 0">
          <span>Таб1</span>
        </button>
      </div>
      <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
        <button class="collection__tabs-link" @click.prevent="tabException = 1">
          <span>Таб2</span>
        </button>
      </div>
    </TabList>

    <TabPanels>
      <TabPanel v-if="tabException == 0"> таб1 </TabPanel>
      <TabPanel v-else> таб2 </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script>
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'

export default {
  name: 'modalDash',
  data() {
    return {
      tabException: 0,
    }
  },
  emits: ['close'],
  components: { Tabs, TabPanels, TabPanel, TabList },
  props: {
    tabs: {
      type: Object,
      default: () => {
        return {}
      },
    },
    title: {
      type: String,
      default: 'Дашборд',
    },
  },
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
}
</script>

<style lang="scss"></style>
