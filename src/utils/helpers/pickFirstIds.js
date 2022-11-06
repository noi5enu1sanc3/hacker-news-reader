//picks 100 news ids to display just 100 latest news on the main page
export const pickFirstIds = arr => arr.slice(0, 20).sort((a, b) => a.id - b.id);
