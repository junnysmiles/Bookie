import { Card, CardContent } from "@mui/material";
import { format } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import Box from '@mui/material/Box';
import RatingBar from '@/components/RatingBar'

export default function BookInformation({ book })
{
    const info = ['Genre', 'Date Read', 'Number of Pages', 'Pages Read', 'Percentage Read', 'Finished?', 'Rating', 'Review']

    function formattedDate() {
        const newDate = book.date_read ? format(new Date(book.date_read), "MMMM d, yyyy @ h:mmaaa") : '—'

        return newDate
    }

    const bookInfo = [book.book_genre, formattedDate(), book.number_of_pages, book.pages_read, book.percentage_read, book.finished_book, book.rating, book.review]

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    {info.map((value, i) => (
                        <div key={i} className="grid grid-cols-6">
                            <p className={`underline decoration-indigo-500 decoration-3 font-bold ${i !== info.length - 1 ? 'mb-3' : ''}`}>{value}:</p>
                            <div className="col-span-5">
                                {i === 4 ? (
                                    <>
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
                                    </>
                                ) : i === 5 ? (
                                    book.isFinished ? (
                                        <>
                                            <CheckIcon className="text-green-600" />
                                        </>
                                        ) : (
                                        <>
                                            <CloseIcon className="text-red-600" />
                                        </>
                                    )
                                ) : i === 6 ? (
                                    <>
                                        <RatingBar rating={book.rating} isReadOnly={true} />
                                    </>
                                ) : (
                                    bookInfo[i] ?? '—'
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}