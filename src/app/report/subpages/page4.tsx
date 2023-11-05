"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { Container, Box } from '@mui/material';
import { Header, RefractiveError, Astigmatism, AstigmatismAxis, Footer, Accommodation, Addition, AccommodationPad } from '../../../components/parts'
import { PAGE_WIDTH, PAGE_HEIGHT, GetUserData } from '../../../components/components'
import { getValidObject, useWindowDimensions } from '../../../components/utils'

export const Page4 = ({ userData, style = {} }: { userData: any, style?: any }) => {
  return <Box
  style={{
    // flexGrow:1,
    padding: 0,
    ...style
  }}
  >
    <Header
      name={getValidObject(userData, 'NAME')}
      part={'PART 4'}
      style={{
        // marginRight:0,
      }}
      titleSize={32}
      titleColor={'#020F50'}
    />
    <AccommodationPad
      userData={userData}
      style={{
        marginTop: 44
      }} />
    <Addition
      showScript={false}
      userData={userData}
      style={{
        marginLeft:9,
        marginTop:16,
        // backgroundColor:"#0000ff33"
      }}
    />
  </Box>
}
