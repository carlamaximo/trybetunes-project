import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import CardMusicas from '../components/CardMusicas';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistaPesquisado: '',
      disabled: true,
      carregando: false,
      requisicao: false,
      albums: [],
    };

    this.lidaComInput = this.lidaComInput.bind(this);
    this.lidaComSearchAlbumsAPIs = this.lidaComSearchAlbumsAPIs.bind(this);
  }

  lidaComInput(event) {
    const { value } = event.target;
    const NUM_MAX = 2;
    if (value.length >= NUM_MAX) {
      this.setState({ disabled: false });
    }
    this.setState({
      artistaPesquisado: value,
    });
  }

  async lidaComSearchAlbumsAPIs() {
    const { artistaPesquisado } = this.state;
    this.setState({ carregando: true });
    const colecaoAlbums = await searchAlbumsAPI(artistaPesquisado);
    this.setState({
      artistaPesquisado: '' }, () => {
      if (searchAlbumsAPI(artistaPesquisado)) {
        this.setState({
          requisicao: true,
          albums: colecaoAlbums,
        });
      // } else {
      //   this.setState({ r });
      }
    });
  }

  render() {
    const { artistaPesquisado, disabled, carregando, requisicao, albums } = this.state;
    return (
      <>
        <Header />
        {(carregando) && <Carregando />}
        <div data-testid="page-search">
          <label htmlFor="pesquisaArtista">
            <input
              id="pesquisaArtista"
              data-testid="search-artist-input"
              value={ artistaPesquisado }
              onChange={ this.lidaComInput }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ this.lidaComSearchAlbumsAPIs }
            >
              Pesquisar
            </button>
          </label>
          {(requisicao) && albums.map((album) => (
            <CardMusicas
              key={ album.artistId }
              nomeArtista={ album.artistName }
              imagem={ album.artworkUrl100 }
              idColecao={ album.collectionId }
              nomeColecao={ album.collectionName }
              trackCount={ album.trackCount }
            />
          ))}
        </div>
      </>
    );
  }
}
