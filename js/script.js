const APIS = {
    rick: 'https://rickandmortyapi.com/api/character',
    dbz: 'https://dragonball-api.com/api/characters?limit=6',
    pokemon: 'https://pokeapi.co/api/v2/pokemon?limit=6'
};

async function fetchData(type) {
    const container = document.getElementById('content-grid');
    container.innerHTML = '<p>Carregando...</p>';

    try {
        const response = await fetch(APIS[type]);
        const data = await response.json();
        
        container.innerHTML = '';

        let items = [];
        if (type === 'rick') items = data.results.slice(0, 6);
        if (type === 'dbz') items = data.items;
        if (type === 'pokemon') items = data.results;

        items.forEach(item => {
            renderCard(item, type, container);
        });
    } catch (error) {
        container.innerHTML = '<p>Erro ao carregar dados. Tente novamente.</p>';
        console.error("Erro na requisição:", error);
    }
}

function renderCard(item, type, container) {
    const card = document.createElement('div');
    card.className = 'card';

    let name = item.name;
    let image = item.image || '';

    if (type === 'pokemon') {
        const id = item.url.split('/')[6];
        image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }

    card.innerHTML = `
        <img src="${image}" alt="${name}" loading="lazy">
        <h3>${name}</h3>
        <p>${type.toUpperCase()}</p>
    `;
    container.appendChild(card);
}