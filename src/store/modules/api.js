import axios from 'axios';

function get(url, handle) {
  axios
    .get(`http://localhost:3005/api/v1/${url}`)
    .then((response) => { handle(response); })
    .catch((error) => console.log(error.response, url));
}

export default {
  get,
};
