import React, { Component } from 'react'
// import { movies } from '../2_movieData'
import axios from 'axios'// used to call api data

export class MovieList extends Component {

  constructor() {
    console.log('constructor first')
    super()
    this.state = {
      hover: '',
      parr: [1],
      movies: [],
      currpage: 1,
      favourites:[]
    }
  }
  // as axios is promise based hence we use async await  
  async componentDidMount() {
    // npm install axios on cli
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ff2e981c1983ed27a2116c6deba1d2c4&language=en-US&page=${this.state.currpage}`)
    // console.log(response)
    let movieData = response.data
    console.log(movieData)

    this.setState({
      movies: [...movieData.results]
    })
    console.log('mounting done with cdm third')
  }


  changeMovies = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ff2e981c1983ed27a2116c6deba1d2c4&language=en-US&page=${this.state.currpage}`)
    let movieData = response.data
    console.log(movieData)

    this.setState({
      movies: [...movieData.results]
    })
   
  }

  handleNext = () => {
    let tempArr = []
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i)

    }
    
    this.setState({//set state is an async function thats why we called change movies method this way
      parr: [...tempArr],
      currpage: this.state.currpage + 1
    },
      this.changeMovies)
    
  }


  handlePrevious = () => {
   
    if (this.state.currpage != 1) {
      
      this.setState({
        currpage: this.state.currpage-1
      }, this.changeMovies)
    }
  }
  handlePageClick = (value) => {
    if (value != this.state.currpage) {
      this.setState({
        currpage: value
      }, this.changeMovies)
    }
  }


  handleFavourites=(movie)=>{
    let oldData= JSON.parse(localStorage.getItem('movies-app')||'[]')
    if(this.state.favourites.includes(movie.id)){
      oldData=oldData.filter((m)=>m.id!=movie.id)//removing if movie already exists
    }
    else{
      oldData.push(movie)
    }
    localStorage.setItem('movies-app',JSON.stringify(oldData))
    console.log(oldData)
    this.handleFavouritesState()
    }

    handleFavouritesState=()=>{
    let oldData= JSON.parse(localStorage.getItem('movies-app')||'[]')
      let temp= oldData.map((movie)=>movie.id)
      this.setState({
        favourites:[...temp]
      })
    }

  render() {
    console.log('render second')

    // let moviesArr = movies.results
    //   console.log(moviesArr)
    return (
      <>
        <div>
          <h3 className='text-center'><strong>Trending</strong></h3>
        </div>
        <div className='movies-list'>
          {
            this.state.movies.map((movieElem) => (
              //imp********
              <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieElem.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                {/* as we are using class keyword to define both oop and html it generates ambiguity  */}
                <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} style={{ height: '40vh', width: '20vw' }} className="card-img-top movie-img" alt="...">
                </img>
                <h5 className="card-title movie-title">{movieElem.title}</h5>
                <div className='button-wrapper' style={{ display: 'flex', justifyContent: "center" }}>
                  {
                    this.state.hover == movieElem.id &&//if this true then do thid
                    <a className="btn btn-primary movies-button text-center" onClick={()=> this.handleFavourites(movieElem)}>
                      {
                        this.state.favourites.includes(movieElem.id)?'Remove From Favourites':'Add to Favourite'
                      }
                      </a>

                  }
                </div>
              </div>

            ))
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {console.log(this.state.parr)}
              <li className="page-item "><a className="page-link" onClick={this.handlePrevious}>Previous</a></li>
              {
                this.state.parr.map((value) => (
                  <li className="page-item"><a className="page-link" onClick={() => this.handlePageClick(value)}>{value}</a></li>
                ))
              }
              <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
            </ul>
          </nav>
        </div>
      </>

    )
  }
}

export default MovieList

/*
lifecycle of react application:

*mounting*        |     * updation *   |    * unmounting *
                  |                    |
 constructor      |   render           | 
                  |                    | component will unmount
                  |                    | 
 render           |component did update| 
                  |                    | 
                  |                    | 
                  |                    | 
componentdidmount |                    | 
                  |                    | 
                  |                    | 
                  |                    | 
                  |                    | 

componentDidMount => this method means that if our component gets mounted in dom then required data should be called
*/