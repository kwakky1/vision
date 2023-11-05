import { Box, Container, Stack, Typography, Button } from '@mui/material';

export function VRText({ 
    size = 16,
    color = '#113287',
    weight = '400',
    children, 
    style
}: { 
    size?: number, 
    color?: string;
    weight?: string;
    children: string, 
    style?: any 
}) {
    return <Typography
        style={{
            fontSize:size,
            fontWeight:weight,
            color,
            textAlign:'center',
            verticalAlign:'center',
            numberOfLines:-1,
            ...style
        }}
        // numberOfLines={-1}
    >
        {children}
    </Typography>
}