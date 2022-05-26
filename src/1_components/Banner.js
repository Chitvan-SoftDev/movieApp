import React, { Component } from 'react'
import { movies } from '../2_movieData'

export class Banner extends Component {
  render() {
    let moviesElem = movies.results[Math.floor((Math.random()*10)+1)]
    let backdrop_path=moviesElem.backdrop_path
    return (
      <div className="card banner-card" >
        {/* as we are using class keyword to define both oop and html it generates ambiguity  */}
        <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} className="card-img-top banner-img" alt="...">
        </img>
        <h5 className="card-title banner-title">{moviesElem.title}</h5>
        <p className="card-text banner-text">{moviesElem.overview}</p>
      </div>
    )
  }
}

export default Banner