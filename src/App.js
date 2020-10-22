import React from 'react';
import Login from './Login';
import Home from './Home';
import fire from './config/fire';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

  }

  logout = () => {
    fire.auth().signOut()
    .then(() => {
      console.log('Signed Out successfully');
    })
    .catch(err => {
      console.log(err.toString())
    });

    this.setState({
      user:null
    });
  }

  componentDidMount = () => {
    this.handle_auth_details();
  }

  handle_auth_details = () => {
    fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({user});
        } else {
          this.setState({user:null});
        }
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home user_id={this.state.user.uid} logout={this.logout} />) : (<Login />)}
      </div>
    );
  }
}

export default App;