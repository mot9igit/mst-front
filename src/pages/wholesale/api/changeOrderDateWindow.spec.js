import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ChangeOrderDateWindow from '../ui/changeOrderDateWindow.vue'

function mountWindow(props = {}) {
  return mount(ChangeOrderDateWindow, {
    props: {
      order: { id: 972 },
      dates: [new Date(2026, 9, 15), new Date(2026, 9, 20)],
      ...props,
    },
    global: {
      plugins: [PrimeVue],
    },
  })
}

describe('changeOrderDateWindow', () => {
  it('показывает номер заказа в заголовке', () => {
    const wrapper = mountWindow()
    expect(wrapper.find('.change-order-date__title').text()).toContain('№972')
  })

  it('без дат показывает сообщение и блокирует Ок', async () => {
    const wrapper = mountWindow({ dates: [] })
    expect(wrapper.find('.change-order-date__empty').exists()).toBe(true)
    const ok = wrapper
      .findAll('button')
      .find((b) => b.text() === 'Ок')
    expect(ok.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.catalog-filters-dates').exists()).toBe(false)
  })

  it('клик по Ок без выбранной даты даёт ошибку и не эмитит submit', async () => {
    const wrapper = mountWindow()
    const ok = wrapper.findAll('button').find((b) => b.text() === 'Ок')
    await ok.trigger('click')
    expect(wrapper.find('.d-input-error__text').text()).toContain('выберите дату')
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('клик по Ок с выбранной датой эмитит submit с этой датой', async () => {
    const wrapper = mountWindow()
    const picked = new Date(2026, 9, 15)
    wrapper.vm.date = picked
    const ok = wrapper.findAll('button').find((b) => b.text() === 'Ок')
    await ok.trigger('click')
    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].getTime()).toBe(picked.getTime())
  })

  it('Отмена эмитит cancel', async () => {
    const wrapper = mountWindow()
    const cancel = wrapper.findAll('button').find((b) => b.text() === 'Отмена')
    await cancel.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('инпут календаря получает фокус при открытии (панель открывается сразу)', async () => {
    const wrapper = mount(ChangeOrderDateWindow, {
      attachTo: document.body,
      props: {
        order: { id: 972 },
        dates: [new Date(2026, 9, 15), new Date(2026, 9, 20)],
      },
      global: { plugins: [PrimeVue] },
    })
    await wrapper.vm.$nextTick()
    await new Promise((r) => setTimeout(r, 20))
    const input = wrapper.find('.catalog-filters-dates input')
    expect(input.exists()).toBe(true)
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-expanded')).toBe('true')
    const panel = document.querySelector('.change-order-date__panel')
    expect(panel).toBeTruthy()
    wrapper.unmount()
  })

  it('в панели есть класс для подсветки доступных дат', async () => {
    const wrapper = mount(ChangeOrderDateWindow, {
      attachTo: document.body,
      props: {
        order: { id: 972 },
        dates: [new Date(2026, 9, 15)],
      },
      global: { plugins: [PrimeVue] },
    })
    await wrapper.vm.$nextTick()
    await new Promise((r) => setTimeout(r, 20))
    const panel = document.querySelector('.change-order-date__panel')
    expect(panel).toBeTruthy()
    wrapper.unmount()
  })

  it('вычисляет minDate/maxDate и disabledDates как дополнение разрешённых дат', () => {
    const wrapper = mountWindow({
      dates: [new Date(2026, 9, 15), new Date(2026, 9, 20)],
    })
    const vm = wrapper.vm
    expect(vm.minDate.getTime()).toBe(new Date(2026, 9, 15).getTime())
    expect(vm.maxDate.getTime()).toBe(new Date(2026, 9, 20).getTime())
    const disabledKeys = vm.disabledDates.map((d) => d.getDate())
    expect(disabledKeys).toEqual([16, 17, 18, 19])
  })

  it('текущая дата отгрузки проставляется в календарь сразу', () => {
    const wrapper = mountWindow({
      dates: [new Date(2026, 9, 15), new Date(2026, 9, 20)],
      currentDate: '2026-10-15',
    })
    expect(wrapper.vm.date).toBeTruthy()
    expect(wrapper.vm.date.getDate()).toBe(15)
    expect(wrapper.vm.date.getMonth()).toBe(9)
    expect(wrapper.vm.date.getFullYear()).toBe(2026)
  })

  it('текущая дата не входит в disabledDates — её можно выбрать', () => {
    const wrapper = mountWindow({
      dates: [new Date(2026, 9, 15), new Date(2026, 9, 20)],
      currentDate: '2026-10-20',
    })
    const disabled = wrapper.vm.disabledDates.map(
      (d) => d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
    )
    expect(disabled).not.toContain('2026-9-20')
    expect(wrapper.vm.date.getDate()).toBe(20)
  })

  it('панель календаря открывается даже без фокуса на инпуте', async () => {
    const wrapper = mount(ChangeOrderDateWindow, {
      attachTo: document.body,
      props: {
        order: { id: 972 },
        dates: [new Date(2026, 9, 15)],
      },
      global: { plugins: [PrimeVue] },
    })
    await wrapper.vm.$nextTick()
    await new Promise((r) => setTimeout(r, 20))
    const picker = wrapper.vm.$refs.datepicker
    picker.overlayVisible = false
    wrapper.vm.openPicker()
    await wrapper.vm.$nextTick()
    expect(picker.overlayVisible).toBe(true)
    wrapper.unmount()
  })
})
