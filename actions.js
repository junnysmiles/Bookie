'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
    
export async function createBook(formData)
{
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
    redirect('/admin')
}

export async function editBook(formData)
{
    const id = formData.get('id');
    const bookName = formData.get('book_name');
    const author = formData.get('book_author');
    const genre = formData.get('book_genre');
    const dateRead = formData.get('date_read');
    const numberOfPages = parseFloat(formData.get('number_of_pages'));
    const pagesRead = parseFloat(formData.get('pages_read'));
    const rating = formData.get('rating');
    const review = formData.get('review');

    const validDate = new Date(dateRead);
    const isValidDate = !isNaN(validDate.getTime());
    const formattedDateRead = isValidDate ? validDate : new Date();


    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    const formattedTime = timeFormatter.format(now).toLowerCase();
    const newDateRead = `${formattedDateRead.toLocaleDateString()} @ ${formattedTime}`;

    let percentageRead = numberOfPages > 0 ? (pagesRead / numberOfPages) * 100 : 0;
    percentageRead = Math.round(percentageRead);
    if (percentageRead < 1 && pagesRead > 0) {
        percentageRead = 1;
    }
        
    const isFinished = percentageRead >= 100;
    const finishedBook = isFinished ? 'yes' : 'no';

    const updatedBookData = {
        id,
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

    await fetch(`http://localhost:4000/collection/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBookData)
    });

    revalidatePath('/collection')
    revalidatePath(`/collection/${id}`)
    revalidatePath('/admin')
    revalidatePath(`/admin/edit/${id}`)
    redirect('/admin')
}

export async function deleteBook(deleteId)
{
    await fetch(`http://localhost:4000/collection/${deleteId}`, 
        {method: "DELETE"}
    )

    revalidatePath('/collection')
    revalidatePath(`/collection/${deleteId}`)
    revalidatePath('/admin')
}