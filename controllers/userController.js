const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

// Controllers for create requests for a user
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: "success",
    results: allUsers.length,
    data: {
      tours: allUsers,
    },
  });
});

exports.createUser = (req, res) => {
  const newId = allTours[allTours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  allTours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(allTours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    },
  );
};
