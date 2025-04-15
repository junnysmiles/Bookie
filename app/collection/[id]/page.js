export const metadata = {
    title: "Bookie - More Info"
}


export default function CollectionId({ params }) {
    return (
        <> 
            <h1>Collection ID Page: {params.id}</h1>
        </>
    )
}