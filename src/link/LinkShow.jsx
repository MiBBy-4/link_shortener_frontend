import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { getLink } from '../apiRequests/LinkRequests';

export default function LinkShow(props) {
  const [link, setLink] = useState({});
  const { linkId } = useParams();
  const { user } = props;
  const setState = async () => {
    const response = await getLink(linkId);
    setLink(response.data);
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
        </Card.Subtitle>
        <Card.Body>
          <ListGroup className="list-group=flush">
            <ListGroupItem>
              <b>Base link: </b>
              {link.base_link}
            </ListGroupItem>
            <ListGroupItem>
              <b>Shorted link: </b>
              {link.shorted_link}
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
