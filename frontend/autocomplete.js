const search = document.getElementById("stateInput");
const matchList = document.getElementById("matchList");

//search states.json and filter
//the fetch api can bring in json data! similar to how some
//apis only need a url link to work
const searchStates= async searchText => {
    //use fetch api to get to states.json
    const resResponse = await fetch("../data/autocompletestates.json"); 
    const states = await resResponse.json();
    //get matches to current user input
    let matches = states.filter(state => {
        const regRegularExpression = new RegExp(`^${searchText}`, 'gi');
        //"^" means that it must "start with", gi makes it case-insensitive
        return state.name.match(regRegularExpression) || state.abbr.match(regRegularExpression);
    });

    if (searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }
    //outputs matches to html
    outputHtml(matches);
};

export function outputHtml(matches){
    if (matches.length > 0) {
        const matcheshtml = matches.map(match => `
         <div>
            <h4>${match.name}(${match.abbr}) - ${match.capital}</h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
         </div>
        `).join('');

        matchList.innerHTML = matcheshtml;
    }
};

search.addEventListener('input', () => searchStates(search.value));