console.log("Hello World!")
let query;
let pageNo;
let articlesPerPage;
let totalPages;
if (window.location.search.split("?").length > 1) {
    query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
    page = parseInt(window.location.search.split('?')[1].split('&')[1].split('=')[1]);
} else {
    query = "trending";
    page = 1;
}
console.log(window.location.search);
console.log(query, page);

const fetchNews = async (query, pageNo) => {
    //In place of below My_News_API_KEY using my own API key which you can get by registering on newsapi.org
    const response = await fetch(
        `/api/news?q=${encodeURIComponent(query)}&page=${pageNo}`
    );

    const data = await response.json();    

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch news");
    }
    const params = new URLSearchParams(window.location.search);

    query = params.get("q") || "trending";
    pageNo = Number(params.get("page")) || 1;

    const articlesPerPage = 10;

    console.log(data);
    totalPages = Math.ceil(data.totalResults / articlesPerPage);
    pre.href = `?q=${query}&page=${pageNo - 1}`;
    next.href = `?q=${query}&page=${pageNo + 1}`;
    let str = "";
    for (let item of data.news) {        
        if (!item.title || !item.description || !item.image || !item.url) {
            continue;
        }
        str +=
            `
                    <div class="col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
                        <div class="card shadow-sm h-100">
                            <img src="${item.image}" class="card-img-top" alt="News Image">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text flex-grow-1">${item.description || "No description available."}</p>
                                <a href="${item.url}" target="_blank" class="btn btn-primary mt-auto">Read More...</a>
                            </div>
                        </div>
                    </div>
                `;
    }

    document.getElementById("content").innerHTML = str;
}

fetchNews(query, page);
