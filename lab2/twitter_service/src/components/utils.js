export function callAPI(params, method, url) {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify(params);
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    return fetch(url, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
}
