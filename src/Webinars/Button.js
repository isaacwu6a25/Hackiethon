import React from 'react'
import { css, jsx } from '@emotion/core'
import Icon from './Icon'

/**
 * @function Button
 */
const Button = ({ children, type, icon, onClick }) => (
  <button type={type} onClick={onClick}>
    {icon && <Icon type={icon} />}
    {children}
  </button>
)

Button.defaultProps = {
  type: 'button',
  icon: null,
  onClick: null
}

export default Button
