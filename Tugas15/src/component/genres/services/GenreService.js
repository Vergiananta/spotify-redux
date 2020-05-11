import client from "../../../shared/http-client/Client";

export async function getGenres() {
    const { data } = await client.get('/genres');

    return data;
}

export async function getSingleGenres(id) {
    const { data } = await client.get(`/genres/${id}`);

    return data;
}

export async function createGenre(genre) {
    const { data } = await client.post('/genres', genre)
    return data;
}

export async function updateGenre(genre) {
    const { data } = await client.put('/genres', genre);
    return data;
}

export async function deleteGenre(genreId) {
    const response = await client.delete(`/genres/${genreId.id}`, genreId);
    if (response.status === 200) return true;
    else return false;
}