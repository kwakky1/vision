import Image from 'next/image';

export function VRImage({ 
    name, 
    style 
}: { 
    name: string, 
    style?: any 
}) {
    return <img
        style={{
        width: "100%",
        objectFit: "cover",
        ...style
        }}
        src={`/images/${name}.svg`}
    alt={name}
  />

    return <Image
        alt={name}
        src={`/images/${name}.svg`}
        {...style}
        style={style || {}}
    />
}