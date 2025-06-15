export async function GET() {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/1JxHf-FPqJqzdPyf3QHvSwysgLkiJdgEZcQcJH5w-wUU/export?format=csv'
    );
    const csvText = await response.text();
    
    // Parse CSV
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const musicList = rows.slice(1).map(row => ({
      id: row[0],
      name: row[1],
      place: row[2],
      longitude: row[3],
      latitude: row[4],
      videoId: row[5],
    }));

    return Response.json({ musicList });
  } catch (error) {
    console.error('Error fetching music data:', error);
    return Response.json({ error: 'Failed to fetch music data' }, { status: 500 });
  }
} 