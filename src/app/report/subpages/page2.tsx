"use client"
import React, { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useSearchParams } from 'next/navigation'
import { Container, Box } from '@mui/material';
import { Header, RefractiveErrorForPad } from '../../../components/parts'
import { VRImage } from '../../../components/components'
import { getValidObject, useWindowDimensions } from '../../../components/utils'

export const Page2 = ({ userData, style = {} }: { userData: any, style?:any }) => {
  return (
    <Box
    style={{
        padding: 0,
        ...style
      }}
    >
      <Header
        name={getValidObject(userData, 'NAME')}
        part={'PART 2'}
        style={{
        }}
        titleSize={32}
        titleColor={'#020F50'}
      />
      <Box width={"100%"} style={{
        marginLeft:16,
        marginTop: 60,
        marginBottom: 58
      }}>
        <VRImage name={'E-12'} style={{
          width: 744,
          height: 235
        }} />
      </Box>
      <RefractiveErrorForPad userData={userData} useCYL={true} />
    </Box>
  )
}
