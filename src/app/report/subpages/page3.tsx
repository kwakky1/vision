"use client"
import React, { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useSearchParams } from 'next/navigation'
import { Container, Box } from '@mui/material';
import { Header, AstigmatismAxisForPad } from '../../../components/parts'
import { VRImage } from '../../../components/components'
import { getValidObject, useWindowDimensions } from '../../../components/utils'

export const Page3 = ({ userData, style = {} }: { userData: any, style?:any }) => {
  return (
    <Box
    style={{
        // flexGrow:1,
        padding: 0,
        ...style
      }}
    >
      <Header
        name={getValidObject(userData, 'NAME')}
        part={'PART 3'}
        style={{
          // marginRight:0,
        }}
        titleSize={32}
        titleColor={'#020F50'}
      />
      <Box width={"100%"} style={{
        height: 248,
        marginTop: 72,
        marginBottom: 42
      }}>
        <VRImage name={'F-13'} style={{
          position:'absolute',
          // marginTop:8,
          width: 762,
          height: 215
        }} />
      </Box>
      <AstigmatismAxisForPad userData={userData}/>
    </Box>
  )
}
