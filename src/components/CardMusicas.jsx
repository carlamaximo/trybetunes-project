import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardMusicas extends Component {
  render() {
    const { nomeArtista, imagem, idColecao, nomeColecao } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${idColecao}` }
          data-testid={ `link-to-album-${idColecao}` }
        >
          <img src={ imagem } alt={ nomeArtista } />
          <h3>{ nomeColecao }</h3>
        </Link>
      </div>
    );
  }
}

CardMusicas.propTypes = {
  nomeArtista: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  idColecao: PropTypes.number.isRequired,
  nomeColecao: PropTypes.string.isRequired,
};
