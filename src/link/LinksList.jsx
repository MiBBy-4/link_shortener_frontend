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
import { getLinks } from '../apiRequests/LinkRequests';

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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Base Link</TableCell>
              <TableCell align="center">Shorted link</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link) => (
              <TableRow
                key={link.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{link.base_link}</TableCell>
                <TableCell align="left">{link.shorted_link}</TableCell>
                <TableCell align="left">{link.description}</TableCell>
                <TableCell align="left"><Link to={`/links/${link.id}`}>View</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
