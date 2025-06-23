import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonComponent from '../../src/components/ButtonComponent.vue'

describe('ButtonComponent', () => {
  it('should apply primary classes when type is primary and selected is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'primary',
        selected: true,
        label: 'Test Button',
      },
    })
    expect(wrapper.classes()).toContain('bg-light-carmine')
    expect(wrapper.classes()).toContain('dark:bg-dark-scarlet')
  })

  it('should apply unselected classes when selected is false', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'primary',
        selected: false,
        label: 'Test Button',
      },
    })

    expect(wrapper.classes()).toContain('bg-light-pale-grey')
    expect(wrapper.classes()).toContain('dark:bg-dark-pale-grey')
  })

  it('should apply icon classes when type is icon', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'icon',
        selected: true,
        label: 'Test Button',
      },
    })
    expect(wrapper.classes()).toContain('w-[50px]')
    expect(wrapper.classes()).toContain('h-[30px]')
  })

  it('should apply default primary classes when type is not provided and selected is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        // type: undefined,
        selected: true,
        label: 'Test Button',
      },
    })
    expect(wrapper.classes()).toContain('bg-light-carmine')
  })

  it('should combine custom className prop', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        type: 'primary',
        selected: true,
        label: 'Test Button',
        className: 'custom-class another-custom-class',
      },
    })
    expect(wrapper.classes()).toContain('bg-light-carmine')
    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.classes()).toContain('another-custom-class')
  })

  it('should render the label text', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        label: 'Click Me',
      },
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        label: 'Click Me',
        onClick: vi.fn(),
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  it('should apply disabled attribute when disabled prop is true', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        label: 'Disabled',
        disabled: true,
      },
    })
    expect(wrapper.attributes().disabled).toBe('')
  })

  it('should not apply disabled attribute when disabled prop is false', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        label: 'Not Disabled',
        disabled: false,
      },
    })
    expect(wrapper.attributes().disabled).toBeUndefined()
  })

  it('should render the icon slot content', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        label: 'Button with Icon',
      },
      slots: {
        icon: '<svg data-test="icon-svg"></svg>',
      },
    })
    expect(wrapper.find('[data-test="icon-svg"]').exists()).toBe(true)
  })

  it('should set the button type to "button"', () => {
    const wrapper = mount(ButtonComponent)
    expect(wrapper.attributes().type).toBe('button')
  })

  it('should set the selected attribute on the button element', () => {
    const wrapper = mount(ButtonComponent, {
      props: { selected: true, label: 'Test' },
    })
    expect(wrapper.attributes().selected).toBe('true')
  })

  it('should not set the selected attribute if selected is false', () => {
    const wrapper = mount(ButtonComponent, {
      props: { selected: false, label: 'Test' },
    })
    expect(wrapper.attributes().selected).toBe('false')
  })
})
