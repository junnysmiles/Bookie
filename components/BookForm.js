import TextField from '@mui/material/TextField';
import { indigo } from '@mui/material/colors';

export default function BookForm()
{
    const table_rows = ["Book Name", "Author", "Genre", "Date Read", "Number of Pages", "Pages Read", "Rating", "Review"]

    return (
        <form>
            <div className='grid grid-cols-2 gap-4'>
                {table_rows.map((value,i) => (
                    <TextField
                        key={i}
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
            </div>
        </form>
    )
}