import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../style/style.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      nomeDigitado: '',
      disabled: true,
      carregando: false,
      redirecionar: false,
    };

    this.lidaComInput = this.lidaComInput.bind(this);
    this.lidaComCreateUser = this.lidaComCreateUser.bind(this);
  }

  lidaComInput(event) {
    const { value } = event.target;
    // const { nomeDigitado } = this.state;
    const NUM_MAX = 3;
    if (value.length >= NUM_MAX) {
      this.setState({
        disabled: false,
      });
    }
    this.setState({
      nomeDigitado: value,
    });
  }

  async lidaComCreateUser() {
    const { nomeDigitado } = this.state;
    this.setState({ carregando: true });
    await createUser({ name: nomeDigitado });
    this.setState({
      carregando: false,
      redirecionar: true,
    });
    // await console.log(createUser({ name: nomeDigitado }));
  }

  render() {
    const { nomeDigitado, disabled, carregando, redirecionar } = this.state;
    return (
      <div data-testid="page-login" className="login">
        {(carregando && <Carregando />)}
        {(redirecionar && <Redirect to="/search" />)}
        <label htmlFor="inputNome">
          <input
            data-testid="login-name-input"
            value={ nomeDigitado }
            id="inputNome"
            onChange={ this.lidaComInput }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabled }
            onClick={ this.lidaComCreateUser }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}
