/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, forwardRef } from 'react'
import { css, /*jsx*/ } from '@emotion/core';
import { jsx } from '@emotion/react';
import Icon from './Icon'

const leftLinks = ['Upcoming', 'Previous', 'Recurring', 'Tutorials', 'Favourites']

/**
 * @function Navbar
 */
const Navbar = forwardRef((props, ref) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () =>
      window.pageYOffset > 75 ? setScrolled(true) : setScrolled(false)

    const onScroll = window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      ref={ref}
      css={[
        NavbarCSS,
        scrolled
          ? css`
              // background-color: rgb(20, 20, 20);
              // background-color: rgb(1000, 20, 20);
              // background-image: linear-gradient(
              //   to bottom,
              //   rgba(0, 0, 0, 0.7) 10%,
              //   rgba(0, 0, 0, 0)
              // );
              background-color: #151515;
              margin-top : 0px;
              transition-duration: 0.3s;
            `
          : css`
              background: transparent;
              transition-duration: 0.3s;
            `
      ]}
    >
      <ul>
        <li>
          <a href="/#/webinars" class="nav-title">
            <h2>Seminars</h2>
          </a>          
        </li>

        {leftLinks.map(link => (
          <li className="left-link" key={link}>
            <a href="/#/webinars">{link}</a>
          </li>
        ))}
      </ul>

      <ul className="right">
        <li>
          <Icon type="search" />
        </li>
        <li>
          <Icon type="bell-o" />
        </li>
      </ul>
    </nav>
  )
})

const NavbarCSS = css`
  position: fixed;
  top: 0;
  height: 90px;
  z-index: 99;
  width: 100%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  .nav-title {
    font-size: 30px;
    letter-spacing: 2px;
  }
  ul {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 50px;
    color: red;
  }
  li {
    margin: 20px;
  }
  .left-link {
    a {
      font-size: 18px;
      letter-spacing: 2px;
      transition-duration: 0.2s;
    }
  }
  .left-link:hover {
    a {
      color: rgb(170, 230, 256);
    }
  }
  ul.right {
    .Icon {
      color: white;
      cursor: pointer;
      font-size: 22px;
    }
  }
`

export default Navbar
