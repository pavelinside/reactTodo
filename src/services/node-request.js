const apiBase = "http://localhost:3000/";
const makeRequest = async (url, method, data = {}) => {
  const options = {
    method: method
  };
  if(method !== "GET" && data){
    options.body = JSON.stringify(data);
    // express don't understand Content-Type; req.body is a string like { '{"id":"62","filter":"all","search":""}' : '' }
    options.headers = {
      //'Content-Type': 'application/json'
      //'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  const response = await fetch(url, options);

  if(response.status !== 200){
    const error = await response.text();
    throw new Error(`Could not fetch ${url}: ${error}`);
  }

  return await response.json();
};

export {makeRequest, apiBase};