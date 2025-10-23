export const userSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: "Username must be between 5 and 100 characters"
    },
    notEmpty: {
      errorMessage: "Username is required"
    }
  }
};
