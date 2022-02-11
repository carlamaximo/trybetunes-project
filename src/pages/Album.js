import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import '../style/style.css';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: true,
      musicas: [],
      favoritas: [],
    };

    this.lidaComGetMusics = this.lidaComGetMusics.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.lidaComGetMusics();
    this.getFavorites();
  }

  async handleClick(value, music) {
    this.setState({ carregando: true });
    console.log(value);
    console.log(music);
    if (value) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.getFavorites();
  }

  async getFavorites() {
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({
      carregando: false,
      favoritas: musicasFavoritas,
    });
  }

  async lidaComGetMusics() {
    const { match: { params: { id } } } = this.props;
    const listaDeMusica = await getMusics(id);
    // console.log(listaDeMusica.slice(1));
    this.setState({
      musicas: listaDeMusica,
    });
  }

  render() {
    const { carregando, musicas, favoritas } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          {(carregando) ? <Carregando /> : (
            <div>
              <h2
                data-testid="album-name"
                className="album-name"
              >
                { musicas[0].collectionName }
              </h2>
              <p
                data-testid="artist-name"
                className="artist-name"
              >
                { musicas[0].artistName }
              </p>
              <ul>
                { musicas.slice(1).map((musica, trackId) => (
                  <MusicCard
                    musica={ musica }
                    key={ trackId }
                    checked={
                      favoritas.some((fav) => fav.trackId === musica.trackId)
                    }
                    onChange={ this.handleClick }
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;
