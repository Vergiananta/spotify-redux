import client from "../../../shared/http-client/Client";

// export async function getGenres(){
//     const { data: { data } } = await client.get('/genres');

//     return data;
// }

export async function getArtist(){
    const { data } = await client.get('/artists');

    return data;
}

export async function getSingleArtist(){
    const { data: { data } } = await client.get('/artists/${}');

    return data;
}

// export async function createArtist(artist){
//     const { data: { data } } = await client.post('/artists', artist);

//     return data;
// }

export async function createArtist(form, photo){
    const formData = new FormData();
    let artist = JSON.stringify(form);
    formData.append('file', photo);
    formData.append('photo', artist);
    console.log(formData.get('photo'));
    const {data} = await client.post('/artists/img/upload', formData,{
        headers:{
            'Content-Type': `multipart/form-data`,
        }
    })
    console.log(data);
    return data;
}

export async function updateArtist(artist){
    const { data: { data } } = await client.put('/artists', artist);

    return data;
}

export async function deleteArtist(artistId){
    const response = await client.delete(`/artists/${artistId}`);

    if(response.status === 204) return true;
    else return false;
}