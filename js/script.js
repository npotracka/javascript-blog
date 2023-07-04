'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
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
optArticleSelector = ".post",
optTitleSelector = ".post-title",
optTitleListSelector = ".titles",
optArticleTagsSelector = ".post-tags .list",
optArticleAuthorsSelector = ".post-author",
optTagsListSelector = ".tags",
optCloudClassCount = "5",
optCloudClassPrefix = "tag-size-",
optAuthorListSelector = ".authors";


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
  //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  const linkHTMLData = {id: articleId, title: articleTitle};
  const linkHTML = templates.articleLink(linkHTMLData);

  /* [DONE] insert link into titleList */
  //titleList.innerHTML = titleList.innerHTML + linkHTML;
  titleList.insertAdjacentHTML('beforeEnd', linkHTML);

  html = html + linkHTML;
}

//titleList.innerHTML = html;


const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();

//Generate tags

function calculateTagsParams(tags){
  const params = {
    max: '0',
    min: '999999'
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params = { max: '0', min: '999999' }) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return (optCloudClassPrefix + classNumber);
}

calculateTagClass();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

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
      //const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
      const linkHTMLData = { id: 'tag-' + tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        
        /* add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('beforeEnd', html);

  /* [DONE] END LOOP: for every article: */
  }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector(optTagsListSelector);

/* [NEW] add html from allTags to tagList */
//tagList.innerHTML = allTags.join(' ');

/* [NEW] create variable for all links HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams);

//let allTagsHTML = '';
const allTagsData = {tags: []};

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){

  /* [NEW] generate code of a link and add it to allTagsHTML */
  //const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
 // console.log('tagLinkHTML', tagLinkHTML);
 // allTagsHTML += tagLinkHTML;
  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
/* [NEW] END LOOP: for each tag in allTags: */
}

/* [NEW] add html from allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData); 
//tagList.innerHTML = allTagsHMTL;
}

generateTags();

// tag clicked handler 

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* [DONE]remove class active */
    activeTag.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

      /* add class active */
      tagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function addClickListenersToCloudTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToCloudTags();

function calculateAuthorParams(articleAuthors) {
  const params = { max: '0', min: '999999' };
  for (let articleAuthor in articleAuthors) {

    if (articleAuthors[articleAuthor] > params.max) {
      params.max = articleAuthors[articleAuthor];
    }
    if (articleAuthors[articleAuthor] < params.min) {
      params.min = articleAuthors[articleAuthor];
    }
  }
  return params;

}
function calculateAuthorClass(count, params = { max: '0', min: '999999' }) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return (optCloudClassPrefix + classNumber);

}
calculateTagClass();

// [DONE] Generate authors

function generateAuthors() {
  /*create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* add generated code to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.insertAdjacentHTML('beforeEnd', linkHTML);

  }
  const authorList = document.querySelector(optAuthorListSelector);

  /*create variable for all links HTML code*/
  const authorParams = calculateAuthorParams(allAuthors);

  const allAuthorsData = { articleAuthors: [] };

  for (let articleAuthor in allAuthors) {
    /*generate code of link and add it into allAuthorsHTML*/
    allAuthorsData.articleAuthors.push({
      articleAuthor: articleAuthor,
      className: calculateAuthorClass(allAuthors[articleAuthor], authorParams)
    });

    /* END LOOP: for each tag in allTags: */
  }

  /* add html from allAuthors to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

function addClickListenersToCloudAuthors() {
  const authorLinks = document.querySelectorAll('.authors a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToCloudAuthors();
