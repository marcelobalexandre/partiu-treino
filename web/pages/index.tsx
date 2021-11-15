import type { NextPage } from 'next'
import Link from 'next/link'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home: NextPage = () => (
  <Container maxWidth="xs">
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          align="center"
          style={{ marginBottom: '16px', marginTop: '24px' }}
        >
          #partiu-treino
        </Typography>
      </Grid>
    </Grid>

    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <Link href="/login" passHref>
          <Button variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
        </Link>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid item>
        <Link href="/signup" passHref>
          <Button variant="outlined" color="primary" fullWidth>
            Criar conta
          </Button>
        </Link>
      </Grid>
    </Grid>
  </Container>
)

export default Home
