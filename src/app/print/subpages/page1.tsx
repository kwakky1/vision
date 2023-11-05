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
      // border: '1px #D3D3D3 solid',
      // borderRadius: '5px',
      // background: 'white',
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      // background: "#0000ff33",
    }}
  >
    {/* <Container
      style={{
        // background: "#ff000033",
        width:containerWidth,
        height:containerHeight,
        // width: PAGE_WIDTH,
        // height: PAGE_HEIGHT,
        // marginLeft,
        // marginTop,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        // transform:`scale(${zoomRatio})`
      }}
      // onLayout={(event)=>{
      //   console.log('Container' )
      // }}
      > */}
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

const Page2 = ({ userData }: { userData: any }) => {
  return <Box
  sx={{
    width: '21cm',
    minHeight: '29.7cm',
    padding: '0.5cm 1cm 0.3cm',
    margin: '0 auto',
    border: '1px #D3D3D3 solid',
    borderRadius: '5px',
    background: 'white',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
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
