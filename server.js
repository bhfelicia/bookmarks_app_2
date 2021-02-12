const {
  db,
  syncAndSeed,
  models: { Bookmark },
} = require("./db");

const bookmarkUtil = require("./views/Bookmarks");

const express = require('express');

const app = express();



app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.redirect("/bookmarks"));

app.get("/bookmarks", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll();
    const search = await Bookmark.findAndCountAll({where: {category: 'search'}});
    const media = await Bookmark.findAndCountAll({where: {category: 'media'}});

    res.send(bookmarkUtil(bookmarks, search, media));
  } catch (error) {
    next(error);
  }
});

app.post('/bookmarks', async (req, res, next) => {
  try {
    const newBookmark = await Bookmark.create(req.body);
    console.log("newBookmark", newBookmark)
    res.redirect('/bookmarks')
  } catch (err) {
    next(err)
  }
});

const port = 3000;

(async () => {
  await db.authenticate();
  console.log("connection successful")

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

  await syncAndSeed();

    //create new instance aka new row
		const firstBookmark = new Bookmark({
			name: 'Netflix',
			url: 'http://www.netflix.com',
            category: 'media'
		});
    //add new row to table
		await firstBookmark.save();

     //create new instance aka new row
		const secondBookmark = new Bookmark({
			name: 'Google',
			url: 'http://www.google.com',
            category: 'search'
		});
    //add new row to table
		await secondBookmark.save();

        //create new instance aka new row
		const thirdBookmark = new Bookmark({
			name: 'Hulu',
			url: 'http://www.hulu.com',
            category: 'media'
		});
    //add new row to table
		await secondBookmark.save();
})();