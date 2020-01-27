import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'titulo', label: 'Titulo', minWidth: 170 },
  { id: 'subtitulo', label: 'Sub Titulo', minWidth: 100 },
  {
    id: 'descripcion',
    label: 'Descripcion',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'fichatecnica',
    label: 'Ficha Tecnica',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'imagen',
    label: 'Imagen',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'enlace',
    label: 'Enlace',
    minWidth: 170,
    align: 'center',
  },
];

function createData(titulo, subtitulo, descripcion, fichatecnica, imagen, enlace) {
  return {titulo, subtitulo, descripcion, fichatecnica, imagen, enlace};
}

const rows = [
  createData('Taco Fischer metálico FBS', 
  'Una buena Selladora',
  'Sellador adhesivo universal con tecnología híbrida de alta performance y agarre inmediato. Pega – Rellena – Sella', 
  'ficha.PDF',
   'TacoFischer.jpg',
   'https://www.youtube.com/watch?v=B7uMdmCQabc&list=RDB7uMdmCQabc&index=1'),
  createData(
    'Caballetes Sorrento N° 3',
    'Un muy buen Sorrento (Recomendado) :)',
    'Hormigonera con tambor Bicónico. Pala cargadora con elevación a cable de acero y vibrador incorporado.',
    'fichatecnica.Pdf',
    'caballetes.jpg',
    'https://www.youtube.com/watch?v=B7uMdmCQabc&list=RDB7uMdmCQabc&index=1'
  ),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Admin2() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
