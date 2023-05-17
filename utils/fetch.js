const uri = 'https://youtube138.p.rapidapi.com'
const endpointSearch = 'search'
const endpointVideoDetails = 'video/details'
const endpointVideoComments = 'video/comments'
const endpointVideoRelated = 'video/related-contents'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '83d73f277emshc25c54d98149f6dp16de8bjsn9eada14faf46',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};


const getSearch = async (search) => {
    try {
        const response = await fetch(`${uri}/${endpointSearch}/?q=${search}&hl=es&gl=ES`, options);
        const result = await response.json();
        const res = result.contents
        return res;
    } catch (error) {
        console.error(error);
    }
}
const getVideoDetails = async (id) => {
    try {
        const response = await fetch(`${uri}/${endpointVideoDetails}/?id=${id}`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

const getVideoComments = async (id) => {
    try {
        const response = await fetch(`${uri}/${endpointVideoComments}/?id=${id}&hl=es&gl=ES`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
const getVideoRelated = async (id) => {
    try {
        const response = await fetch(`${uri}/${endpointVideoRelated}/?id=${id}&hl=es&gl=ES`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
export { getSearch, getVideoDetails, getVideoComments, getVideoRelated } 