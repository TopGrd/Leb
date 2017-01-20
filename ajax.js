function ajax(options) {
  let { type, url, data, headers, beforeSend } = options;
  type = type.toUpperCase() || 'GET';
  let xhr = null, postData = null;
  let asyn = options.async || true;
  let before = false;
  let timeStmp = new Date().getTime();
  function createXHR() {
    var xhr = null;
    try {
      xhr = new XMLHttpRequest();
    } catch (tryMS) {
      try {
        xhr = new ActiveXObject('Msxm12.XMLHTTP');
      } catch (otherMS) {
        try {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (failed) {
          xhr = null;
        }
      }
    }
    return xhr;
  }

  xhr = createXHR();

  let arr = [];
  if (data && _.isObject(data)) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        var postStr = '' + key + '=' + data[key];
        arr.push(postStr);
      }
    }
    postData = arr.join('&');
    type === 'GET' ? url = url + '?' + postData + '&t=' + timeStmp : url;
  } else {
    url = url + '?t=' + timeStmp;
  }

  return new Promise(function(resolve, reject) {
    xhr.open(type, url, asyn);

    if (headers) {
      for (let header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }
    }

    if (type === 'GET') {
      xhr.send();
    } else {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(postData);
    }

    xhr.onreadystatechange = function() {
      if (typeof beforeSend === 'function' && before === false) {
        beforeSend();
        before = true;
      }

      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    };
  });
}
