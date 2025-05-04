export function distributeConstructionCosts(costData, config, totalYears = 30) {
  const output = [];

  for (const item of costData) {
    const timeline = config[item.category] || { constructionYears: 1, constructionPattern: 'linear' };
    const years = timeline.constructionYears || 1;
    const pattern = timeline.constructionPattern || 'linear';
    const perYear = item.scaledCost / years;

    for (let y = 1; y <= years; y++) {
      let multiplier = 1;

      if (pattern === 'front-loaded') {
        multiplier = (years - y + 1) / years;
      } else if (pattern === 'ramp-up') {
        multiplier = y / years;
      }

      output.push({
        year: y,
        category: item.category,
        subcategory: item.subcategory,
        cost: perYear * multiplier
      });
    }
  }

  return output;
}