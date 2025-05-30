import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { indigo } from '@mui/material/colors';
import { format } from 'date-fns';
import { List, ListItem, ListItemText } from '@mui/material';
import RatingBar from '@/components/RatingBar'
import { deleteBook } from '../actions'

export default async function CollectionTable({ isAdmin = false }) {
    const book_data = await fetch("http://localhost:4000/collection")
    const books = await book_data.json()

    const table_rows = ["ID", "Book Name", "Author", "Genre", "Date Read", "Number of Pages", "Pages Read", "Percentage Read", "Finished?", "Rating", "Review"]

    return (
        <>
            {isAdmin ? (
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
                                    <TableCell sx={{fontWeight: 'bold'}} key={row}>{row}</TableCell>
                                ))}
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Edit</TableCell>
                                    <TableCell align="center" sx={{fontWeight: 'bold'}}>Delete</TableCell>
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
                                    <TableCell>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress sx={{color: indigo[300]}} variant="determinate" value={book.percentage_read} />
                                            <Box
                                                sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{ color: 'text.secondary' }}
                                                >
                                                {book.percentage_read}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {book.isFinished ? (
                                            <>
                                                <CheckIcon className="text-green-600" />
                                            </>
                                            ) : (
                                            <>
                                                <CloseIcon className="text-red-600" />
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <RatingBar initialRating={book.rating} isReadOnly={true} />
                                    </TableCell>
                                    <TableCell align='left'>{book.review}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/edit/${book.id}`}>
                                            <IconButton edge="end" aria-label="edit">
                                                    <EditIcon />
                                            </IconButton> 
                                        </Link>                                     
                                    </TableCell>
                                    <TableCell>
                                        <form action={deleteBook.bind(null, book.id)}>
                                            <IconButton type="submit" edge="end" aria-label="edit">
                                                    <DeleteIcon />
                                            </IconButton>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                    <List
                    sx={{
                        backgroundColor: indigo[100], 
                        color: 'black',
                        marginTop: 3
                    }}>
                        {books.map((book, i) => (
                            <div key={book.id}>
                                <ListItem
                                    key={book.id}
                                    secondaryAction={
                                        <Link href={`/collection/${book.id}`}>
                                            <IconButton edge="end" aria-label="edit">
                                                <ReadMoreIcon />
                                            </IconButton>
                                        </Link>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Box display="flex" gap={4} width="100%">
                                                <Box width="10%" sx={{fontWeight: 'bold'}}>{book.id}</Box>
                                                <Box width="45%">{book.book_name}</Box>
                                                <Box width="45%">{book.book_author}</Box>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {i !== books.length - 1 && <Divider component="li" />}
                            </div>
                        ))}
                </List>
            )}
        </>
    )
}