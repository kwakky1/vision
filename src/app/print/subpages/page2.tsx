"use client"
import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { Header, Footer, Accommodation, Addition } from '../../../components/parts'
import { getValidObject } from '../../../components/utils'

export const Page2 = ({ userData }: { userData: any }) => {
  return <Box
  sx={{
    width: '21cm',
    minHeight: '29.7cm',
    padding: '0.5cm 1cm 0.3cm',
    margin: '0 auto',
    // border: '1px #D3D3D3 solid',
    // borderRadius: '5px',
    // background: 'white',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    // background: "#ff000033",
  }}
>
    <Header name={getValidObject(userData, 'NAME')} page={'2'} date={getValidObject(userData, 'DATE')} style={{}} />
    <Accommodation
      userData={userData}
      style={{
        marginTop: 4
      }} />
    <Addition
      userData={userData}
      style={{
        marginTop: 16
      }}
    />
    <Footer
      store={getValidObject(userData, 'STORE')}
      staff={getValidObject(userData, 'STAFF')}
      date={getValidObject(userData, 'NEXT_DATE')}
      style={{
        marginTop: 8
      }} />
  </Box>
}
