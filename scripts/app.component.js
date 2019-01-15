class AppComponent {

    constructor() {
        this.moviesService = new window.MoviesService();
    }

    async render() {
        const $app = document.querySelector('#app');
        const movies = await this.moviesService.getMovies();
        const $area = document.createDocumentFragment();

        const $header = document.createElement('h1');
        $header.textContent = 'Welcome!';
        $area.append($header);

        const $ul = document.createElement('ul');
        movies.forEach((movie) => {
            const $li = document.createElement('li');
            $li.textContent = movie.title;
            $ul.append($li);
        });
        $area.append($ul);

        $app.append($area);
    }

}

window.AppComponent = AppComponent;
