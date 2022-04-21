import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
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
    <Container>
      <Card className="mt-5 py-2 px-2" border="secondary">
        <Card.Title className="text-center">
          { link.base_link }
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          { link.description }
          <div className="d-flex justify-content-center">
            <div className="tags-input-container w-25 mt-2 d-flex justify-content-center">
              { tags.map((tag, index) => (
                <div className="tags-item" key={index}>
                  <span className="text">{tag.tag_name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card.Subtitle>
        <Card.Body>
          <ListGroup className="list-group=flush">
            <ListGroupItem>
              <b>Base link: </b>
              <a href={link.base_link}>{link.base_link}</a>
            </ListGroupItem>
            <ListGroupItem>
              <b>Shorted link: </b>
              <a href={`${process.env.REACT_APP_API_URL}${link.shorted_link}`}>{link.shorted_link}</a>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-center">
          <b>Created At:</b>
          {` ${link.created_at} `}
          {link.user_id === user.id ? (
            <div>
              <b>views: </b>
              {` ${link.views} `}
            </div>
          ) : (null)}
        </Card.Footer>
      </Card>
    </Container>
  );
}
