// Constants
const bibleVersion = 111; // NIV version
const apiBaseUrl = 'https://nodejs.bible.com/api';

// Function to fetch Verse of the Day
async function fetchVerseOfTheDay() {
  try {
    // Calculate the day of the year
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24) - 1;

    // Fetch all VOTDs
    const votdResponse = await fetch(`${apiBaseUrl}/moments/votd/3.1`);
    const votds = await votdResponse.json();
    const usfm = votds['votd'][dayOfYear]['usfm'];

    // Fetch today's verse
    const verseResponse = await fetch(`${apiBaseUrl}/bible/verse/3.1?id=${bibleVersion}&reference=${usfm[0]}`);
    const verseData = await verseResponse.json();

    // Fetch background image (if available)
    const imageUrl = votds['votd'][dayOfYear]?.image?.url || ''; // Adjust based on actual API response

    // Display verse content and reference
    document.getElementById('verse').textContent = verseData['content'];
    document.getElementById('reference').textContent = verseData['reference']['human'];

    // Update background image
    if (imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
    } else {
      document.body.style.backgroundImage = 'none';
    }
  } catch (error) {
    // Handle errors
    document.getElementById('error').textContent = 'Failed to fetch Verse of the Day. Please try again later.';
    console.error('Error fetching VOTD:', error);
  }
}

// Run the function on page load
fetchVerseOfTheDay();
