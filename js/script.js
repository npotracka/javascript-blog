'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

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
optArticleSelector = ".post",
optTitleSelector = ".post-title",
optTitleListSelector = ".titles",
optArticleTagsSelector = "post-tags .list",
optArticleAuthorSelector = "post-author",
optTagsListSelector = ".tags .list",
opts = {tagSizes: {
  count: 5,
  classPrefix: 'tag-size-',
},};

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
  //titleList.insertAdjacentHTML('beforeEnd', linkHTML);

  html = html + linkHTML;
}

//titleList.innerHTML = html;
tagList.innerHTML = templates.tagCloudLink(allTagsData);
console.log(allTagsData);

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();

//Generate tags

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else(tags[tag] < params.min); {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}


function calculateTagClass(count,params){
  const normalizedCount = count - params.min;
  //console.log('normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  //console.log('normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  //console.log('precentage:',percentage);
  const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );
  //console.log('classNumber:', classNumber);
  return opts.tagSizes.classPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

        /* [NEW] check if this link is NOT already in allTags */
         if(!allTags.hasOwnProperty(tag)){

        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
        }
        else {
          allTags[tag]++;
        }

    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector(optTagsListSelector);

/* [NEW] add html from allTags to tagList */
/* [NEW] create variable for all links HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams);

//let allTagsHTML = '';
const allTagsData = {tags: []};

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){

  /* [NEW] generate code of a link and add it to allTagsHTML */
  const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
  console.log('tagLinkHTML', tagLinkHTML);
  allTagsHTML += tagLinkHTML;
  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
/* [NEW] END LOOP: for each tag in allTags: */
}

/* [NEW] add html from allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData); //tagList.innerHTML = allTagsHMTL;

}


generateTags();

// tag clicked handler 

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');

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
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let allTagLink of allTagLinks){

      /* add class active */
      allTagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const allLinks = document.querySelectorAll(optArticleTagsSelector);
  /* [DONE] START LOOP: for each link */
  for(let eachLink of allLinks){
    /* [DONE] add tagClickHandler as event listener for that link */
    eachLink.addEventListener("click", tagClickHandler)
  }
  /* [DONE] END LOOP: for each link */
}

addClickListenersToTags();


// [DONE] Generate authors

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