const categoryImgs = {
  bakedGoods:
    "https://images.unsplash.com/photo-1595526417596-c0fdbf75287b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  appetizers:
    "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  beverages:
    "https://images.unsplash.com/photo-1517620430776-0ec904756579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  burgers:
    "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  desserts:
    "https://images.unsplash.com/photo-1582461833047-2aeb4f8af173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  entrees:
    "https://images.unsplash.com/photo-1577004686904-1a4f118acf61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  fries:
    "https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  salads:
    "https://images.unsplash.com/photo-1556386734-4227a180d19e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
  pizzas:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  sandwiches:
    "https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
  soups:
    "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  toppings:
    "https://images.unsplash.com/photo-1563599175592-c58dc214deff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
};

export default (category) => {
  switch (category) {
    case "Desserts":
      return categoryImgs.desserts;
    case "Baked Goods":
      return categoryImgs.bakedGoods;
    case "Soup":
      return categoryImgs.soups;
    case "AppetizersSides":
      return categoryImgs.appetizers;
    case "Pizza":
      return categoryImgs.pizzas;
    case "Salads":
      return categoryImgs.salads;
    case "Burgers":
      return categoryImgs.burgers;
    case "Sandwiches":
      return categoryImgs.sandwiches;
    case "Fried Potatoes":
      return categoryImgs.fries;
    case "Entrees":
      return categoryImgs.entrees;
    case "ToppingsIngredients":
      return categoryImgs.toppings;
    case "Beverages":
      return categoryImgs.beverages;
    default:
      return null;
  }
};
