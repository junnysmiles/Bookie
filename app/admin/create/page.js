import BackButton from '@/components/BackButton'

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
        </>
    )
}