"use client"
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Header, RefractiveErrorForPad } from '../../../components/parts'
import { VRImage } from '../../../components/components'
import { getValidObject } from '../../../components/utils'

export const Page1 = ({ userData, style = {} }: { userData: any, style?:any }) => {
  return (
  <Box
    style={{
      padding:0,
      ...style
    }}
  >
    <Header 
      name={getValidObject(userData, 'NAME')} 
      part={'PART 1'}
      style={{}} 
      titleSize={32}
      titleColor={'#020F50'}      
    />
    <Box width={"65%"} style={{
        marginLeft:44,
        marginTop:24,
    }}>
      <VRImage name={'A-02'} />
    </Box>
    <RefractiveErrorForPad userData={userData} useCYL={false} />
  </Box>
  )
}
