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

// Generate title list

const 
  optArticleSelector = document.getElementsByClassName ('.post'),
  optTitleSelector = document.getElementsByClassName ('.post-title'),
  optTitleListSelector = document.getElementsByClassName ('.titles'),
  optArticleTagsSelector = document.getElementsByClassName('post-tags .list'),
  optArticleAuthorSelector = document.getElementsByClassName('post-author');

function generateTitleLinks(customSelector = ''){

let html ='';

/* [DONE] remove contents of titleList */

const titleList = document.querySelector(optTitleListSelector);

function clearTitleList(){
  document.querySelector(optTitleListSelector).innerHTML = "";
}

clearTitleList();

/* [DONE] for each article */

const articles = document.querySelectorAll(optArticleSelector + customSelector);

for(let article of articles){

  /* [DONE] get the article id */

  const articleId = article.getAttribute('id');

  /* find the title element */
  
  /* [DONE] get the title from the title element */

  const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* [DONE] create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

  /* [DONE] insert link into titleList */
  //titleList.innerHTML = titleList.innerHTML + linkHTML;
  //titleList.insertAdjacentHTML('beforeEnd', linkHTML);

  html = html + linkHTML;
}

titleList.innerHTML = html;

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();

//Generate tags

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelectorAll(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();

// tag clicked handler 

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"] li');

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let allTagLink of allTagLinks){

      /* add class active */
      allTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinks = document.querySelectorAll(optArticleTagsSelector);
  /* START LOOP: for each link */
  for(let eachLink of allLinks){
    /* add tagClickHandler as event listener for that link */
    eachLink.addEventListener("click", tagClickHandler)
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();


// Generate authors

function generateAuthors(){
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  for(let author of authors){
    const postAuthor = authors.querySelectorAll(optTitleSelector);
    let hmtl = '';
    const authorName = authot.getAttribute('data-author');
    html = authorName;
    postTitle.insertAdjacentHTML('afterend', '<p class="post-author">' + html + '</p>');
  }
}

document.addEventListener('DOMContentLoaded', generateAuthors);

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = this.getAttribute('href');
  const authors = href.replace('#tag-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#tag-"] li');
  for(let activeAuthor of activeAuthors){
    activeAuthors.classList.remove('active');
  }
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  for(let allAuthorsLink of allAuthorsLinks){
      allAuthorsLink.classList.add('active');
  }
  generateTitleLinks('[data-tags="' + authors + '"]');
}

function addClickListenersToAuthrs(){
  const allAuthors = document.querySelectorAll(optArticleAuthorSelector);
  for(let allAuthor of allAuthors){
    allAuthor.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();