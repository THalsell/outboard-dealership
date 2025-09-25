import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            background: '#0e4c92',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '54px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Righteous',
            letterSpacing: '-2px',
          }}
        >
          OMS
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}