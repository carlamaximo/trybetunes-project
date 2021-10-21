import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import ListaDeMusicas from '../components/ListaDeMusicas';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: true,
      musicas: [],
    };
    this.lidaComGetMusics = this.lidaComGetMusics.bind(this);
  }

  componentDidMount() {
    this.lidaComGetMusics();
  }

  async lidaComGetMusics() {
    const { match: { params: { id } } } = this.props;
    const listaDeMusica = await getMusics(id);
    console.log(listaDeMusica.slice(1));
    this.setState({
      carregando: false,
      musicas: listaDeMusica,
    });
  }

  render() {
    const { carregando, musicas } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {(carregando) ? <Carregando /> : (
            <div data-testid="page-album">
              <h2
                data-testid="album-name"
                className="carregando"
              >
                { musicas[0].collectionName }
              </h2>
              <p
                data-testid="artist-name"
                className="carregando"
              >
                { musicas[0].artistName }
              </p>
              <ul>
                { musicas.slice(1).map((musica, trackId) => (
                  <ListaDeMusicas musica={ musica } key={ trackId } />
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
