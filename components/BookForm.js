import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { indigo } from '@mui/material/colors';

export default function BookForm()
{
    const table_rows = ["Book Name", "Author", "Genre", "Date Read", "Number of Pages", "Pages Read", "Rating", "Review"]

    return (
        <form>
            <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
            >
                {table_rows.map((value) => (
                    <TextField   
                        sx={{
                            input: { color: 'white' }, // text color
                            label: { color: 'white' }, // label color
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // default border
                                },
                                '&:hover fieldset': {
                                    borderColor: 'gray', // on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: indigo[300] // on focus
                                },
                            },
                        }} 
                        id="outlined-basic" 
                        label={value} 
                        variant="outlined" />
                ))}
            </Stack>
        </form>
    )
}