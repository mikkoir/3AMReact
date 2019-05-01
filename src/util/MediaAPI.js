const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const getAllMedia = () => {
  return fetch(apiUrl + 'media/').then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getMediaFromUser = (id) => {
  return fetch(apiUrl + 'media/user/' + id).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + 'media/' + id).then(response => {
    return response.json();
  });
};

const login = (username, password) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  };
  return fetch(apiUrl + 'login', settings).then(response => {
    return response.json();
  });
};

const register = (user) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return fetch(apiUrl + 'users', settings).then(response => {
    return response.json();
  });
};

const getUser = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    },
  };
  return fetch(apiUrl + 'users/user', settings).then(response => {
    return response.json();
  });
};

const checkUser = (username) => {
  return fetch(apiUrl + 'users/username/' + username).then(response => {
    return response.json();
  });
};

const getFilesByTag = (tag) => {
  return fetch(apiUrl + 'tags/' + tag).then(response => {
    return response.json();
  });
};

const upload = (data, token) => {
  const options = {
    method: 'POST',
    body: data,
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(apiUrl + 'media', options).then(response => {
    return response.json();
  });
};

const modify = (id, data, token) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  };

  return fetch(apiUrl + 'media/' + id, options)
      .then(handleFetchErrors)
      .then(response => {
        return response.json();
      });
};

const deleteMedia = (id, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(apiUrl + 'media/' + id, options)
      .then(handleFetchErrors)
      .then(response => {
        return response.json();
      });
};

const getFilters = (text, defaultFilters) => {
  const pattern = '\\[f\\](.*?)\\[\\/f\\]';
  const re = new RegExp(pattern);
  try {
    return JSON.parse(re.exec(text)[1]);
  } catch (e) {
    // console.log(e);
    return defaultFilters;
  }
};

const getDescription = (text) => {
  const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
  const re = new RegExp(pattern);
  console.log(re.exec(text));
  try {
    return re.exec(text)[1];
  } catch (e) {
    return text;
  }
};

export {
  getAllMedia,
  getSingleMedia,
  login,
  register,
  getUser,
  getFilesByTag,
  checkUser,
  getMediaFromUser,
  getFilters,
  getDescription,
  handleFetchErrors,
  upload,
  modify,
  deleteMedia,
};