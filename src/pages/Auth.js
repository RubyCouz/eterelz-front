import React, {Component} from 'react'
import './Auth.css'
import AuthContext from '../context/auth-context'

class AuthPage extends Component {
    state = {
        isLogin: true
    }
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.user_loginEl = React.createRef()
        this.user_emailEl = React.createRef()
        this.user_passwordEl = React.createRef()
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin
            }
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
let user_login = ''
        if(!this.state.isLogin) {
            user_login = this.user_loginEl.current.value
        }
        const user_email = this.user_emailEl.current.value
        const user_password = this.user_passwordEl.current.value
        if (user_email.trim().length === 0 || user_password.trim().length === 0) {
            return
        }

        let requestBody = {
            query: `
                query Login($user_login: String, $user_email: String!, $user_password: String!) {
                    login(
                        user_login: $user_login,
                        user_email: $user_email,
                        user_password: $user_password
                        ) {
                        userId
                        token
                        tokenExpiration
                        }
                    }
                `,
            variables: {
                user_login: user_login,
                user_email: user_email,
                user_password: user_password
            }
        }
        if (!this.state.isLogin) {
            requestBody = {
                query: `
                mutation CreateUser($user_login: String!, $user_email: String!, $user_password: String!) {
                    createUser(userInput: {
                        user_login: $user_login,
                        user_email: $user_email,
                        user_password: $user_password
                    })
                    {
                    _id
                    user_login
                    user_email
                    }
                }
                `,
                variables: {
                    user_login: user_login,
                    user_email: user_email,
                    user_password: user_password
                }
            }
        }
        fetch('http://localhost:8080/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res => {
                if(res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json()
            })
            .then(resData => {
                if (resData.data.login) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    )
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.isLogin ? 'Connexion' : 'Inscription'}</h1>
                <form className="auth-form" onSubmit={this.submitHandler}>
                    {!this.state.isLogin &&
                    <div className="form-control">
                        <label htmlFor="user_login">Pseudo</label>
                        <input type="text" id="user_login" ref={this.user_loginEl}/>
                    </div>
                    }

                    <div className="form-control">
                        <label htmlFor="user_email">Email</label>
                        <input type="email" id="user_email" ref={this.user_emailEl}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="user_password" ref={this.user_passwordEl}/>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.switchModeHandler}>Switch
                            to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AuthPage