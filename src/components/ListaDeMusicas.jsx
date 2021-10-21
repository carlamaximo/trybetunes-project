import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListaDeMusicas extends Component {
  render() {
    const { musica: { trackName, previewUrl, artworkUrl30 } } = this.props;
    return (
      <div>
        <h4>{ trackName }</h4>
        <img src={ artworkUrl30 } alt={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

ListaDeMusicas.propTypes = PropTypes.shape({
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  artworkUrl30: PropTypes.string.isRequired,
}).isRequired;
