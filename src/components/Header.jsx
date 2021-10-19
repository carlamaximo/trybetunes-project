import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../style/style.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      carregando: false,
    };

    this.lidaComGetUser = this.lidaComGetUser.bind(this);
  }

  componentDidMount() {
    this.lidaComGetUser();
  }

  async lidaComGetUser() {
    this.setState({ carregando: true });
    const infoUsuario = await getUser();
    console.log(getUser());
    this.setState({
      carregando: false,
      nomeUsuario: infoUsuario.name,
    });
  }

  render() {
    const { carregando, nomeUsuario } = this.state;
    return (
      <header data-testid="header-component" className="login">
        <section>{carregando && <Carregando />}</section>
        <section data-testid="header-user-name">{ nomeUsuario }</section>
      </header>);
  }
}
