import { Component } from 'react'

import Layout from 'components/layout'
import Welcome from 'components/welcome'

class IndexPage extends Component {
  render () {
    return (
      <Layout>
        <Welcome />
      </Layout>
    )
  }
}

export default IndexPage
