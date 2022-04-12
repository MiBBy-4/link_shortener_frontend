import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getLink } from '../apiRequests/LinkRequests';

export default function LinkShow() {
  const [link, setLink] = useState({});
  const { linkId } = useParams();

  const setState = async () => {
    const response = await getLink(linkId);
    setLink(response.data);
  };

  useEffect(() => {
    setState();
  });

  return (
    <h1>
      {link.base_link}
    </h1>
  );
}
