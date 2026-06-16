import { POST } from './route';
import { NextRequest } from 'next/server';

// Note: Test suite for API route input validation
describe('Insights API Route Validation', () => {
  it('returns 400 for completely invalid or missing payload', async () => {
    const req = new NextRequest('http://localhost/api/insights', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    
    const data = await res.json();
    expect(data.error).toBe('Invalid footprint payload provided.');
  });

  it('returns recommendations successfully when valid structural footprint provided', async () => {
     const req = new NextRequest('http://localhost/api/insights', {
      method: 'POST',
      body: JSON.stringify({
        breakdown: { transportation: 1000, energy: 2000, diet: 1000, total: 4000 }
      }),
    });
    
    const res = await POST(req);
    // Even if Gemini is unconfigured we fallback on 200 with default tips gracefully
    expect(res.status).toBe(200); 
    const data = await res.json();
    expect(Array.isArray(data.tips)).toBe(true);
    expect(data.tips.length).toBeGreaterThan(0);
  });
});
