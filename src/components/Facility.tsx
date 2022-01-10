import React, { ChangeEvent, useCallback, useState } from 'react';
import Container from '@material-ui/core/Container';
import {
  Avatar,
  Button,
  Chip,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import dayjs from 'dayjs';
import { IFacility } from '../models/IFacility';
import { useForm, Controller } from 'react-hook-form';

const initFacility: IFacility = {
  id: '',
  name: 'name の初期値',
  note: 'note の初期値',
  system: {
    createDate: new Date(),
    createUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://bit.ly/3pM3urc',
    },
    lastUpdateUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://bit.ly/3pM3urc',
    },
    lastUpdate: new Date(),
  },
};

const useStyle = makeStyles((_theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 16,
    },
  },
  paper: {
    padding: 16,
  },
  rightActions: {
    textAlign: 'right',
  },
  cancelButton: {
    color: '#dc143c',
  },
}));

export const Facility = () => {
  const style = useStyle();
  const [facility, setfacility] = useState(initFacility);
  const { system } = initFacility;

  const { register, errors, control } = useForm({
    defaultValues: initFacility,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          as={
            <TextField
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? '必須です' : ''}
            />
          }
        />
        <TextField label="詳細" fullWidth multiline value={facility.note} />
        <InputLabel shrink>登録者</InputLabel>
        <div>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format('YYYY-MM-DD HH:mm')}
        </div>
        <InputLabel shrink>更新者</InputLabel>
        <div>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(system.lastUpdate).format('YYYY-MM-DD HH:mm')}
        </div>
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="contained"
              className={style.cancelButton}
              startIcon={<DeleteIcon />}
            >
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
