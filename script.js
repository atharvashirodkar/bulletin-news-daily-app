let query;
let pageNo;
let articlesPerPage;
let totalPages;

const apiKey = `5`;

if (window.location.search.split("?").length > 1) {
    query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
    page = parseInt(window.location.search.split('?')[1].split('&')[1].split('=')[1]);
} else {
    query = "trending";
    page = 1;
}
console.log(window.location.search);
console.log(query, page);

let content =
    `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card shadow-sm">
                    <div class="card-img-top placeholder-glow" style="height: 180px; background: #e9ecef;"></div>
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-8"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-12"></span>
                            <span class="placeholder col-10"></span>
                            <span class="placeholder col-6"></span>
                        </p>
                        <a href="#" class="btn btn-primary disabled placeholder col-6"></a>
                    </div>
                </div>
            </div>
                    `;
let contentRepeatation = "";
for (let count = 0; count < 6; count++) {
    contentRepeatation += content
}
document.getElementById("content").innerHTML = contentRepeatation;


const fetchNews = async (query, pageNo) => {
    //In place of below My_News_API_KEY using my own API key which you can get by registering on newsapi.org
    
    let a = await fetch(`http://localhost:8080/api?q=${query}&apiKey=${apiKey}&pageSize=10&page=${pageNo}`);
    let data = await a.json();
    console.log(data);
    totalPages = Math.ceil(data.totalResults / articlesPerPage);
    pre.href = `?q=${query}&page=${pageNo - 1}`;
    next.href = `?q=${query}&page=${pageNo + 1}`;

    let str = "";
    for (let item of data.articles) {
        if (!item.title || !item.description || !item.urlToImage || !item.url) {
            continue;
        }
        str +=
            `
                    <div class="col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
                        <div class="card shadow-sm h-100">
                            <img src="${item.urlToImage}" class="card-img-top" alt="News Image">
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
