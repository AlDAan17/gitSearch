class Github {
    constructor() {
        this.client_id = 'Iv1.46288115e5c16a2f';
        this.client_secret = '25e67ed3b6da1ebf13b04de1a8a69bc227eb811f';
        this.repo_count = 2;
    }

    async getRepo(userText) {

        const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${userText}&client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.repo_count}`);
        const repo = await repoResponse.json();
        return {
            repo: repo.items
        }
    }
}

class UI {
    constructor() {
        this.displayRepo = document.getElementById('displayRepo');
    }

    showRepo(repo) {
        let output = '';
        repo.forEach(function (repo) {
            output += `
             <div class="item">${repo.name}</div>
            `});
        document.getElementById('displayRepo').innerHTML = output;
    }

    showOnPage(repo) {                //<----------
        let output = '';

        repo.forEach(function (repo) {
            output += `
             <div class="repo-list-item">
              <p class="p-list">Name: ${repo.name}</p>
              <p class="p-list">Owner: ${repo.owner.login}</p>
              <p class="p-list">Stars: ${repo.stargazers_count}</p>
              <div class="close"></div>
            </div>
            `});
        document.getElementById('displayRep').innerHTML = output;
    }

    clearProfile() {
        this.displayRepo.innerHTML = '';
    }
}

const gitRepo = new Github();
const ui = new UI();
const searchRepo = document.querySelector('.input-repo');//инпут
const form = document.querySelector(".autocomplete-list");//выводимый список при вводе в инпут чего либо


searchRepo.addEventListener('keyup', e => {
    const userText = e.target.value;
    if (userText !== '') {
        gitRepo.getRepo(userText).then(data => {
            ui.showRepo(data.repo);
            const items = document.getElementsByClassName("item");
            for(let i = 0; i < items.length; i++){     //<------
                items[i].addEventListener('onclick', e =>{
                    console.log('works');
                })
            }
        });
    } else {
        ui.clearProfile();
    }
});

