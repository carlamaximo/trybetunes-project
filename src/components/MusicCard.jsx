import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import '../style/style.css';

export default class ListaDeMusicas extends Component {
  constructor(props) {
    super(props);
    const { checked } = this.props;
    this.state = {
      check: checked,
      carregando: false,
    };

    this.lidaComInputCheck = this.lidaComInputCheck.bind(this);
  }

  async lidaComInputCheck({ target }) {
    const { onChange, musica } = this.props;
    this.setState({ check: true });
    onChange(target.checked, musica);
  }

  // async lidaComInputCheck({ target }) {
  //   console.log(target);
  //   const { musica } = this.props;

  //   this.setState({
  //     check: true,
  //     carregando: true,
  //   });
  //   await addSong(musica);
  //   this.setState({ carregando: false });
  // }

  render() {
    const { musica: { trackName, previewUrl, trackId } } = this.props;
    const { check, carregando } = this.state;

    return (
      <div className="div-musicas">
        <h4>{ trackName }</h4>
        {/* <img src={ artworkUrl30 } alt={ trackName } /> */}
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="reproducao"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="inputFav" className="inputFav">
          Favorita
          {(carregando) && <Carregando />}
          <input
            data-testid={ `checkbox-music-${trackId}` }
            value={ trackId }
            id="inputFav"
            type="checkbox"
            checked={ check }
            onChange={ this.lidaComInputCheck }
            className="favorita"
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
