import React from 'react';
import styles from './Login.module.scss';

//Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//material ui input
import TextField from '@material-ui/core/TextField';

const Login = () => {
  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography component='div'>
          <TextField id='standard-basic' label='Standard' />
        </Typography>
        <Typography className={styles.title} color='textSecondary' gutterBottom>
          Login
        </Typography>
        <Typography component='div'>
          <TextField id='standard-basic' label='Standard' />
        </Typography>
        <Typography className={styles.pos} color='textSecondary'>
          Password
        </Typography>
        <Typography variant='body2' component='p'>
          don&apos;t worry be happy
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' className={styles.button}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
