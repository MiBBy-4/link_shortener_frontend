import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import { getLink } from '../../requests/apiRequests/LinkRequests';

export default function LinkShow(props) {
  const [link, setLink] = useState({});
  const [tags, setTags] = useState([]);
  const { linkId } = useParams();
  const { user } = props;
  const setState = async () => {
    const response = await getLink(linkId);
    const { data } = response;
    setLink(response.data);
    setTags(data.tags);
  };

  useEffect(() => {
    setState();
  });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <b>Base link: </b>
          <a href={link.base_link}>{link.base_link}</a>
        </Typography>
        <Typography variant="h5" component="div">
          <b>Shorted link: </b>
          <a href={`${process.env.REACT_APP_API_URL}${link.shorted_link}`}>{link.shorted_link}</a>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          { link.description }
        </Typography>
        <Typography variant="body2">
          <b>Created At:</b>
          {` ${link.created_at} `}
          {link.user_id === user.id &&
            <div>
              <b>views: </b>
              {` ${link.views} `}
            </div> }
        </Typography>
      </CardContent>
      <div className="d-flex justify-content-center">
        <div className="tags-input-container w-25 mt-2 d-flex justify-content-center">
          { tags.map((tag, index) => (
            <div className="tags-item" key={index}>
              <span className="text">{tag.tag_name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
