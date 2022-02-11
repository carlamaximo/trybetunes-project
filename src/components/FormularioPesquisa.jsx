import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';
import '../style/style.css';

export default class FormularioPesquisa extends Component {
  render() {
    const {
      artistaPesquisado,
      disabled,
      lidaComInput,
      lidaComSearchAlbumsAPIs,
    } = this.props;

    return (
      <div>
        <label htmlFor="pesquisaArtista" className="searchbar">
          <BiSearchAlt size={ 40 } />
          <input
            id="pesquisaArtista"
            data-testid="search-artist-input"
            value={ artistaPesquisado }
            onChange={ lidaComInput }
            className="inputLogin"
            placeholder="Digite seu artista ou banda preferida"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ lidaComSearchAlbumsAPIs }
            className="botaoLogin"
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

FormularioPesquisa.propTypes = {
  artistaPesquisado: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  lidaComInput: PropTypes.func.isRequired,
  lidaComSearchAlbumsAPIs: PropTypes.func.isRequired,
};
