const db = require("./firebase");
const algolia = require("./algolia");

(async function test() {
  const index = algolia.initIndex("matters");

  const { docs } = await index.search().then(async ({ nbPages }) => {
    let docs = [];

    for (let page = 0; page < nbPages; page++) {
      await index.search("", { page: page }).then(({ hits }) => {
        docs.push(...hits);
      });
    }

    return { docs };
  });

  console.log(docs);
})();
