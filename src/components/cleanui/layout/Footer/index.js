import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerInner}>
        <a href="" target="_blank" rel="noopener noreferrer" className={style.logo}>
          RPA
          <span />
        </a>
        <br />
        <p className="mb-0">
          Copyright © 2020 RPA |{' '}
          <a href="" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
