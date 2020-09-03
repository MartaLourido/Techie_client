import React, { Component } from 'react'
import {Grid, Header} from  'semantic-ui-react'

export class Footer extends Component {
    render() {
        return (
          <>
       
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                {/* Extra space for a call to action inside the footer that could help re-engage users. */}
              </p>
            </Grid.Column>
          </>
        )
    }
}

export default Footer
