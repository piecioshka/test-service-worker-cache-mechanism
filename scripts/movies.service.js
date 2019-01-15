class MoviesService {

    async getMovies() {
        const response = await fetch('/movies.json');
        return await response.json();
    }

}

window.MoviesService = MoviesService;
