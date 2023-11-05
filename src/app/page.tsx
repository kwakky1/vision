'use client'
import { Box, Container, TextField, NativeSelect, Typography, Button, InputLabel, Grid, MenuItem } from '@mui/material';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useForm, Controller } from "react-hook-form";
import { VRText } from '../components/components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface IFormInputs {
  name: string
  birthday: string
  full_right_sph: number
  full_right_cyl: number
  full_right_axi: number
  full_right_cv: number
  full_right_add: number
  full_left_sph: number
  full_left_cyl: number
  full_left_axi: number
  full_left_cv: number
  full_left_add: number
  staff: string
  store: string
}

export default function Home() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      // name: '김태진',
      // birthday: '19750131',
      // staff: 'kylie',
      // store: 'JL',
      // full_right_sph: 1.5,
      // full_right_cyl: -1,
      // full_right_axi: 30,
      full_right_cv: 1.0,
      // full_right_add: 1,
      // full_left_sph: 0.5,
      // full_left_cyl: -2.0,
      // full_left_axi: 140,
      full_left_cv: 1.0,
      // full_left_add: 2
    }
  });

  const onSubmit = (data: any) => {
    const query = {
      name: data.name,
      birthday: data.birthday,
      full: {
        right: {
          sph: data.full_right_sph,
          cyl: data.full_right_cyl,
          axi: data.full_right_axi,
          cv: data.full_right_cv,
          add: data.full_right_add,
        },
        left: {
          sph: data.full_left_sph,
          cyl: data.full_left_cyl,
          axi: data.full_left_axi,
          cv: data.full_left_cv,
          add: data.full_left_add,
        }
      },
      staff: data.staff,
      store: data.store
    }

    // curSummit = {
    //   name: data.name,
    //   birthday: data.birthday,
    //   staff: data.staff,
    //   store: data.store,
    //   full_right_sph: data.full_right_sph,
    //   full_right_cyl: data.full_right_cyl,
    //   full_right_axi: data.full_right_axi,
    //   full_right_cv: data.full_right_cv,
    //   full_right_add: data.full_right_add,
    //   full_left_sph: data.full_left_sph,
    //   full_left_cyl: data.full_left_cyl,
    //   full_left_axi: data.full_left_axi,
    //   full_left_cv: data.full_left_cv,
    //   full_left_add: data.full_left_add,
    // }
    const queryJSON = JSON.stringify(query)
    router.push(`report?input=${queryJSON}`
    )
  };

  const onInvalid = (errors: any) => {
    console.error(errors)
  }

  const handleStaffChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
  };

  return (
    // <Box sx={{ py: { xs: 7.5, sm: 15 } }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container style={{
        // background: "#ff0000",
        padding: 32,
        width: 793,
        height: 1122
      }}>
        <Grid item style={{
          marginBottom: 32
        }}>
          <Typography
            fontSize={24}
            fontWeight={700}
            textAlign={'center'}
            color={"#113287"}
          >
            비전 리포트 생성을 위한 올바른 값을 입력하세요
          </Typography>
        </Grid>

        {/* <Grid item> */}
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <Grid container direction={'row'}
            // spacing={1} 
            style={{
              // backgroundColor: "#0000ff33",
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
            <Grid item
              style={{
                flex: 1,
                marginRight: 16
              }}
            >
              <TextController
                name="name"
                control={control}
                required='이름을 입력하세요'
                label={'성함'}
              // variant='filled'
              />
            </Grid>
            <Grid item
              style={{
                flex: 1,
              }}
            >
              <Controller
                name={'birthday'}
                control={control}
                // defaultValue={defaultValue}
                rules={{ required: '생년월일을 입력하세요' }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    sx={{
                      width: '100%',
                      // textAlign: 'center',
                      // ...(style || {})
                      // flex:1
                    }}
                    // format="YYYYMMDD"
                    label={'생년월일'}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid>
          </Grid>
          {RenderFullFieldForm(control)}
          <Grid container direction={'row'}
            // spacing={1} 
            style={{
              // backgroundColor: "#0000ff33",
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
            <Grid item
              style={{
                flex: 1,
                marginRight: 16,
                // backgroundColor: "#0000ff33",
              }}
            >
              <SelectController
                name="staff"
                control={control}
                required='담당자를 선택해주세요'
                label={'담당자'}
                variant='filled'
              >
                <MenuItem value={'ian'}>ian</MenuItem>
                <MenuItem value={'joshua'}>joshua</MenuItem>
                <MenuItem value={'kepi'}>kepi</MenuItem>
                <MenuItem value={'kylie'}>kylie</MenuItem>
                <MenuItem value={'luke'}>luke</MenuItem>
                <MenuItem value={'maddy'}>maddy</MenuItem>
                <MenuItem value={'nick'}>nick</MenuItem>
                <MenuItem value={'noah'}>noah</MenuItem>
              </SelectController>
            </Grid>
            <Grid item
              style={{
                flex: 1,
              }}
            >
              <SelectController
                name="store"
                control={control}
                required='매장를 알려주세요'
                label={'매장'}
                variant='filled'
              >
                <MenuItem value={'YK'}>역삼점</MenuItem>
                <MenuItem value={'YD'}>여의도점</MenuItem>
                <MenuItem value={'SC'}>서울시청점</MenuItem>
                <MenuItem value={'SS'}>삼성점</MenuItem>
                <MenuItem value={'PG'}>판교점</MenuItem>
                <MenuItem value={'JL'}>잠실롯데월드점</MenuItem>
                <MenuItem value={'MK'}>마곡점</MenuItem>
                <MenuItem value={'SI'}>신사점</MenuItem>
                <MenuItem value={'EJ'}>을지로점</MenuItem>
              </SelectController>
            </Grid>
          </Grid>
          <Grid item style={{
            width: '100%',
          }}>
            <Button style={{
              width: '100%',
              marginTop: 16,
              fontSize: 24,
              height: 64,
              borderRadius: 100,
            }}
              type="submit"
              variant="contained"
            >
              비전리포트 생성
            </Button>
          </Grid>
        </form>
      </Container>
    </LocalizationProvider>
  );
}

const TextController = ({
  name,
  control,
  required,
  defaultValue = '',
  label,
  variant,
  style
}: {
  name: string,
  control: any,
  required?: string,
  defaultValue?: any
  label?: string,
  variant?: any
  style?: any
}) => {
  return <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={{ required }}
    render={({ field, fieldState }) => (
      <TextField
        style={{
          width: '100%',
          textAlign: 'center',
          ...(style || {})
          // flex:1
        }}
        variant={variant || 'outlined'}
        label={label}
        value={field.value}
        onChange={field.onChange}
        error={fieldState.error !== undefined}
        helperText={fieldState.error && fieldState.error.message}
      />
    )}
  />
}

const SelectController = ({
  name,
  control,
  required,
  defaultValue = '',
  label,
  variant,
  style,
  children
}: {
  name: string,
  control: any,
  required?: string,
  defaultValue?: any
  label?: string,
  variant?: any
  style?: any,
  children: any[]
}) => {
  return <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={{ required }}
    render={({ field, fieldState }) => (
      <TextField
        style={{
          width: '100%',
          textAlign: 'center',
          ...(style || {})
          // flex:1
        }}
        select
        variant={variant || 'outlined'}
        label={label}
        value={field.value}
        onChange={field.onChange}
        error={fieldState.error !== undefined}
        helperText={fieldState.error && fieldState.error.message}
      >
        {children}
      </TextField>
    )}
  />
}

const RenderFullFieldForm = (control: any) => {
  return <Grid container direction={'row'} style={{
    // backgroundColor: "#0000ff33",
    marginTop: 24,
    marginBottom: 24
  }}>
    <Grid item style={{ flex: 1 }}>
      <VRText weight='500' style={{ height: 32 }}>{' '}</VRText>
      <VRText weight='500' size={20} style={{ marginTop: 12 }}>Right</VRText>
      <VRText weight='500' size={20} style={{ marginTop: 50 }}>Left</VRText>
    </Grid>
    <Grid item style={{
      flex: 1, marginRight: 16,
    }}>
      <VRText weight='500' style={{ height: 32 }}>{'SPH'}</VRText>
      <TextController
        name="full_right_sph"
        control={control}
        defaultValue={0.00}
        required='Right SPH 를 입력하세요'
      />
      <TextController
        name="full_left_sph"
        control={control}
        defaultValue={0.00}
        required='Left SPH 를 입력하세요'
        style={{ marginTop: 24 }}
      />
    </Grid>
    <Grid item style={{
      flex: 1, marginRight: 16,
    }}>
      <VRText weight='500' style={{ height: 32 }}>{'CYL'}</VRText>
      <TextController
        name="full_right_cyl"
        control={control}
        defaultValue={0.00}
        required='Right CYL 를 입력하세요'
      />
      <TextController
        name="full_left_cyl"
        control={control}
        defaultValue={0.00}
        required='Left CYL 를 입력하세요'
        style={{ marginTop: 24 }}
      />
    </Grid>
    <Grid item style={{
      flex: 1, marginRight: 16,
    }}>
      <VRText weight='500' style={{ height: 32 }}>{'AXIS'}</VRText>
      <TextController
        name="full_right_axi"
        control={control}
        defaultValue={0.00}
        required='Right AXIS 를 입력하세요'
      />
      <TextController
        name="full_left_axi"
        control={control}
        defaultValue={0.00}
        required='Left AXIS 를 입력하세요'
        style={{ marginTop: 24 }}
      />
    </Grid>
    <Grid item style={{
      flex: 1, marginRight: 16,
    }}>
      <VRText weight='500' style={{ height: 32 }}>{'C.V'}</VRText>
      <SelectController
        name="full_right_cv"
        control={control}
        defaultValue={1.00}
        required='Right C.V 를 입력하세요'
      >
        <MenuItem value={'NA'}>NA</MenuItem>
        <MenuItem value={0.1}>0.1</MenuItem>
        <MenuItem value={0.2}>0.2</MenuItem>
        <MenuItem value={0.3}>0.3</MenuItem>
        <MenuItem value={0.4}>0.4</MenuItem>
        <MenuItem value={0.5}>0.5</MenuItem>
        <MenuItem value={0.6}>0.6</MenuItem>
        <MenuItem value={0.7}>0.7</MenuItem>
        <MenuItem value={0.8}>0.8</MenuItem>
        <MenuItem value={0.9}>0.9</MenuItem>
        <MenuItem value={1.0}>1.0</MenuItem>
        <MenuItem value={2.0}>1.0 초과</MenuItem>
      </SelectController>
      <SelectController
        name="full_left_cv"
        control={control}
        defaultValue={1.00}
        required='Left C.V 를 입력하세요'
        style={{ marginTop: 24 }}
      >
        <MenuItem value={'NA'}>NA</MenuItem>
        <MenuItem value={0.1}>0.1</MenuItem>
        <MenuItem value={0.2}>0.2</MenuItem>
        <MenuItem value={0.3}>0.3</MenuItem>
        <MenuItem value={0.4}>0.4</MenuItem>
        <MenuItem value={0.5}>0.5</MenuItem>
        <MenuItem value={0.6}>0.6</MenuItem>
        <MenuItem value={0.7}>0.7</MenuItem>
        <MenuItem value={0.8}>0.8</MenuItem>
        <MenuItem value={0.9}>0.9</MenuItem>
        <MenuItem value={1.0}>1.0</MenuItem>
      </SelectController>
    </Grid>
    <Grid item style={{
      flex: 1
    }}>
      <VRText weight='500' style={{ height: 32 }}>{'ADD'}</VRText>
      <TextController
        name="full_right_add"
        control={control}
        defaultValue={0.00}
        required='Right ADD 를 입력하세요'
      />
      <TextController
        name="full_left_add"
        control={control}
        defaultValue={0.00}
        required='Left ADD 를 입력하세요'
        style={{ marginTop: 24 }}
      />
    </Grid>
  </Grid>
}
