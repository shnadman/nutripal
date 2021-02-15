const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Fields to exclude
  let removeFields = ["select", "sort", "page", "limit", "totalPages"];

  //Start of specific app BL queries - every filed we push will not be used for filtering

  if (req.query.brand === "true") {
    removeFields.push("brand");
  }
  if (req.query.category === "") {
    removeFields.push("category");
  }

  // Copy req.query
  const reqQuery = { ...req.query };

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  if (queryStr.includes("regex")) {
    const { regex } = reqQuery.name;
    query = model.find({
      name: { $regex: new RegExp(".*" + regex + ".*", "i") },
    });
  } else {
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr)).lean();
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort({ starred: -1 });
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let totalPages = null;
  let total = null;

  if (!req.query.totalPages) {
    total = await model.countDocuments();
    const tempQueryResults = await query;
    totalPages = Math.ceil(tempQueryResults.length / limit);
  }

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result

  const pagination = totalPages
    ? { totalPages }
    : { totalPages: req.query.totalPages };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
