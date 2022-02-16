import axios from "axios";


const instance = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        per_page: 15,
        key: '25406672-b5207d9f82ab532bfb9f3b93a'
    }
})

export async function searchImages (page = 1, searchQuery = ''){
    const {data} = await instance.get('/', {
        params:{
            page,
            q: searchQuery
        }
    })
    return data;
} 