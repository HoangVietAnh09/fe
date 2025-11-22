/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8081${url}`)
      .then(response => {
        if (!response.ok) {
          reject({
            status: response.status,
            statusText: response.statusText
          });
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data !== undefined) {
          resolve({ data });
        }
      })
      .catch(error => {
        reject({
          status: 0,
          statusText: error.message || 'Network error'
        });
      });
  });
}


export default fetchModel;
