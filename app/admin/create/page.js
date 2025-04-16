import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { indigo } from '@mui/material/colors';

export const metadata = {
    title: "Bookie - Add Book"
}

export default function Create() {
    return (
        <>
            <h1 className='font-sans font-bold text-4xl'>Book Diary - Add Book</h1>
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