export async function getBeerStyles() {
    return fetch("/api/beers", {
        method: 'GET',
    })
        .then(res => res.json())
        .then(response => {
            return response
        });
}

export async function getMalts() {
    return fetch("https://expertsystem-dd30.restdb.io/rest/products", {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "x-apikey": "635c0a97626b9c747864b0bb",
            "cache-control": "no-cache"
          }
    })
        .then(res => res.json())
        .then(response => {
            return response
        });
}