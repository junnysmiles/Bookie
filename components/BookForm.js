import TextField from '@mui/material/TextField';
import { indigo } from '@mui/material/colors';
import RatingBar from '@/components/RatingBar'
import { Button } from '@mui/material';
import { revalidatePath } from 'next/cache';

const table_rows = [
    { label: "Book Name", field: "book_name" },
    { label: "Author", field: "book_author" },
    { label: "Genre", field: "book_genre" },
    { label: "Date Read", field: "date_read" },
    { label: "Number of Pages", field: "number_of_pages" },
    { label: "Pages Read", field: "pages_read" },
    { label: "Rating", field: "rating" },
    { label: "Review", field: "review" }
]

export default function BookForm()
{
    async function createBook(formData)
    {
        'use server'

        const bookName = formData.get('book_name');
        const author = formData.get('book_author');
        const genre = formData.get('book_genre');
        const dateRead = formData.get('date_read');
        const numberOfPages = parseFloat(formData.get('number_of_pages'));
        const pagesRead = parseFloat(formData.get('pages_read'));
        const rating = formData.get('rating');
        const review = formData.get('review');

        const response = await fetch('http://localhost:4000/collection');
        const books = await response.json();
        const latestId = books.length > 0 ? Math.max(...books.map(book => book.id)) : 0;
        const nextId = latestId + 1;

        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        const formattedTime = timeFormatter.format(now).toLowerCase();

        // Combine date and time
        const newDateRead = `${dateRead} @ ${formattedTime}`;
        
        let percentageRead = numberOfPages > 0 ? (pagesRead / numberOfPages) * 100 : 0;
        percentageRead = Math.round(percentageRead);
        if (percentageRead < 1 && pagesRead > 0) {
          percentageRead = 1;
        }
        
        const isFinished = percentageRead >= 100;
        const finishedBook = isFinished ? 'yes' : 'no';

        const newBookData = {
            id: nextId.toString(),
            book_name: bookName,
            book_author: author,
            book_genre: genre,
            date_read: newDateRead,
            number_of_pages: numberOfPages,
            pages_read: pagesRead,
            percentage_read: percentageRead,
            finished_book: finishedBook,
            isFinished,
            rating,
            review
        }

        await fetch ('http://localhost:4000/collection', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBookData)
        })

        revalidatePath('/collection')
        revalidatePath('/admin')

        console.log(formData)
    }

    return (
        <form action={createBook}>
            <div className='grid grid-cols-2 gap-4'>
                {table_rows.map((value,i) => {
                    const isLastField = i === table_rows.length - 1
                    const isSecondLast = i === table_rows.length - 2;

                    return (
                        <div key={i} className={`flex items-center ${isSecondLast || isLastField ? 'col-span-2' : ''}`}>
                            {isSecondLast ? (
                                <div className='flex'>
                                    <p className='pr-3 text-lg'>Rating:</p>
                                    <RatingBar />
                                </div>
                            ) : (
                                <TextField
                                key={i}
                                sx={{
                                    input: { color: 'white' }, // text color
                                    label: { color: 'white' }, // label color
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // default border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gray', // on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: indigo[300] // on focus
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white', // text color for input and textarea
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white', // label color
                                    },
                                }} 
                                id={isLastField ? 'outlined-multiline-flexible' : 'outline-basic'}
                                label={value.label} 
                                name={value.field}
                                variant="outlined" 
                                multiline={isLastField}
                                fullWidth
                            />
                            )}
                        </div>
                    )
                })}
            </div>
            <div className='pt-6 flex justify-center'>
                <Button type="submit" variant="contained" size="large" fullWidth sx={{backgroundColor: indigo[300]}}>Submit</Button>
            </div>
        </form>
    )
}