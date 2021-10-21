import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/style.css';

export default class CardMusicas extends Component {
  render() {
    const { nomeArtista, imagem, idColecao, nomeColecao, chave } = this.props;
    return (
      <section className="cardAlbum">
        <Link
          to={ `/album/${idColecao}` }
          data-testid={ `link-to-album-${idColecao}` }
          className="cardAlbumChildren"
          key={ chave }
        >
          <img src={ imagem } alt={ nomeArtista } />
          <h3>{ nomeColecao }</h3>
        </Link>
      </section>
    );
  }
}

CardMusicas.propTypes = {
  nomeArtista: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  idColecao: PropTypes.number.isRequired,
  nomeColecao: PropTypes.string.isRequired,
  chave: PropTypes.number.isRequired,
};
