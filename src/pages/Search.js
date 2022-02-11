import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import CardAlbums from '../components/CardAlbums';
import FormularioPesquisa from '../components/FormularioPesquisa';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistaPesquisado: '',
      disabled: true,
      carregando: false,
      requisicao: false,
      albums: [],
      encontrado: '',
      artista: '',
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
    this.setState({
      carregando: true,
      artista: artistaPesquisado,
    });
    const colecaoAlbums = await searchAlbumsAPI(artistaPesquisado);
    this.setState({
      artistaPesquisado: '' }, () => {
      if (colecaoAlbums.length !== 0) {
        this.setState({
          requisicao: true,
          albums: colecaoAlbums,
          carregando: false,
        });
      } else {
        this.setState({
          carregando: false,
          requisicao: false,
          encontrado: 'Nenhum álbum foi encontrado',
        });
      }
    });
  }

  render() {
    const {
      artistaPesquisado,
      disabled, carregando,
      requisicao,
      albums,
      encontrado,
      artista,
    } = this.state;

    return (
      <div data-testid="page-search" className="search-page">
        <Header />
        { (carregando) ? <Carregando /> : <FormularioPesquisa
          artistaPesquisado={ artistaPesquisado }
          lidaComInput={ this.lidaComInput }
          disabled={ disabled }
          lidaComSearchAlbumsAPIs={ this.lidaComSearchAlbumsAPIs }
        />}

        {(requisicao) && (albums.length !== 0) ? (
          <div>
            <p>
              Resultado de álbuns de:
              {` ${artista}`}
            </p>

            <section>
              {albums.map((album) => (
                <CardAlbums
                  key={ album.collectionId }
                  nomeArtista={ album.artistName }
                  imagem={ album.artworkUrl100 }
                  idColecao={ album.collectionId }
                  nomeColecao={ album.collectionName }
                  trackCount={ album.trackCount }
                />
              ))}
            </section>
          </div>
        ) : (
          <p>{encontrado}</p>
        )}
      </div>
    );
  }
}
