const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost/bookmarks');

const Bookmark = db.define("bookmark", {
  name: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  category: {
    type: Sequelize.STRING,
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Bookmark,
  },
};
