import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indigo } from '@mui/material/colors';
import { format } from 'date-fns';

export default async function CollectionTable({ isAdmin = false }) {
    const book_data = await fetch("http://localhost:4000/collection")
    const books = await book_data.json()

    const table_rows = ["ID", "Book Name", "Author", "Genre", "Date Read", "Number of Pages", "Pages Read", "Percentage Read", "Finished?", "Rating", "Review"]

    return (
        <>
            <TableContainer 
                component={Paper}
                sx={{
                    backgroundColor: indigo[100],
                    marginTop: 3
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='font-bold'>
                            {table_rows.map((row) => (
                                <TableCell sx={{fontWeight: 'bold'}}>{row}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow
                                key={book.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{book.id}</TableCell>
                                <TableCell>{book.book_name}</TableCell>
                                <TableCell>{book.book_author}</TableCell>
                                <TableCell>{book.book_genre}</TableCell>
                                <TableCell>{book.date_read ? format(new Date(book.date_read), "MMMM d, yyyy @ h:mmaaa") : '—'}</TableCell>
                                <TableCell>{book.number_of_pages}</TableCell>
                                <TableCell>{book.pages_read}</TableCell>
                                <TableCell>{book.percentage_read}%</TableCell>
                                <TableCell>{book.finished_book}</TableCell>
                                <TableCell>{book.rating}</TableCell>
                                <TableCell align='center'>{book.review}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}