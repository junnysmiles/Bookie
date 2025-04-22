import BackButton from '@/components/BackButton'
import BookForm from '@/components/BookForm'

export const metadata = {
    title: "Bookie - Edit Book"
}


export default async function CollectionId({ params }) {
    const res = await fetch(`http://localhost:4000/collection/${params.id}`, {
        cache: 'no-store'
    })
    const book = await res.json()

    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Edit Book - {params.id}</h1>
            <div className='pt-2'>
                <BackButton href="/admin" />
            </div>
            <div className='mt-7 mx-8'>
                <BookForm book={book} isEdit={true} />
            </div>
        </>
    )
}