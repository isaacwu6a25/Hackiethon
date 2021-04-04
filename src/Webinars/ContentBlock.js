/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import DetailPane from './DetailPane/DetailPane'

export const wrapState = (stateVar) => ({
  hoveredState: stateVar
})

/**
 * @function ContentBlock
 */
const ContentBlock = (props) => {
  const [hovered, setHovered] = useState(false)

  const handleHover = useCallback(e => {
    // console.log(props.event);
    if (e.type === "mouseenter") {
      props.hoverContentBlock(props.event);
      setHovered(e.target.getAttribute('data-img'))
    }
    else {
      props.hoverContentBlock(null);
      setHovered(false);
    }

  }, [])


  return (
    // <div>
    <div
      className="ContentBlock"
      data-img={props.event.attachments[0].fileId}
      css={ContentBlockCSS}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {/* {console.log("HERE: ", img.split("/")[5])} */}
      {props.event.attachments[0].fileId === hovered && <div className="content">{props.children}</div>}
      {/* {console.log(props.event.attachments[0].title, props.event.attachments[0].fileUrl)} */}
      {/* {props.event.attachments[0].title.split(".")[1] === "mp4" ? console.log(props.event.attachments[0].title.split(".")[1]) : console.log("false")} */}
      {props.event.attachments[0].title.split(".")[1] === "mp4" ? <iframe src={`https://drive.google.com/file/d/${props.event.attachments[0].fileId}/preview`} allow="autoplay"></iframe>  :
        (props.event.attachments[0].fileId === null
          ? <img src="" alt='random webinar' />
          : <img src={`https://drive.google.com/thumbnail?id=${props.event.attachments[0].fileId}`} alt='random webinar' />)
      }
          
      </div>
      /* <DetailPane category = {"test"} /> */
    // </div>
    
    
  )
}

const ContentBlockCSS = css`
  position: relative;

  .content {
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
    transition: background-color ease 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.65);
      cursor: pointer;


    }

    .Icon {
      font-size: 32px;

    }

    .Icon:first-of-type {
      color: red;
      margin-right: 25px;
    }

    .Icon:last-of-type {
      color: white;
    }
  }

  img {
    height: 100%;
    width: 250px;
    pointer-events: none;
    border-radius: 0px;
  }
`

export default ContentBlock
