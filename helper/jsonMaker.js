
exports.ERRORS = {
  'code34': {
    'userMessage': 'Sorry, the requested resource does not exist.',
    'internalMessage': 'There is no resource on database.',
    'code': 34
  },
  'code44': {
    'userMessage': 'Sorry, the IP address of this VM exists on database already.',
    'internalMessage': 'Duplicate VM name found in the database',
    "code": 44
  },
  'code54': {
    'userMessage': 'Sorry, the ACCEPT header does not include "application/json".',
    'internalMessage': 'Not Acceptable',
    "code": 54
  }
}

exports.successJson = (content) => {
  const jsonTemplate = {
    'success': true,
    'content': {}
  };
  jsonTemplate.content = content;
  return jsonTemplate;
}

exports.failJson = (errors) => {
  const jsonTemplate = {
    'success': false,
    'errors': []
  };
  jsonTemplate.errors = errors;
  return jsonTemplate;
}
