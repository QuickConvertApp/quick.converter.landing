import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { cors, runMiddleware } from '../../middleware';
import { getAccessToken } from '@/shared/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fileId } = req.query;
  // Get the fileName from query params
  const forViewing = req.query.t !== undefined || req.query.view === '1';

  try {
    // Get the API URL from environment variable or use default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    console.log(req.headers)
    // Make request to the actual API
    const response = await axios({
      method: 'GET',
      url: `${apiUrl}/converter/download/${fileId}`,
      responseType: 'stream',
      headers: {
       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NDVhOGI0ZC0yZWQzLTQ0MzMtOTVhZS0wNjBhYzM3YTdiNTEiLCJkZXZpY2VJZCI6ImUzN2YxYjMxLWJmNjYtNGRkOC1iMjg2LTBhZjcwZjZkMjU4MiIsInRva2VuSWQiOiI1Yzk0MmFhYS00NmZkLTRmNTgtOGE1Ny1hY2Y3MTYwZjgzZmEiLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQxOTgyNDIxLCJleHAiOjE3NDIwNjg4MjF9.ezmCurg2t5I08K5qGIucvcrHUSeOaleP5IyKpwv_sK8`,
      },
    });

    // Forward the content-type, content-disposition and other relevant headers
    const contentType = response.headers['content-type'];
    let contentDisposition = response.headers['content-disposition'];
    const contentLength = response.headers['content-length'];

    // Set appropriate content-type
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // Handle content disposition based on the request purpose
    if (fileName) {
      // For explicit file downloads with provided filename
      contentDisposition = `attachment; filename="${encodeURIComponent(fileName)}"`;
    } else if (forViewing && contentType === 'application/epub+zip') {
      // For viewing EPUB files, don't set as attachment so browser handles it inline
      contentDisposition = 'inline';
    } else if (contentDisposition) {
      // Use the original content-disposition
      res.setHeader('Content-Disposition', contentDisposition);
    }
    
    // Set final content-disposition header if available
    if (contentDisposition) {
      res.setHeader('Content-Disposition', contentDisposition);
    }
    
    // Set content length if available
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    
    // Add cache control headers for proper handling
    // No caching for viewing (each view request should be fresh)
    // Allow caching for downloads
    if (forViewing) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else {
      // Allow caching for regular downloads
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
    
    // Pipe the response stream
    response.data.pipe(res);
  } catch (error) {
    console.error('Download proxy error:', error);
    
    // Handle different error types appropriately
    // if (axios.isAxiosError(error) && error.response) {
    //   return res.status(error.response.status).json({
    //     message: 'Error downloading file',
    //     details: error.response.data
    //   });
    // }
    
    return res.status(500).json({
      message: 'Error downloading file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 