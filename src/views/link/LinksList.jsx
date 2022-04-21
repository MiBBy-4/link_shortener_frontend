import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { getLinks } from '../../requests/apiRequests/LinkRequests';

export default function LinksList() {
  const [links, setLinks] = useState([]);

  const setState = async () => {
    const response = await getLinks();
    setLinks(response.data);
  };

  useEffect(() => {
    setState();
  });

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Base Link</TableCell>
              <TableCell align="center">Shorted link</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link) => (
              <TableRow
                key={link.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <a href={link.base_link}>{link.base_link}</a>
                </TableCell>
                <TableCell align="left">
                  <a href={`${process.env.REACT_APP_API_URL}${link.shorted_link}`}>{link.shorted_link}</a>
                </TableCell>
                <TableCell align="left">{link.description}</TableCell>
                <TableCell align="left">
                  {link.tags.map((tag) => (
                    <span key={tag.id}>{`${tag.tag_name} `}</span>
                  ))}
                </TableCell>
                <TableCell align="left"><Link to={`/links/${link.id}`}>View</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
