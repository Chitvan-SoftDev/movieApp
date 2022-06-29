import React, { Component } from 'react'
import { movies } from '../2_movieData'

export class Favourites extends Component {
    constructor() {
        super()
        this.state = {
            generes: [],
            currgenre: 'All Genres',
            movies: [],
            currText: ''

        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let tempArr = []

        data.map((movieObj) => {
            if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
                tempArr.push(genreids[movieObj.genre_ids[0]])
            }
        })
        tempArr.unshift('All Genres')
        this.setState({
            movies: [...data],
            generes: [...tempArr]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currgenre: genre
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies
        //***sorting in js
        temp.sort(function (a, b) {
            return b.popularity - a.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAscend = () => {
        let temp = this.state.movies
        //***sorting in js
        temp.sort(function (a, b) {
            return  a.popularity-b.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }



    sortRatingDesc = () => {
        let temp = this.state.movies
        //***sorting in js
        temp.sort(function (a, b) {
            return b.vote_average - a.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAscend = () => {
        let temp = this.state.movies
        //***sorting in js
        temp.sort(function (a, b) {
            return  a.vote_average-b.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }


    handleDelete=(movie)=>{
        let oldData= JSON.parse(localStorage.getItem('movies-app')||'[]')
        // console.log(oldData)
            oldData=oldData.filter((m)=>m.id!=movie.id)//removing if movie already exists
          localStorage.setItem('movies-app',JSON.stringify(oldData))
    //   console.log(movie.title)
    //   console.log(movies)
    //   console.log(oldData)
    this.componentDidMount()
    }

    


    render() {
        // const moviesArr = movies.results
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let filterArr = []

        if (this.state.currText === '') {
            filterArr = this.state.movies
        } else {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase().trim()
                return title.includes(this.state.currText.toLowerCase().trim())
            })
        }
        if (this.state.currgenre !== 'All Genres') {
            filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgenre)
        }




        return (
            //bootstrap grid system
            <div className='main'>
                <div className='row'>
                    <div className='col-3'>
                        {/* bootstrap list group  */}
                        <ul className="list-group genre-selector">
                            {
                                this.state.generes.map((generes) => (
                                    this.state.currgenre == generes ?
                                        <li style={{ background: '#3f51b5', color: "white", fontWeight: 'bold' }} className="list-group-item">{generes}</li> :
                                        <li style={{ color: "#3f51b5" }} className="list-group-item" onClick={() => this.handleGenreChange(generes)}>{generes}</li>


                                ))
                            }
                        </ul>

                    </div>
                    <div className='col-9 favourites-table'>
                        {/* bootstrap input group  */}
                        <div className='row'>
                            <input placeholder='Search' type='text' className="input-group-text col" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                            <input type='number' className="input-group-text col" />
                        </div>
                        <div className='row'>
                            {/* bootstrap table  */}
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">
                                            <i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>
                                            Popularity
                                            <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAscend}></i>
                                        </th>
                                        <th scope="col">
                                            <i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>
                                            Ratings
                                            <i class="fa-solid fa-sort-down" onClick={this.sortRatingAscend}></i>
                                        </th>
                                        <th scope="col">Delete From List</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        filterArr.map((movieElem) => (
                                            <tr>
                                                <td><img style={{ width: '6rem' }} src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} /></td>
                                                <th scope="row">{movieElem.title}</th>
                                                <td>{genreids[movieElem.genre_ids[0]]}</td>
                                                <td>{movieElem.popularity}</td>
                                                <td>{movieElem.vote_average}</td>
                                                {/* bootstrap button */}
                                                <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieElem)}>Delete</button></td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favourites