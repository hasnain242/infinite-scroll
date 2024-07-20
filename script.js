const filter = document.getElementById("filter");
const newsfeedcon = document.getElementById("news-feed-con");
const loader = document.getElementById("loader");

let limit = 5;
let page = 1;
async function fetchposts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  console.log(data);
  return data;
}
async function renderposts() {
  const posts = await fetchposts();
  posts.forEach((post) => {
    const postdiv = document.createElement("div");
    postdiv.classList.add("post");
    postdiv.innerHTML = `
     <div class="post-id">${post.id}</div>
          <div class="post-content">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </div>
    `;
    newsfeedcon.appendChild(postdiv);
  });
}
function showloader() {
  loader.classList.add("show");
  page++;
  renderposts();
  loader.classList.remove("show");
}
function filterposts(e) {
  const filter = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText;
    const body = post.querySelector(".post-body").innerText;
    if (title.indexOf(filter) >= 0 || body.indexOf(filter) >= 0) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    showloader();
  }
});
filter.addEventListener("input", filterposts);

renderposts();
