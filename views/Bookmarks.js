// const html = require("html-template-tag");

module.exports = (bookmarks, search, media) => {
  // console.log("search category", search.count)
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>All Bookmarks</title>
      </head>
      <body>
      <h1>There are ${bookmarks.length} Bookmarks </h1>
        <form action="/bookmarks" method="POST">
          <input type="text" autocomplete="off" name="name" placeholder="Enter site name" />
          <input type="text" autocomplete="off" name="url" placeholder="Enter site URL" />
          <input type="text" autocomplete="off" name="category" placeholder="Enter category" />
          <button type="submit">Save</button>
          </form>
          <h3>Bookmarks</h3>
          <ul>
          ${bookmarks.map((bookmark) => {
            console.log("bookmark", bookmark)
            return `
              <li>${bookmark.name} <a href="${bookmark.url}">${bookmark.url}</a> ${bookmark.category}</li>
            `
          }).join("")}
          </ul>
          <h3>Categories</h3>
          <ul>
          <li>Search(${search.count})</li>
           <li>Media(${media.count})</li>
          </ul>
        </form>
      </body>
    </html>`;
};
