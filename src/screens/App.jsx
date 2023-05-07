import React from 'react';

import './App.css';
import '../components/inputs/Inputs.css'

import BlueButton from "../components/buttons/BlueButton";
import GlobalHeader from "../components/headers/GlobalHeader";
import MainBlock from "../blocks/MainBlock";

class App extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            csrf: "",
            username: "",
            password: "",
            error: "",
            isAuthenticated: false,
        };
    }

    componentDidMount = () => {
        this.getSession();
    }

    getCSRF = () => {
        fetch("api/csrf/", {
            credentials: "include",
        })
            .then((res) => {
                let csrfToken = res.headers.get("X-CSRFToken");
                this.setState({csrf: csrfToken});
                console.log(csrfToken);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getSession = () => {
        fetch("api/session/", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.isAuthenticated) {
                    this.setState({isAuthenticated: true});
                    sessionStorage.setItem("auth_key", 'true');
                } else {
                    this.setState({isAuthenticated: false});
                    sessionStorage.setItem("auth_key", 'false');
                    this.getCSRF();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleUserNameChange = (event) => {
        this.setState({username: event.target.value});
    }

    isResponseOk(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    login = (event) => {
        event.preventDefault();
        fetch("api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.state.csrf,
            },
            credentials: "include",
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })
            .then(this.isResponseOk)
            .then((data) => {
                console.log(data);
                this.setState({isAuthenticated: true, username: "", password: "", error: ""});
                sessionStorage.setItem("username_key", data.username);
                sessionStorage.setItem("firstname_key", data.first_name);
                sessionStorage.setItem("lastname_key", data.last_name);
                sessionStorage.setItem("group_key", data.group);
                sessionStorage.setItem("auth_key", 'true');
            })
            .catch((err) => {
                console.log(err);
                this.setState({error: "Wrong username or password"});
            });
    }

    logout = () => {
        fetch("api/logout", {
            credentials: "include",
        })
            .then(this.isResponseOk)
            .then((data) => {
                console.log(data);
                this.setState({isAuthenticated: false});
                sessionStorage.clear();
                this.getCSRF();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    who = () => {
        fetch("api/whoami/", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sessionStorage.setItem("username_key", data.username);
                sessionStorage.setItem("firstname_key", data.first_name);
                sessionStorage.setItem("lastname_key", data.last_name);
                sessionStorage.setItem("group_key", data.group);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        let error_text;

        if (!this.state.error)
        {
            error_text = <div style={{ height: "7vh" }}/>
        }
        else
        {
            error_text =
                <div style={{height: "7vh", fontSize: "2.6vh /*18 px*/", fontFamily: "Roboto, serif", color: "#9F9F9F"}}>
                    Что-то введено неверно. Попробуйте ещё раз.
                </div>
        }

        if (!this.state.isAuthenticated) {
            return (
                <div className="login_background">
                    <div className="login_white_frame">
                        <h2 style={{ textAlign: "center"}}>
                            Необходимо войти <br/> в систему
                        </h2>
                        <div className={'space'}/>
                        <form onSubmit={this.login}>
                            <label>Логин</label>
                            <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange}/>
                            <div className={'space20'}/>
                            <label>Пароль</label>
                            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            <div className={'space40'}/>
                            {error_text}
                            <div className={'space40'}/>
                            <BlueButton type="submit" style={{ width: "100%" }}> Войти </BlueButton>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return (
                <>
                    <GlobalHeader username={sessionStorage.getItem("username_key")}
                                  lastname={sessionStorage.getItem("lastname_key")}
                                  firstname={sessionStorage.getItem("firstname_key")}
                                  group={sessionStorage.getItem("group_key")}
                                  logout={this.logout}/>
                    <MainBlock/>
                </>
            );
        }
    }
}

export default App;
