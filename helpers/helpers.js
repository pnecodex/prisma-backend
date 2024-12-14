const CatalogueFilter = (categoreisSeller, parentId = null) => {
  const categoriesList = [];
  let categorySeller;
  if (parentId == null) {
    categorySeller = categoreisSeller.filter(categorySeller => categorySeller.parentId == undefined);
  } else {
    categorySeller = categoreisSeller.filter(categorySeller => categorySeller.parentId == parentId);
  }
  for (let cate of categorySeller) {
    categoriesList.push({
      id: cate.id,
      titles: cate.titles,
      slugs: cate.slugs,
      parentId: cate.parentId,
      image: cate.image,
      children: CatalogueFilter(categoreisSeller, cate.id)
    });
  }
  return categoriesList;
}
exports.CatalogueFilter = CatalogueFilter;