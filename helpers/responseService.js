module.exports.SuccessResponse = (res, data) => {
  return res.json({
    Success: true,
    body: data,
    error: null,
  });
};

module.exports.ErrorResponse = (res, error, status) => {
  return res
    .status(status ?? 200)
    .json({ Success: false, body: null, error: error });
};
