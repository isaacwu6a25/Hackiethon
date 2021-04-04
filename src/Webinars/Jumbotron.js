/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import Button from './Button'
import wallpaper from './img/wallpaper.jpg'

import { wrapState } from './ContentBlock.js';

// import handleHover from './ContentBlock.js'

/**
 * @function Jumbotron
 */
const Jumbotron = (props) => {

  useEffect(() => {
    // console.log(event);
  })
  // const [bgImg, setBgImg] = React.useState(null);

  // test(() => {
  //   console.log("hi")
  // });

  

  // setInterval(async () => {
  //   console.log(localStorage.getItem("hoveredImage"), bgImg)
  //   if (localStorage.getItem("hoveredImage") !== bgImg) {
  //     await setBgImg(localStorage.getItem("hoveredImage"))
  //     console.log('yes')
  //   }
  // }, 3000)

  return (
    <>
        {/* {console.log(props.event.attachments)} */}

  <div css={props.event !== null ? (props.event.attachments !== undefined && styling(props.event.attachments[0].fileId)) : styling(null)}>
    <div className="synopsis">
      {/* <img src={logo} /> */}
      <p class="quote">
      {props.event !== null ? props.event.description : "filler text"}
      </p>

      <Button icon="play">Play</Button>
      <Button icon="info-circle">More Info</Button>
    </div>

      </div>
      </>
  )
}

function styling(img) {
  return css`
    position: absolute;
    background-image: ${img !== null ? `url('http://drive.google.com/uc?export=view&id=${img}')` : `url("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png")`};
    transition: background-image 0.4s ease-in-out;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    top: 0;

    .synopsis {
      padding-top: 300px;
      padding-left: 60px;
      max-width: 500px;
      color: white;
      padding-left: 60px;

      .quote  {
        font-size: 23px;
        letter-spacing: 1px;
      }

    .Icon {
        margin-right: 10.5px;
        font-size: 18px;
      }

      Button {
        transition-duration: 0.2s;
      }

      Button:hover {
        color: rgb(150, 250, 200);
      }
    }

  `
}
export default Jumbotron
