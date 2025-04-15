import NavBar from '@/app/navbar'

export const metadata = {
    title: "Bookie - Edit Book"
}


export default function CollectionId({ params }) {
    return (
        <> 
            <NavBar />
            <h1>Edit Book ID Page: {params.id}</h1>
        </>
    )
}