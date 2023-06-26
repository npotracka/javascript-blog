'use strict';



function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active')

  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

// Generate title list

const 
  optArticleSelector = document.getElementsByClassName ('.post'),
  optTitleSelector = document.getElementsByClassName ('.post-title'),
  optTitleListSelector = document.getElementsByClassName ('.titles');

function generateTitleLinks(customSelector = ''){

let html ='';

/* remove contents of titleList */

const titleList = document.querySelector(optTitleListSelector);

function clearTitleList(){
  document.querySelector(optTitleListSelector).innerHTML = "";
}
clearTitleList();

/* for each article */

const articles = document.querySelectorAll(optArticleSelector + customSelector);

for(let article of articles){

  /* get the article id */

  const articleId = article.getAttribute('id');

  /* find the title element */

  /* get the title from the title element */

  const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + ' "><span>' + articleTitle + '</span></a></li>';

  /* insert link into titleList */
  //titleList.innerHTML = titleList.innerHTML + linkHTML;

  html = html + linkHTML;
}

titleList.innerHTML = html;

