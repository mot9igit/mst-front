import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ShipmentWindow from '../ui/shipmentWindow.vue'

const ship = {
  table: [
    { id: 1, role: 'sender', role_label: 'Отправитель', name: 'Отправитель 1' },
    {
      id: 11,
      role: 'receiver',
      role_label: 'Получатель',
      name: 'Получатель 1',
      orders: [{ id: 972, status: 3 }],
    },
    { id: 12, role: 'receiver', role_label: 'Получатель', name: 'Получатель 2' },
    { id: 2, role: 'sender', role_label: 'Отправитель', name: 'Отправитель 2' },
    { id: 21, role: 'receiver', role_label: 'Получатель', name: 'Получатель 3' },
  ],
}

function makeEvent(type) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'dataTransfer', {
    value: { setData: vi.fn(), getData: vi.fn(() => '') },
  })
  Object.defineProperty(event, 'pageY', { value: 10 })
  return event
}

function mountWindow(mode = 1) {
  return mount(ShipmentWindow, {
    props: { ship, mode },
    global: {
      plugins: [PrimeVue],
      mocks: {
        $store: {
          getters: { 'addition/regions': [] },
          dispatch: vi.fn(() => Promise.resolve()),
        },
      },
    },
  })
}

function nameRow(wrapper, text) {
  const name = wrapper
    .findAll('.shipment-window__table--parent .shipment-window__store-name')
    .find((n) => n.text() === text)
  return name.element.closest('tr')
}

describe('shipmentWindow drag', () => {
  it('mousedown по имени получателя делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const name = wrapper
      .findAll('.shipment-window__table--parent .shipment-window__store-name')
      .find((n) => n.text() === 'Получатель 1')
    expect(name).toBeTruthy()

    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    const tr = name.element.closest('tr')
    expect(tr).toBeTruthy()
    expect(tr.draggable).toBe(true)
  })

  it('mousedown по имени отправителя делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const name = wrapper
      .findAll('.shipment-window__table--parent .shipment-window__store-name')
      .find((n) => n.text() === 'Отправитель 1')
    expect(name).toBeTruthy()

    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    const tr = name.element.closest('tr')
    expect(tr).toBeTruthy()
    expect(tr.draggable).toBe(true)
  })

  it('перетаскивание меняет порядок точек маршрута', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const rows = wrapper.findAll(
      '.shipment-window__table--parent > .p-datatable-table-container > table > .p-datatable-tbody > tr',
    )
    expect(rows.length).toBe(5)

    rows[0].element.dispatchEvent(makeEvent('dragstart'))
    rows[1].element.dispatchEvent(makeEvent('dragover'))
    rows[1].element.dispatchEvent(makeEvent('drop'))
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.parents.map((p) => p.id)).toEqual([11, 1, 12, 2, 21])
  })

  it('mousedown в пустой области ячейки делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const td = wrapper.find('.shipment-window__table--parent .p-datatable-tbody > tr > td')
    expect(td.exists()).toBe(true)

    td.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(td.element.closest('tr').draggable).toBe(true)
  })

  it('в режиме просмотра mousedown не делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow(0)
    await wrapper.vm.$nextTick()

    const name = wrapper
      .findAll('.shipment-window__table--parent .shipment-window__store-name')
      .find((n) => n.text() === 'Получатель 1')
    expect(name).toBeTruthy()
    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(name.element.closest('tr').draggable).toBe(false)
  })

  it('mousedown на карточке заказа делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const order = wrapper.find('.shipment-window__order')
    expect(order.exists()).toBe(true)

    order.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(order.element.closest('tr').draggable).toBe(true)
  })

  it('бейдж подписывается role_label из данных', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const badges = wrapper.findAll('.shipment-window__store-badge')
    expect(badges.map((b) => b.text())).toEqual([
      'Отправитель',
      'Получатель',
      'Получатель',
      'Отправитель',
      'Получатель',
    ])
  })

  it('buildTableOrder формирует ключи sender_/receiver_', () => {
    const wrapper = mountWindow()
    expect(wrapper.vm.buildTableOrder()).toEqual([
      'sender_1',
      'receiver_11',
      'receiver_12',
      'sender_2',
      'receiver_21',
    ])
  })

  it('parseShipmentDateTime сохраняет wall-clock время из строки отгрузки', () => {
    const wrapper = mountWindow()
    const d = wrapper.vm.parseShipmentDateTime('2026-10-08 15:30:00')
    expect(d).toBeInstanceOf(Date)
    expect(d.getFullYear()).toBe(2026)
    expect(d.getMonth()).toBe(9)
    expect(d.getDate()).toBe(8)
    expect(d.getHours()).toBe(15)
    expect(d.getMinutes()).toBe(30)
  })

  it('в режиме просмотра чекбокс заблокирован и отражает значение отгрузки', () => {
    const wrapper = mountWindow(0)
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.attributes('disabled')).toBeDefined()
    expect(wrapper.vm.stopRedistribution).toBe(false)
  })

  it('в режиме редактирования чекбокс меняет form.stop_redistribution и уходит в submit', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBeUndefined()

    await checkbox.setValue()
    expect(wrapper.vm.form.stop_redistribution).toBe(true)

    wrapper.vm.v$.$touch = vi.fn()
    wrapper.vm.v$.$error = false
    wrapper.vm.form.dateTime = new Date()
    wrapper.vm.form.location = 1
    wrapper.vm.handleSubmit()

    expect(wrapper.emitted('submit')[0][0].stop_redistribution).toBe(true)
  })
})