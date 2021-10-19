import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistaPesquisado: '',
      disabled: true,
    };

    this.lidaComInput = this.lidaComInput.bind(this);
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

  render() {
    const { artistaPesquisado, disabled } = this.state;
    return (
      <>
        <Header />
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
            >
              Pesquisar
            </button>
          </label>
        </div>
      </>
    );
  }
}
