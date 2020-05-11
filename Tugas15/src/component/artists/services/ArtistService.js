import client from "../../../shared/http-client/Client"

export async function getArtists() {
    const { data } = await client.get('/albums')
    return data;
}

export async function getSingleArtist(id) {
    const { data } = await client.get(`/albums/${id}`);
    return data;
}

export async function createArtist(form, photo) {
    const fd = new FormData()
    let artist = JSON.stringify(form)
    fd.append('file', photo)
    fd.append('formData', artist)
    const { data } = await client.post(`/artists`, fd, {
        headers: {
            'Content-Type': `multipart/form-data`,
        }
    })
    console.log(data);
    return data
}

export async function updateArtist(artist) {
    const { data } = await client.put('/artists', artist);
    return data;
}

export async function deleteArtist(artist) {
    const response = await client.delete(`/artists/${artist.id}`, artist);
    if (response.status === 200) return true;
    else return false;
}
