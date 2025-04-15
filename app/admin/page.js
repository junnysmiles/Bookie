import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavBar from '../navbar.js'

export const metadata = {
    title: "Bookie - Admin"
}

export default function Admin() {
    return (
        <>
            <NavBar />
            <h1 className="font-extrabold">Admin Page</h1>
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        </>
    )
}