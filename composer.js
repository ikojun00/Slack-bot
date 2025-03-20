module.exports = {
  getMessageForOptions: (items, searchedItem) => {
    if (items.length === 0) {
      return `:mag: Couldn't find *${searchedItem}* in our database`;
    }

    let message = `:sparkles: Found these items matching *${searchedItem}*:\n`;
    return items.reduce(
      (msg, { item }) => msg + `• *${item.name}* - ${item.location}\n`,
      message
    );
  },
};
