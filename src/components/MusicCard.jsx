import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../style/style.css';

export default class ListaDeMusicas extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      carregando: false,
      // musicasSalvas: [],
    };
    this.lidaComInputCheck = this.lidaComInputCheck.bind(this);
    this.mostraMusicasFav = this.mostraMusicasFav.bind(this);
  }

  componentDidMount() {
    this.mostraMusicasFav();
  }

  async mostraMusicasFav() {
    const listaMusicasSalvas = await getFavoriteSongs();
    this.setState({
      musicasSalvas: listaMusicasSalvas,
      // checked: { listaMusicasSalvas.some((favorita) => favorita.trackId === music.trackId) }
    });
  }

  async lidaComInputCheck({ target }) {
    console.log(target);
    const { musica } = this.props;

    this.setState({
      check: true,
      carregando: true,
    });
    await addSong(musica);
    this.setState({ carregando: false });
  }

  render() {
    const { musica: { trackName, previewUrl, trackId } } = this.props;
    const { check, carregando } = this.state;

    return (
      <div className="div-musicas">
        <h4>{ trackName }</h4>
        {/* <img src={ artworkUrl30 } alt={ trackName } /> */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="inputFav">
          Favorita
          {(carregando) && <Carregando />}
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="inputFav"
            type="checkbox"
            checked={ check }
            onChange={ this.lidaComInputCheck }
          />
        </label>
      </div>
    );
  }
}

ListaDeMusicas.propTypes = PropTypes.shape({
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  // artworkUrl30: PropTypes.string.isRequired,
}).isRequired;
