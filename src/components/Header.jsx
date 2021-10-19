import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <section data-testid="header-user-name" className="nome">{ nomeUsuario }</section>
        <nav>
          <Link to="/search" data-testid="link-to-search" className="nav">Pesquisar</Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="nav"
          >
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="nav">Perfil</Link>
        </nav>
      </header>);
  }
}
