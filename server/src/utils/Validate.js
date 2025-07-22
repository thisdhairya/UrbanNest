const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("First Name is required.");
  } else if (!lastName) {
    throw new Error("Last Name is required.");
  } else if (!emailId) {
    throw new Error("Email ID is a required field");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email address");
  } else if (!password) {
    throw new Error("Password is a required field");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is too weak. It must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters."
    );
  }
};

const validateLoginData = (req) => {
  const { emailId, password } = req.body;
  if (!emailId) {
    throw new Error("Email ID is a required field");
  } else if (!password) {
    throw new Error("Password is a required field");
  }
};

const validateEditProfileRequest = (req) => {
  const allowedEditFields = [
    "photoUrl",
    "gender",
    "age",
    "about",
    "preferences",
    "country",
    "state",
    "city",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validateEditProfileData = (req) => {
  const { photoUrl, gender, age, about, preferences, country, state, city } = req.body;

  if (photoUrl !== undefined && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL.");
  }
  if (!gender) {
    throw new Error("Gender is a required field");
  }
  if (
    gender !== undefined &&
    !["Male", "Female", "Others", ""].includes(gender)
  ) {
    throw new Error("Gender must be one of: Male, Female, Others.");
  }
  if (!age) {
    throw new Error("Age is a required field.");
  }
  if (age !== undefined) {
    if (typeof age !== "number" || age < 12) {
      throw new Error("Age must be a number and at least 12.");
    }
  }
  if (!country) {
    throw new Error("Country is a required field.");
  }
  if (typeof country !== "string" || country.trim().length === 0) {
    throw new Error("Country must be a non-empty string.");
  }
  if (country != undefined && country.length > 100) {
    throw new Error("Country name cannot exceed 100 characters.");
  }
  
  if (!state) {
    throw new Error("State is a required field.");
  }
  if (typeof state !== "string" || state.trim().length === 0) {
    throw new Error("State must be a non-empty string.");
  }
  if (state != undefined && state.length > 100) {
    throw new Error("State name cannot exceed 100 characters.");
  }
  
  if (!city) {
    throw new Error("City is a required field.");
  }
  if (typeof city !== "string" || city.trim().length === 0) {
    throw new Error("City must be a non-empty string.");
  }
  if (city != undefined && city.length > 100) {
    throw new Error("City name cannot exceed 100 characters.");
  }
  if (!about) {
    throw new Error(
      "About section is required. It helps others know about you."
    );
  }
  if (
    about !== undefined &&
    !validator.isLength(about, { min: 0, max: 1000 })
  ) {
    throw new Error("About section should be less than 1000 characters.");
  }

  if (preferences !== undefined) {
    if (!Array.isArray(preferences)) {
      throw new Error("Preferences must be an array of strings.");
    }
    if (preferences.length > 10) {
      throw new Error("You are not allowed to enter more than 10 preferences.");
    }
    if (!preferences.every((p) => typeof p === "string")) {
      throw new Error("All preferences must be strings.");
    }
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileRequest,
  validateEditProfileData,
};
