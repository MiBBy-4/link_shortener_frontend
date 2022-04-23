import axios from 'axios';

export function getLinks() {
  return axios.get(`${process.env.REACT_APP_API_URL}api/v1/links`, { withCredentials: true });
}

export async function postLink(data, tags, handleSuccessfulPost) {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}api/v1/links`, {
    link: {
      base_link: data.get('base_link'),
      description: data.get('description'),
    },
    tags: tags,
  }, { withCredentials: true });

  const { data: { status } } = response;
  if (status === 201) {
    handleSuccessfulPost();
  }
}

export function getLink(linkId) {
  return axios.get(`${process.env.REACT_APP_API_URL}api/v1/links/${linkId}`, { withCredentials: true });
}
