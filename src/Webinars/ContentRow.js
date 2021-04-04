/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from 'theme-ui';

import React, { Component, useCallback, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import ContentBlock from './ContentBlock'
import Icon from './Icon'

import one from './img/one.jpg'
import two from './img/two.jpg'
import three from './img/three.jpg'
import four from './img/four.jpg'
import five from './img/five.jpg'
import six from './img/six.jpg'

const content = [one, two, three, four, five, six] //images from the gapi call



/**
 * @function ContentRow
 */
const ContentRow = ({ category, setActive, events, changePreview }) => {
  const getPos = useCallback(e => {
    // console.log('pos')
    const pos = e.target.parentElement.getBoundingClientRect()
    setActive({ category, pos })
  }, [])

  const hoverContentBlock = (event) => {
    // console.log(event)

    changePreview(event);
      
  }


  return (
    <div
      className="ContentRow"
      css={css`
        // padding-left: 50px;
        padding: 0 40px 0 40px;
        display: flex;
        justify-content: start;

        .ContentBlock {
          display: flex;
          flex-shrink: 0;
          margin-right: 4px;
        }
      `}
    >
      <div
        css={css`
          h2 {
            margin: 20px 0 10px;
            color: white;
          }

          .block-wrapper {
            display: flex;
            flex-direction: row;
            position: relative;
            overflow-x: scroll;

            width: 100%;
            height: 170px;

            position: relative;
          }
        `}
      >
        <h2>{category}</h2>
          
        <div className="block-wrapper">

          {events.map(event => {
            // { console.log("attachment: ", event.summary) }
            return (
              <ContentBlock hoverContentBlock={hoverContentBlock} event={event} /* img={event.attachments !== undefined ? event.attachments[0].fileUrl : null}*/>
              <Icon type="play" />
              <Icon type="info-circle" onClick={getPos} />
            </ContentBlock>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default ContentRow
