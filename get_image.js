import fetch from 'node-fetch';
import imageSize from 'image-size';

async function fetchImage(url) {
    try {
        // Fetch the image as a buffer
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Get the image dimensions
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const dimensions = imageSize(uint8Array);
        return dimensions;
    } catch (error) {
        console.error('Error fetching or processing the image:', error);
        throw error;
    }
}

(async () => {
    try {
        const url = 'https://covers.openlibrary.org/b/id/606512-L.jpg'; // Replace with your image URL
        const { width, height } = await fetchImage(url);
        console.log(`Width: ${width}, Height: ${height}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
