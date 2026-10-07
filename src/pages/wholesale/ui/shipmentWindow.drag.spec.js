import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import ShipmentWindow from './shipmentWindow.vue'

const ship = {
  table: {
    1: {
      id: 1,
      name: 'Отправитель 1',
      stores: {
        11: { id: 11, name: 'Получатель 1', orders: [{ id: 972, status: 3 }] },
        12: { id: 12, name: 'Получатель 2' },
      },
    },
    2: {
      id: 2,
      name: 'Отправитель 2',
      stores: {
        21: { id: 21, name: 'Получатель 3' },
      },
    },
  },
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

function tables(wrapper) {
  return wrapper.findAllComponents(DataTable).map((c) => c.vm)
}

describe('shipmentWindow drag', () => {
  it('mousedown по имени получателя делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const name = wrapper.find(
      '.shipment-window__table--child .shipment-window__drag .shipment-window__store-name',
    )
    expect(name.exists()).toBe(true)

    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    const tr = name.element.closest('tr')
    expect(tr).toBeTruthy()
    expect(tr.draggable).toBe(true)
  })

  it('mousedown по имени отправителя делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const name = wrapper.find(
      '.shipment-window__table--parent > .p-datatable-table-container > table > .p-datatable-tbody > tr > td > .shipment-window__drag .shipment-window__store-name',
    )
    expect(name.exists()).toBe(true)

    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    const tr = name.element.closest('tr')
    expect(tr).toBeTruthy()
    expect(tr.draggable).toBe(true)
  })

  it('dragstart строки получателя не всплывает до строки отправителя', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const all = tables(wrapper)
    const parentDT = all.find((vm) => vm.$el.classList.contains('shipment-window__table--parent'))
    const childDT = all.find((vm) => vm.$el.classList.contains('shipment-window__table--child'))
    expect(parentDT).toBeTruthy()
    expect(childDT).toBeTruthy()

    const name = wrapper.find(
      '.shipment-window__table--child .shipment-window__drag .shipment-window__store-name',
    )
    const childTr = name.element.closest('tr')
    const parentTr = childTr.closest('.shipment-window__table--parent tr')

    childTr.dispatchEvent(makeEvent('dragstart'))
    await wrapper.vm.$nextTick()

    expect(childDT.rowDragging).toBe(true)
    expect(parentDT.rowDragging).toBeFalsy()
    expect(parentTr.draggable).toBe(false)
  })

  it('перетаскивание получателя меняет порядок stores', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const names = wrapper.findAll(
      '.shipment-window__table--child .shipment-window__drag .shipment-window__store-name',
    )
    expect(names.length).toBe(3)

    const firstTr = names[0].element.closest('tr')
    const secondTr = names[1].element.closest('tr')

    firstTr.dispatchEvent(makeEvent('dragstart'))
    secondTr.dispatchEvent(makeEvent('dragover'))
    secondTr.dispatchEvent(makeEvent('drop'))
    await wrapper.vm.$nextTick()

    const ids = wrapper.vm.parents[0].stores.map((s) => s.id)
    expect(ids).toEqual([12, 11])

    const rendered = wrapper
      .findAll('.shipment-window__table--child .shipment-window__drag .shipment-window__store-name')
      .map((n) => n.text())
    expect(rendered.slice(0, 2)).toEqual(['Получатель 2', 'Получатель 1'])
  })

  it('перетаскивание отправителя меняет порядок parents', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const rows = wrapper.findAll(
      '.shipment-window__table--parent > .p-datatable-table-container > table > .p-datatable-tbody > tr',
    )
    expect(rows.length).toBe(2)

    rows[0].element.dispatchEvent(makeEvent('dragstart'))
    rows[1].element.dispatchEvent(makeEvent('dragover'))
    rows[1].element.dispatchEvent(makeEvent('drop'))
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.parents.map((p) => p.id)).toEqual([2, 1])
  })

  it('mousedown в пустой области ячейки делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const td = wrapper.find('.shipment-window__table--child .p-datatable-tbody > tr > td')
    expect(td.exists()).toBe(true)

    td.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(td.element.closest('tr').draggable).toBe(true)
  })

  it('в режиме просмотра mousedown не делает строку перетаскиваемой', async () => {
    const wrapper = mountWindow(0)
    await wrapper.vm.$nextTick()

    const name = wrapper.find(
      '.shipment-window__table--child .shipment-window__drag .shipment-window__store-name',
    )
    expect(name.exists()).toBe(true)
    name.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(name.element.closest('tr').draggable).toBe(false)
  })

  it('mousedown на карточке заказа делает строку получателя перетаскиваемой', async () => {
    const wrapper = mountWindow()
    await wrapper.vm.$nextTick()

    const order = wrapper.find('.shipment-window__order')
    expect(order.exists()).toBe(true)

    order.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(order.element.closest('tr').draggable).toBe(true)
  })
})
