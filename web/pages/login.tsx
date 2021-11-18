import { ReactNode } from 'react'
import type { NextPage } from 'next'
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import Joi from 'joi'
import Link from 'next/link'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import SubmitButtonIcon from '@mui/icons-material/ArrowRightAlt'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Inputs = {
  email: string,
  password: string
}

const validationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required()
})

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: joiResolver(validationSchema) });
  const onSubmit: SubmitHandler<Inputs> = async data => { console.log('>>>> submit', data) };

  let submitButtonIcon: ReactNode | null = <SubmitButtonIcon style={{ fontSize: 24 }} />
  let submitButtonChildren: string | ReactNode = 'Entrar'
  if (isSubmitting) {
    submitButtonIcon = null
    submitButtonChildren = <CircularProgress size={25} />
  }

  return (
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
            Entrar
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="column" justifyContent="center" spacing={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                type="email"
                label="E-mail"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                disabled={isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Senha"
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                disabled={isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={submitButtonIcon}
                disabled={isSubmitting}
                fullWidth
              >
                {submitButtonChildren}
              </Button>
            </Grid>

            <Grid item>
              <Divider />
            </Grid>

            <Grid item>
              <Link href="/signup" passHref>
                <Button variant="outlined" color="primary" fullWidth disabled={isSubmitting}>
                  Criar conta
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  )
}

export default Login
