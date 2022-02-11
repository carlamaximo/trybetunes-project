import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/style.css';

export default class CardMusicas extends Component {
  render() {
    const { nomeArtista, imagem, idColecao, nomeColecao } = this.props;
    return (
      <section className="section-cardAlbum">
        <Link
          to={ `/album/${idColecao}` }
          data-testid={ `link-to-album-${idColecao}` }
          className="cardAlbumChildren"
          key={ idColecao }
        >
          <div className="img-h3">
            <img src={ imagem } alt={ nomeArtista } className="img-album" />
            <h3 className="nome-album">{ nomeColecao }</h3>
          </div>
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
};
