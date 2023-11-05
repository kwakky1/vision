import {VRImage} from './VRImage';

export function VRIndicator({ 
    type,
    position,
    top = 0,
    style 
}: { 
    type: string, 
    position: number,
    top?: number
    style?: any 
}) {
    const fileName = type === 'RIGHT'?'RU':'LD'
    return <VRImage name={`indicator/${fileName}`} style={{
        position: 'absolute',
        marginLeft: position - 10,
        marginTop: top,
        width: 20,
        height: 21
      }} />
}