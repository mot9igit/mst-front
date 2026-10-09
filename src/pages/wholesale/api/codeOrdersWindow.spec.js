import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import CodeOrdersWindow from '../ui/codeOrdersWindow.vue'

function mountWindow(props = {}) {
  return mount(CodeOrdersWindow, {
    props: { visible: true, emails: [], ...props },
    global: {
      plugins: [PrimeVue],
      stubs: {
        customModal: { template: '<div><slot /></div>' },
      },
    },
  })
}

describe('codeOrdersWindow', () => {
  it('заполняет поля емейлами, пришедшими в поставке', () => {
    const wrapper = mountWindow({ emails: ['a@b.com', 'c@d.com'] })
    const inputs = wrapper.findAll('.code-orders__input')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].element.value).toBe('a@b.com')
    expect(inputs[1].element.value).toBe('c@d.com')
  })

  it('добавляет пустое поле, если емейлы не пришли', () => {
    const wrapper = mountWindow({ emails: [] })
    const inputs = wrapper.findAll('.code-orders__input')
    expect(inputs).toHaveLength(1)
    expect(inputs[0].element.value).toBe('')
  })

  it('чекбокс "Сгенерировать новые коды" по умолчанию выключен', () => {
    const wrapper = mountWindow({ emails: ['a@b.com'] })
    expect(wrapper.vm.generate).toBe(false)
  })

  it('передает емейлы и состояние чекбокса наверх', () => {
    const wrapper = mountWindow({ emails: ['a@b.com'] })
    wrapper.vm.generate = true
    wrapper.vm.handleSubmit()
    expect(wrapper.emitted('submit')[0][0]).toEqual({
      emails: ['a@b.com'],
      generate: true,
    })
  })

  it('сбрасывает чекбокс при каждом открытии окна', async () => {
    const wrapper = mountWindow({ visible: false, emails: [] })
    await wrapper.setProps({ visible: true })
    wrapper.vm.generate = true
    await wrapper.setProps({ visible: false })
    await wrapper.setProps({ visible: true })
    expect(wrapper.vm.generate).toBe(false)
  })

  it('не отправляет при некорректном email', async () => {
    const wrapper = mountWindow({ emails: ['not-an-email'] })
    wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.find('.code-orders__input--error').exists()).toBe(true)
  })
})
