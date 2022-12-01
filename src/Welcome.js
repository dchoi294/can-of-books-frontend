import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Welcome extends React.Component {
  render() {
    return (
      <>
        {/* <LoginButton /> */}
        <h2>Please Log In</h2>
      </>
    )
  }
}

export default withAuth0(Welcome);
