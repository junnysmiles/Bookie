import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CollectionTable from '@/components/CollectionTable'

export const metadata = {
    title: "Bookie - Admin"
}

export default function Admin() {
    return (
        <>
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Your Collection (Admin)</h1>
            <CollectionTable isAdmin={true} />
            {/* <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack> */}
        </>
    )
}