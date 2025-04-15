import NavBar from '@/app/navbar'

export const metadata = {
    title: "Bookie - More Info"
}


export default function CollectionId({ params }) {
    return (
        <> 
            <NavBar />
            <h1>Collection ID Page: {params.id}</h1>
        </>
    )
}