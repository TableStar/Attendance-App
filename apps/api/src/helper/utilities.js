module.exports = {
  templateResError: (rc, success, message, error, result) => {
    return {
      rc,
      success,
      message,
      error,
      result,
    };
  },
  templateResSuccess: (success, message, result) => {
    return {
      success,
      message,
      result,
    };
  },
};
