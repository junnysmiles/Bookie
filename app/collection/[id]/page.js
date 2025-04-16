import { Box } from "@mui/material"
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookInformation from '@/components/BookInformation'

export const metadata = {
    title: "Bookie - More Info"
}


export default async function CollectionId({ params }) {

    const book_data = await fetch(`http://localhost:4000/collection/${params.id}`)
    const book = await book_data.json()

    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>&quot;{book.book_name}&quot; - {book.book_author}</h1>
            <Box sx={{typography: "subtitle", fontSize: 24, marginTop: 2}}>ID: {params.id}</Box>
            <div className='pt-2'>
                <Link href="/collection">
                    <IconButton sx={{color: "white"}} size="large" aria-label="back">
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                </Link>
            </div>
            <div>
                <BookInformation book={book} />
            </div>
        </>
    )
}

export async function generateStaticParams()
{
    return [
        {id: "1"},
        {id: "2"},
        // {id: "3"},
        // {id: "4"},
        // {id: "5"},
        // {id: "6"},
        // {id: "7"},
        // {id: "8"},
        // {id: "9"},
        // {id: "10"},
    ]
}