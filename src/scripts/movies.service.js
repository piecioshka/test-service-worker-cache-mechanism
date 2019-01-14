class MoviesService {

    get movesUrl() {
        return `${location.pathname}movies.json`;
    }

    async getMovies() {
        const response = await fetch(this.movesUrl);
        return await response.json();
    }

}

window.MoviesService = MoviesService;
