const asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: 'Something went wrong on the server' });
  }
};

export default asyncHandler;
