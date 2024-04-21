import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SearchingPage() {
    const [svg, setsvg] = React.useState([])
    const [loading, setloading] = React.useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true)
        setsvg([])
        const data = new FormData(event.currentTarget);
        const query = data.get('keyword');
        const response = await fetch(`http://localhost:4000/image/${query}`);
        const body = await response.json();
        
        setsvg(body)
        setloading(false)
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}

                >
                    <div style={{display:"flex",height:"100%", justifyContent:"space-around", padding:"1rem"}}>
                        {loading && <div style={{ height:"100%",display:"flex" , alignItems:"center", margin:"0.5rem",fontSize:"xxlarge", borderRadius:"2rem"}}>Loading...</div>}
                        {svg.length > 0 && svg.map((e) =>
                        <div style={{backgroundColor:"lightblue", margin:"0.5rem", borderRadius:"2rem", height:"25rem"}}>
                            
                            <React.Fragment >
                                
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{fontWeight:"bold" , height:"15rem", overflowY:"auto"}}>
                                        {e}
                                    </Typography>
                                    <div dangerouslySetInnerHTML={{ __html: e }}/>
                                    
                                </CardContent>
                                <CardActions>
                                    <button onClick={()=>navigator.clipboard.writeText(e)} className='copybutton'>copy</button>
                                </CardActions>
                            </React.Fragment>
                            </div>
                        )}
                    </div>

                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"lightgray"}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5" style={{fontSize:"xxlarge", fontWeight:"bold"}}>
                            SVGWorld
                        </Typography>
                        <Typography component="h4" variant="h5" style={{fontSize:"medium"}}>
                            One Stop Destination to Get SVGs
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="keyword"
                                label="keyword"
                                name="keyword"
                                autoComplete="email"
                                autoFocus
                            />


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Search SVG
                            </Button>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}