type ButtonType = 'primary' | 'unselected'

export interface ButtonProps {
  /**
   * Button label
   */
  label: string

  /**
   * Button type, e.g., 'primary'.
   */
  type?: ButtonType

  /**
   * Whether the button is disabled
   */
  disabled?: boolean

  /**
   * Additional CSS classes for the button
   */
  className?: string

  /**
   * Whether the button is selected
   */
  selected?: boolean

  /**
   * Click event handler
   */
  onClick?: (event: MouseEvent) => void
}
