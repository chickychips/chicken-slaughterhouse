import React from 'react'
import { Helmet } from 'react-helmet'
import Error503 from 'components/cleanui/system/Errors/503'

const System503 = () => {
  return (
    <div>
      <Helmet title="Page 503" />
      <Error503 />
    </div>
  )
}

export default System503
