import axios from 'axios';

export default function getLinks() {
  return axios.get(`${process.env.REACT_APP_API_URL}api/v1/links`, { withCredentials: true });
}
