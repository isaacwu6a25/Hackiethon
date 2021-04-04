/** @jsxRuntime classic */

/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

/**
 * @function DetailPaneNav
 */
const DetailPaneNav = ({ tab, tabs, setTab }) => (
  <ul css={DetailPaneNavCSS}>
    {tabs.map(tabName => (
      <li
        css={css`
          ${tabName === tab && 'border-bottom: 4px solid #e50914;'}
        `}
        key={tabName}
        onClick={() => setTab(tabName)}
      >
        {tabName}
      </li>
    ))}
  </ul>
)

const DetailPaneNavCSS = css`
  position: absolute;
  bottom: 12px;
  width: 100%;
  color: white;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;

  li {
    font-size: 15px;
    text-transform: uppercase;
    margin-right: 25px;
    color: white;
    letter-spacing: 0.5px;
    padding-bottom: 5px;
    font-weight: 500;
    cursor: pointer;
  }
`

export default DetailPaneNav
