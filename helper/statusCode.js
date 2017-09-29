
const STATUSCODE = {
  code400: {
    message: 'Bad Request',
  },
  code401: {
    message: 'Unauthorized',
  },
  code403: {
    message: 'Forbidden',
  },
  code404: {
    message: 'Not Found',
  },
  code415: {
    message: 'Unsupported Media Type',
  },
  code422: {
    message: 'Unprocessable Entry',
    errors: [],
  },
  code429: {
    message: 'Too Many Requests',
  },
};

const make422 = (errors) => {
  const jsonTemplate = STATUSCODE.code422;
  jsonTemplate.errors = [errors];
  return jsonTemplate;
};

module.exports = { STATUSCODE, make422 };
