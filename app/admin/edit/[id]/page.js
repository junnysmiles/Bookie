export const metadata = {
    title: "Bookie - Edit Book"
}


export default function CollectionId({ params }) {
    return (
        <> 
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Edit Book - {params.id}</h1>
            <div className='pt-2'>
                <Link href="/admin">
                    <IconButton sx={{color: "white"}} size="large" aria-label="back">
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                </Link>
            </div>
        </>
    )
}