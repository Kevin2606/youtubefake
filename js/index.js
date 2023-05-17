import { getSearch, getVideoDetails, getVideoComments, getVideoRelated } from "../utils/fetch.js";

let i_sun = document.querySelector('#i_sun');
i_sun.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
});

//
const dataSearch = [];
let idVideoSelected = '';
// Logica Search
const input_search =  document.querySelector('#input_search');
const ul_search = document.querySelector('#ul_search');
let timeoutId = null;
input_search.addEventListener('keyup', (e) => {
    const search = input_search.value.trim();
    if (search.length === 0) return;
    timeoutId = debounce(()=>searchVideo(search), 1500, timeoutId);
});
input_search.addEventListener('keydown', (e) => {
    if (timeoutId) clearTimeout(timeoutId);
    ul_search.innerHTML = '';
});
input_search.addEventListener('focusout', (e)=>{
    setTimeout(() => {
        ul_search.style.display = 'none';
    }, 200);
})
input_search.addEventListener('focus', (e)=>{
    ul_search.style.display = 'block';
})
// Funcion Debounce
function debounce(callback, delay, timeoutId) {
    if(timeoutId) clearTimeout(timeoutId);
    return setTimeout(() => callback(), delay);
}
async function searchVideo (search){
    dataSearch.length = 0;
    let res = await getSearch(search);
    listItemSearch(res);
}

function listItemSearch (res) {
    ul_search.innerHTML = '';
    res.forEach(({video}, i) => {
        if (i>5 || video === undefined) return;
        let urlAutor = video.thumbnails[0].url;
        let title = video.title
        let str = `
        <li class="li_video"><img src='${urlAutor}'><p>${title}</p></li>
        `;
        ul_search.insertAdjacentHTML('beforeend', str);
        dataSearch.push(video);
    });
    let li_video = document.querySelectorAll('.li_video');
    li_video.forEach((li, i) => {
        li.addEventListener('click', (e) => selectVideo(dataSearch[i].videoId));
    });
}
async function selectVideo (indVideo) {
    idVideoSelected = indVideo;
    let {description, stats, title, author} = await getVideoDetails( idVideoSelected )
    let {comments} = await getVideoComments( idVideoSelected )
    let {contents} = await getVideoRelated( idVideoSelected )
    document.querySelector('#titulo_video').innerHTML = title;
    document.querySelector('#container_info_canal img').src = author.avatar[0].url;
    document.querySelector('#container_info_canal h3').innerHTML = author.title;
    document.querySelector('#container_info_descripcion p').innerHTML = description;
    document.querySelector('#iframe_video').src = `https://www.youtube.com/embed/${idVideoSelected}`;
    document.querySelector('#iframe_video').style.display = 'block';
    const container_comments = document.querySelector('#container_comments');
    container_comments.innerHTML = '';
    comments.forEach(({author, content, time}) => {
        let str = `
        <div class="card_comments">
            <div>
                <img src="${author.avatar[0].url}" alt="">
                <h5>${author.title}</h5>
            </div>
            <p>${content}</p>
        </div>
        `
        container_comments.insertAdjacentHTML('beforeend', str);
    });

    const container_videos_relacionados = document.querySelector('#container_videos_relacionados');
    container_videos_relacionados.innerHTML = '';
    contents.forEach(({video}) => {
        if (video === undefined) return;
        let str = `
        <div class="video_relacionado">
            <img id="${video.videoId}" class="videos_related_selected" height="100%" width="100%" src="${video.thumbnails[0].url}" alt="">
        </div>
        `
        container_videos_relacionados.insertAdjacentHTML('beforeend', str);
    })
    let videos_related_selected = document.querySelectorAll('.videos_related_selected')
    videos_related_selected.forEach((video_selected)=>{
        video_selected.addEventListener('click', (e)=>{
            selectVideo(e.target.id)
        })
    })

    
}