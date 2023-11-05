'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { Container, Box, Button, Grid } from '@mui/material';
import ReactToPrint from 'react-to-print';

import { Page1, Page2 } from './subpages'
import { PAGE_WIDTH, PAGE_HEIGHT, GetUserData } from '../../components/components';

export default function PrintPage() {
    const searchParams = useSearchParams()
    const inputString: any = searchParams.get("input") || ''
    const input: InputData = JSON.parse(inputString)
    const userData = GetUserData(input)

    const pageArray = [Page1, Page2]
    const totalPageNum = pageArray.length

    const printRef = React.useRef(null);

    const printButton = () => {
        return <Button style={{
            width: '80%',
            marginTop: 16,
            fontSize: 24,
            height: 64,
            borderRadius: 100,
            backgroundColor: "#020F50"

        }}
            type="submit"
            variant="contained"
        >
            비전리포트 출력
        </Button>
    };

    return (
        <Container
            style={{
                width: '21cm',
                minHeight: '29.7cm',
                padding: 0,
                // background: "#0000ff33",
            }}
        >
            <Grid item style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom:24,
            }}>
                <Box style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ReactToPrint content={() => printRef.current} documentTitle="Frame Report" trigger={printButton} />
                </Box>
            </Grid>
            <Box ref={printRef}>
                <Page1 userData={userData} />
                <Page2 userData={userData} />
            </Box>
        </Container>
    );
}
