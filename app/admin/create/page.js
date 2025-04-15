import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const metadata = {
    title: "Bookie - Add Book"
}

export default function Create() {
    return (
        <>
            <h1 className="font-extrabold">Add Book Page</h1>
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        </>
    )
}