import CollectionTable from '@/components/CollectionTable.js'

export const metadata = {
    title: "Bookie - Collection"
}


export default function Collection() {
    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Your Collection</h1>
            <CollectionTable />
        </>
    )
}