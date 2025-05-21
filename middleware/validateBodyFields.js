const validateBodyFields = (requiredFields) => {
  return (req, res, next) => {
    const errors = [];

    requiredFields.forEach((field) => {
      const value = req.body[field];

      if (
        value === undefined ||
        value === null ||
        (typeof (value === "string") && value.trim() === "")
      ) {
        errors.push({
          field,
          message: `Поле "${field}" обязательно для заполнения`,
        });
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Ошибка валидации",
        errors: errors,
      });
    }
    next();
  };
};

module.exports = validateBodyFields;
