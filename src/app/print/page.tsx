'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { AppBar, Container, Box, Button, Grid } from '@mui/material';
import ReactToPrint from 'react-to-print';

import { Page1, Page2 } from './subpages'
import { GetUserData } from '../../components/components';
import { getValidObject } from '@/components/utils';

export default function PrintPage() {
    const searchParams = useSearchParams()
    const inputString: any = searchParams.get("input") || ''
    const input: InputData = JSON.parse(inputString)
    const userData = GetUserData(input)

    const pageArray = [Page1]
    if (getValidObject(userData, "ADD", 'value') >= 0.75) {
        pageArray.push(Page2)
    }

    const totalPageNum = pageArray.length

    const printRef = React.useRef(null);

    const printButton = () => {
        return <Button style={{
            width: 720,
            fontSize: 24,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#020F50"
        }}
            type="submit"
            variant="contained"
        >
            비전리포트 출력
        </Button>
    };

    return <>
        <Container
            style={{
                width: '21cm',
                minHeight: '29.7cm',
                padding: 0,
                paddingBottom: 60
                // background: "#0000ff33",
            }}
        >
            <Grid item style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
            }}>
            </Grid>
            <Box ref={printRef}>
                {pageArray.map((PageComponent: any, index: number) => {
                    return <PageComponent key={`Page_${index}`} userData={userData} />
                })}
            </Box>
        </Container>

        <Box
            style={{
                display: 'flex',
                width: '100%',
                bottom: 20,
                position: 'fixed',
                backgroundColor: "transparent",
                justifyContent: 'center',
            }}>
            <ReactToPrint content={() => printRef.current} documentTitle="Frame Report" trigger={printButton} />
        </Box>
    </>
}
