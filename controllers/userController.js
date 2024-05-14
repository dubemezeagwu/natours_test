const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterRequestObject = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// Controllers for create requests for a user
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: "success",
    results: allUsers.length,
    data: {
      users: allUsers,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Find the designated user and set the active field to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  // Send a response with a status code of 204 for delete
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please revert to users/updateMyPassword.",
        400,
      ),
    );
  }
  // 2) Filter out unwanted field names that are not allowed to be updated
  const filteredBody = filterRequestObject(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(200).json({
    status: "error",
    message: "This route has not been defined yet",
  });
};

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
