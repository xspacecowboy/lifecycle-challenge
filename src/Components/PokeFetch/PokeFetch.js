import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10
    }
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  fetchPokemon() {
    this.countDown();
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timer: 10
        })
      })
      .then(this.startTimer())
      .catch((err) => console.log(err))
  }

  startTimer(){
    const interval = setInterval(() => {
      if(this.state.timer > 0){
        this.setState({
          timer: this.state.timer-1
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  countDown(){
    this.setState({
      seconds: 10
    })
  }

  render() {
    if(this.state.seconds > 0){
      const styles = {
        filter: 'brightness(0%)'
      }
      const textStyles = {
        visibility: 'hidden'
      }
      return (
        <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} style={styles} />
          <h1 className={'pokeName'} style={textStyles}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}
}

export default PokeFetch;