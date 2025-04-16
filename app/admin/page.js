import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import CollectionTable from '@/components/CollectionTable'
import Link from 'next/link';

export const metadata = {
    title: "Bookie - Admin"
}

export default function Admin() {
    return (
        <>
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Your Collection (Admin)</h1>
            <div className='justify-self-end'>
                <Button variant="contained" sx={{backgroundColor: indigo[300]}}>
                    <Link href="/admin/create">Add Book</Link>
                </Button>
            </div>
            <CollectionTable isAdmin={true} />
            {/* <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack> */}
        </>
    )
}