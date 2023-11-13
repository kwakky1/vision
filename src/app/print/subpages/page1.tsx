"use client"
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Header, RefractiveError, Astigmatism, AstigmatismAxis, Footer, Accommodation, Addition } from '../../../components/parts'
import { getValidObject, useWindowDimensions } from '../../../components/utils'

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};
export const Page1 = ({ 
  userData,
  style = {}
}: { 
  userData: any,
  style?:any;
}) => {
  return <Box
    sx={{
      width: '21cm',
      minHeight: '29.7cm',
      padding: '0.5cm 1cm 0.3cm',
      margin: '0 auto',
      ...style,
    }}
  >
    <Header name={getValidObject(userData, 'NAME')} date={getValidObject(userData, 'DATE')} style={{}} />
    <RefractiveError userData={userData} />
    <Astigmatism userData={userData}
      style={{
        marginTop: 16,
        marginBottom: 10
      }} />
    <AstigmatismAxis userData={userData}
      style={{
        marginTop: 16,
        marginBottom: 12
      }} />
    <Footer
      store={getValidObject(userData, 'STORE')}
      staff={getValidObject(userData, 'STAFF')}
      date={getValidObject(userData, 'NEXT_DATE')}
      style={{
        // marginTop: 8
      }} />
    {/* </Container> */}
  </Box>
}
