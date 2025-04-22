'use client'

import TextField from '@mui/material/TextField';
import { indigo } from '@mui/material/colors';
import RatingBar from '@/components/RatingBar'
import { Button } from '@mui/material';
import { createBook, editBook } from '../actions'
import { useState } from 'react';

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

export default function BookForm({ isEdit = false, book = {} })
{
    const [formData, setFormData] = useState({
        book_name: book.book_name || '',
        book_author: book.book_author || '',
        book_genre: book.book_genre || '',
        date_read: book.date_read || '',
        number_of_pages: book.number_of_pages || '',
        pages_read: book.pages_read || '',
        rating: book.rating || 0,
        review: book.review || ''
    });

    return (
        <form action={!isEdit ? createBook : editBook}>
            {isEdit && <input type="hidden" name="id" value={book.id} />}
            <div className='grid grid-cols-2 gap-4'>
                {table_rows.map((value,i) => {
                    const isLastField = i === table_rows.length - 1
                    const isSecondLast = i === table_rows.length - 2;

                    const handleChange = (e) => {
                        const { name, value } = e.target;
                        setFormData(prev => ({ ...prev, [name]: value }));
                    };

                    return (
                        <div key={i} className={`flex items-center ${isSecondLast || isLastField ? 'col-span-2' : ''}`}>
                            {isSecondLast ? (
                                <div className='flex'>
                                    <p className='pr-3 text-lg'>Rating:</p>
                                    <RatingBar initialRating={book.rating || 0} />
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
                                value={formData[value.field]}
                                onChange={handleChange}
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