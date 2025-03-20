const fuzz = require("fuzzball");
const config = require("./config");

function scoreItem(item, pattern) {
  return fuzz.token_sort_ratio(item.name, pattern, { full_process: true });
}

module.exports = {
  getLikelyItems: (items, pattern) => {
    const scored = items
      .map((item) => ({
        item,
        score: scoreItem(item, pattern),
      }))
      .filter(({ score }) => score >= config.MIN_SCORE);

    return scored.sort((a, b) => b.score - a.score).slice(0, config.MAX_ITEMS);
  },
};
