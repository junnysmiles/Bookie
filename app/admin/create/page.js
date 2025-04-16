import BackButton from '@/components/BackButton'
import BookForm from '@/components/BookForm'

export const metadata = {
    title: "Bookie - Add Book"
}

export default function Create() {
    return (
        <>
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Add Book</h1>
            <div className='pt-2'>
                <BackButton href="/admin" />
            </div>
            <div className='mt-7 mx-8'>
                <BookForm />
            </div>
        </>
    )
}