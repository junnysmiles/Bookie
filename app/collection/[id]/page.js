import { Box } from "@mui/material"
import BackButton from '@/components/BackButton'
import BookInformation from '@/components/BookInformation'
import NotFound from '@/components/NotFound'

export const metadata = {
    title: "Bookie - More Info"
}


export default async function CollectionId({ params }) {

    const book_data = await fetch(`http://localhost:4000/collection/${params.id}`)
    
    if (!book_data.ok) {
        // If the book doesn't exist, show 404 page
        return (
            <NotFound />
        )
    }
    
    const book = await book_data.json()

    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>&quot;{book.book_name}&quot; - {book.book_author}</h1>
            <Box sx={{typography: "subtitle", fontSize: 24, marginTop: 2}}>ID: {params.id}</Box>
            <div className='pt-2'>
                <BackButton href="/collection" />
            </div>
            <div>
                <BookInformation book={book} />
            </div>
        </>
    )
}

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/collection');
    const data = await res.json();

    // Safely map only up to 10 items, or fewer if less than 10
    return data.slice(0, 10).map((item) => ({
        id: item.id.toString()
    }));
}