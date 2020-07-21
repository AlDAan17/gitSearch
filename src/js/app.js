class Github {
    constructor() {
        this.client_id = 'Iv1.46288115e5c16a2f';
        this.client_secret = '25e67ed3b6da1ebf13b04de1a8a69bc227eb811f';
        this.repo_count = 1;
    }

    async getRepo(userText) {
        // console.log(userText.target.value)
        const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${userText}&client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.repo_count}`);
        const repo = await repoResponse.json();
        return {
            repo: repo.items
        };
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

    showOnPage(repo) {
        document.getElementById('displayRep').innerHTML += `
            <div class="repo-list-item">
              <p class="p-list">Name: ${repo.name}</p>
              <p class="p-list">Owner: ${repo.owner.login}</p>
              <p class="p-list">Stars: ${repo.stargazers_count}</p>
              <div class="close"></div>
            </div>
            `;
    }

    clearProfile() {
        this.displayRepo.innerHTML = '';
    }
}

const gitRepo = new Github();
const ui = new UI();
const searchRepo = document.querySelector('.input-repo');//инпут
const form = document.querySelector(".autocomplete-list");//выводимый список при вводе в инпут чего либо

const debounce = (fn, debounceTime) => {
    let isStart;
    return function (...args) {
        if (isStart) {
            clearTimeout(isStart);
        }
        isStart = setTimeout(() => {
            fn.apply(this, args);
        }, debounceTime);
    };
};

searchRepo.addEventListener(
    "input",
    debounce((e) => gitRepo.getRepo(e), 500)
);

searchRepo.addEventListener('keyup', e => {
    const userText = e.target.value;
    if (userText === '') {
        ui.clearProfile();
    } else {
        gitRepo.getRepo(userText).then(data => {
            ui.showRepo(data.repo);

            const items = document.getElementsByClassName("item");
            for (let i = 0; i < items.length; i++) {
                items[i].addEventListener('click', e => {
                    gitRepo.getRepo(items[i].innerText).then(data => {
                        console.log('DATA: ', data.repo[0]);
                        ui.showOnPage(data.repo[0]);
                        ui.clearProfile();
                        searchRepo.value='';

                        const closeItems = document.getElementsByClassName('close');
                        const repoList = document.getElementsByClassName('repositores-list');
                        const repoListItem = document.getElementsByClassName('repo-list-item');
                        for (let i = 0; i < repoList.length; i++) {
                            for (let i = 0; i < repoListItem.length; i++) {
                                console.log(repoListItem[i])
                                console.log(repoListItem[i])
                            closeItems[i].addEventListener('click', e => {
                                repoListItem[i].remove();
                                console.log('close item is:', closeItems[i]);

                            })
                        }
                        }
                    });
                })
            }
        });
    }
});