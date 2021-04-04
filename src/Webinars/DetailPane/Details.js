/** @jsxRuntime classic */

/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

/**
 * @function Details
 */
const Details = () => (
  <div css={DetailsCSS}>
    {DETAILS_COLUMNS.map(column => (
      <ul key={column.title}>
        <li>{column.title}</li>
        {column.content.map(content => (
          <li key={content}>{content}</li>
        ))}
      </ul>
    ))}
  </div>
)

const DetailsCSS = css`
  display: flex;

  ul {
    margin-right: 6%;
  }

  li:first-of-type {
    color: #999;
    margin-bottom: 5px;
  }

  li {
    color: white;
  }
`

const DETAILS_COLUMNS = [
  { title: 'Creator', content: ['Jane Doe'] },
  {
    title: 'Cast',
    content: [
      'Emma',
      'Olivia',
      'Ava',
      'Isabella',
      'Sophia',
      'Charlotte',
      'Mia',
      'Amelia'
    ]
  },
  {
    title: 'Additional Cast',
    content: [
      'Emma',
      'Olivia',
      'Ava',
      'Isabella',
      'Sophia',
      'Charlotte',
      'Mia',
      'Amelia'
    ]
  },
  {
    title: 'Genres',
    content: [
      'Action',
      'Animation',
      'Comedy',
      'Crime',
      'Drama',
      'Experimental',
      'Fantasy',
      'Historical',
      'Horror',
      'Romance',
      'Science Fiction',
      'Thriller'
    ]
  }
]

export default Details
