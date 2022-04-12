import axios from 'axios';

export function getLinks() {
  return axios.get(`${process.env.REACT_APP_API_URL}api/v1/links`, { withCredentials: true });
}

export function postLink(data) {
  return axios.post(`${process.env.REACT_APP_API_URL}api/v1/links`, {
    link: {
      base_link: data.get('base_link'),
      description: data.get('description'),
    },
  }, { withCredentials: true });
}

export function getLink(linkId) {
  return axios.get(`${process.env.REACT_APP_API_URL}api/v1/links/${linkId}`, { withCredentials: true });
}
