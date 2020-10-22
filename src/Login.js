import React from 'react';
import fire from './config/fire';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    login = () => {
        const email = this.state.email;
        const password = this.state.password;

        fire.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
            alert('No Such user exists');
        });
    }

    signup = () => {
        const email = this.state.email;
        const password = this.state.password;

        fire.auth().createUserWithEmailAndPassword(email, password)
        .catch(err => {
            console.log(`Error ${err.toString()}`);
        });
    }

    handle_email_change = e => {
        this.setState({
            email: e.target.value
        });
    }

    handle_password_change = e => {
        this.setState({
            password:e.target.value
        });
    }
    render() {
        return (
            <section className="section">      
                    <div className="columns">
                        <div className="column is-4 is-offset-4">
                            <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input onChange={this.handle_email_change} value={this.state.email} className="input" type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                <i className="fa fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fa fa-check"></i>
                                </span>
                            </p>
                            </div>
                            <div className="field">
                            <p className="control has-icons-left">
                                <input value={this.state.password} onChange={this.handle_password_change} className="input" type="password" placeholder="Password" />
                                <span className="icon is-small is-left">
                                <i className="fa fa-lock"></i>
                                </span>
                            </p>
                            </div>
                            <div className="field">
                            <p className="control">
                                <button onClick={this.login} className="button is-success">
                                Login
                                </button>
                            </p>
                            </div>
                            <div className="field">
                            <p className="control">
                                <button onClick={this.signup} className="button is-success">
                                Sign Up
                                </button>
                            </p>
                            </div>
                        </div>         
                    </div>
      </section>
        );
    }
}


export default Login;