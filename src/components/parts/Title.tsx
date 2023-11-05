import { Box, Container, TextField, Checkbox, Typography, Button, Input, Grid } from '@mui/material';
import { MARGIN_VERTICAL, VRImage, VRText } from '../components'

export function Title({DATE}:{DATE:any}) {
  return (
    <>
      <Container style={{
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: "#00ff0033"
      }}>
        <Container style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <VRText
            size={27}
            weight={'700'}
          >{`${name} 고객님`}</VRText>
          <VRText size={27}
          >
            을 위한 퍼스널 비전 리포트
        </VRText>
        </Container>
        <Container style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor:"#0000ff33"
        }}>
          <VRText size={13}
            weight={'700'}
          >시력 검사일  </VRText>
          <VRText size={13}>{DATE}</VRText>
        </Container>
      </Container>
      <Container
        style={{
          backgroundColor: '#113287',
          height: 1.25,
          // marginVertical: MARGIN_VERTICAL
        }}
      />
      <VRImage name={'refractiveErrorScript'} style={{
        width: 723,
        height: 58
      }} />
      <VRImage name={'refractivePowerScript'} style={{
        width: 723,
        height: 28,
        marginTop: MARGIN_VERTICAL
      }} />
    </>
  )
}
