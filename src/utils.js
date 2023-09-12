const regularExpressions = {
  name: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
  password:
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$",
  serverAdress: "^(https?|ftp)://[^s/$.?#].[^s]*$",
  serverPath: "^[a-zA-Z0-9/]*$",
  port: "^[0-9]+$",
};

export const validateValues = (inputValues) => {
  let errors = {};
  // remove proprties which should not be validated //
  delete inputValues.accountType;
  delete inputValues.useSSL;
  //================================================//
  Object.entries(inputValues).forEach((entry) => {
    const [key, value] = entry;
    return !value?.match(regularExpressions[key])
      ? (errors[key] = true)
      : undefined;
  });
  return errors;
};
