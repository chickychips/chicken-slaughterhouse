import React from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  theme: settings.theme,
})

const Sidebar = ({ dispatch, theme }) => {
  const setTheme = nextTheme => {
    dispatch({
      type: 'settings/SET_THEME',
      payload: {
        theme: nextTheme,
      },
    })
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'menuColor',
        value: nextTheme === 'dark' ? 'dark' : 'light',
      },
    })
  }

  return (
    <div>
      <Tooltip title="Switch Dark / Light Theme" placement="left">
        <a
          role="button"
          tabIndex="0"
          onFocus={e => {
            e.preventDefault()
          }}
          onKeyPress={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          style={{ top: 'calc(10% + 60px)' }}
          className={style.cui__sidebar__toggleButton}
        >
          {theme === 'default' && <i className="fe fe-moon" />}
          {theme !== 'default' && <i className="fe fe-sun" />}
        </a>
      </Tooltip>
    </div>
  )
}

export default connect(mapStateToProps)(Sidebar)
