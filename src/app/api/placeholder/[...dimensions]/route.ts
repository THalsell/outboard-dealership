import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  try {
    const { dimensions } = await params;
    let width = 400;
    let height = 300;

    if (dimensions.length >= 2) {
      width = parseInt(dimensions[0]) || 400;
      height = parseInt(dimensions[1]) || 300;
    } else if (dimensions.length === 1) {
      const parts = dimensions[0].split('x');
      if (parts.length === 2) {
        width = parseInt(parts[0]) || 400;
        height = parseInt(parts[1]) || 300;
      } else {
        width = height = parseInt(dimensions[0]) || 400;
      }
    }

    // Limit dimensions for security
    width = Math.min(Math.max(width, 50), 2000);
    height = Math.min(Math.max(height, 50), 2000);

    // Create SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f5f5f5"/>
        <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#e5e5e5" stroke-width="2"/>
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#333333">
          ${width} × ${height}
        </text>
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#666666" opacity="0.8">
          Placeholder Image
        </text>
        <!-- Marine/Outboard themed icon -->
        <g transform="translate(${width/2 - 20}, ${height/2 - 30})">
          <path d="M20 35 L30 25 L35 30 L25 40 Z" fill="#0e4c92" opacity="0.3"/>
          <circle cx="20" cy="20" r="8" fill="none" stroke="#00a8a8" stroke-width="2" opacity="0.5"/>
          <path d="M12 20 L28 20 M20 12 L20 28" stroke="#00a8a8" stroke-width="1.5" opacity="0.5"/>
        </g>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    
    // Return a minimal fallback SVG
    const fallbackSvg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f5f5f5"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#333333">Image Placeholder</text>
      </svg>
    `;
    
    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
}