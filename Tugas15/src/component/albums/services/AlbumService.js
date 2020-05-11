import client from "../../../shared/http-client/Client"

export async function getAlbums() {
    const { data } = await client.get('/albums')
    return data;
}

export async function getSingleAlbum(id) {
    const { data } = await client.get(`/albums/${id}`);
    return data;
}

export async function createAlbum(form, photo) {
    const fd = new FormData()
    let album = JSON.stringify(form)
    fd.append('file', photo)
    fd.append('photo', album)
    const { data } = await client.post(`/albums`, fd)
    console.log('PHOTO: ', data);
    return data
}

export async function updateAlbum(album) {
    const { data } = await client.put('/albums', album);
    return data;
}

export async function deleteAlbum(album) {
    const response = await client.delete(`/albums/${album.id}`, album);
    if (response.status === 200) return true;
    else return false;
}

export async function upload(album) {
    const { data } = await client.post('/albums/img/upload', album)
}