newsElement = `<div class="news">  
                    <div class="news-content">

                        <div class="news-info-top">
                            <p>•</p>&nbsp
                            <p class="news-info-top-author-name"></p> &nbsp
                            <p class="news-info-gray-text">in</p> &nbsp
                            <p class="news-info-top-section-name"></p> &nbsp
                            <p class="news-info-gray-text">·</p>&nbsp
                            <p class="news-info-date"></p>&nbsp
                        </div>

                        <button class="news-title"></button>
                        <p class="news-abstract"></p>

                        <div class="news-info-buttom">
                            <div class="news-info-buttom-content">
                                <p class="news-info-time"></p>&nbsp
                                <p class="news-info-gray-text">·</p>&nbsp
                                <p class="news-info-for-you">Selected for you</p>&nbsp
                            </div>

                            <div class="news-icons">
                                <img alt="icon" src="./assets/icon.png">&nbsp
                                <img alt="icon" src="./assets/icon.png">&nbsp
                                <img alt="icon" src="./assets/icon.png">&nbsp
                            </div>
                        </div>

                    </div>
                    <img class="visual-image" alt="visual image" src="">
                </div>`;

// newsPage = `<div class="news">  
//                 <div class="news-content">
//                     <button class="news-title"></button>
//                     <p class="news-abstract"></p>
//                 </div>
//                 <img alt="visual image" src="">
//             </div>`

let newsListElement = document.getElementById("news-list");

// GO BACK (Tried many ways but nothing works except reloading page)
const goToMainPage = ()=> location.reload(); 

// GET FROM API
async function getNews(){
    // FETCH GET
    const response = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl')
    if(!response.ok && response.status==='404')
        console.log('Oops! The request was made incorrectly!')

    let data = await response.json();
    // console.log(data.results);
    let id = 0;
    data.results.forEach(item => {

    newNews = newsElement.replace(`<div class="news">`, `<div class="news" id="${id}">`)
    
    newNews = newNews.replace(`class="news-info-top-author-name">`,
    `class="news-info-top-author-name">${item.byline}`);

    newNews = newNews.replace(`class="news-info-top-section-name">`,
    `class="news-info-top-section-name">${item.section}`);

    newNews = newNews.replace(`class="news-info-date">`,
    `class="news-info-date">${item.created_date.slice(0, 10)}`);

    newNews = newNews.replace(`class="news-title">`,
    `class="news-title">${item.title}`);

    newNews = newNews.replace(`class="news-abstract">`,
    `class="news-abstract">${item.abstract}`);

    newNews = newNews.replace(`class="news-info-time">`,
    `class="news-info-time">12 min read`);

    newNews = newNews.replace(`alt="visual image" src="">`,
    `alt="visual image" src="${item.multimedia[0].url}">`);

    newsListElement.innerHTML += newNews;
    id += 1;
    });

    // SEE MORE
    const thisNews = document.getElementsByClassName("news-title");

    for(let i = 0; i < thisNews.length; i++){
        thisNews[i].addEventListener('click', function(){
            newsListElement.style = "display: none";
            const thisNewsEl = document.getElementById(i);

            const newEl = document.createElement("div");
            const backButton = document.createElement("button");
            const backButtonImg = document.createElement("img");
            backButtonImg.src = "./assets/Left.png";
            backButton.append(backButtonImg);
            newEl.append(backButton);

            const authorName = thisNewsEl.getElementsByClassName("news-info-top-author-name")[0];
            authorName.className = "news-info-top-author-name";
            const createdDate = thisNewsEl.getElementsByClassName("news-info-date")[0];
            createdDate.className = "news-info-date";
            const title = thisNewsEl.getElementsByClassName("news-title")[0];
            title.className = "news-title";
            const abstract = thisNewsEl.getElementsByClassName("news-abstract")[0];
            abstract.className = "news-abstract";
            const visualImage = thisNewsEl.getElementsByClassName("visual-image")[0];
            visualImage.className = "visual-image";

            const subheader = document.createElement("p");
            const newContentSubheader = document.createTextNode("Subheader");
            subheader.appendChild(newContentSubheader);
            subheader.className = "news-subheader";

            const newsText = document.createElement("p");
            const newContentNewsText = document.createTextNode(`So many texts here`);
            newsText.appendChild(newContentNewsText);
            newsText.className = "news-text";
            
            newEl.append(authorName);
            newEl.append(createdDate);
            newEl.append(title);
            newEl.append(abstract);
            newEl.append(visualImage);
            newEl.append(subheader);
            newEl.append(newsText);

            console.log(visualImage.className);
            const seeMoreEl = document.getElementById("see-more");
            seeMoreEl.append(newEl);

            backButton.addEventListener('click', function(){
                seeMoreEl.style = "display: none";
                goToMainPage();
            });
        });
    }
  }
  getNews();




