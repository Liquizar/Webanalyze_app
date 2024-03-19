// analyze.js
const axios = require('axios');
const cheerio = require('cheerio');

async function analyzeWebsite(websiteUrl) {
    try {
        // Fetch HTML content of the website
        const response = await axios.get(websiteUrl);
        const htmlContent = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(htmlContent);

        // Extract website title
        const title = $('title').text();

        // Extract meta tags
        const metaTags = [];
        $('meta').each((index, element) => {
            metaTags.push({
                name: $(element).attr('name') || $(element).attr('property'),
                content: $(element).attr('content')
            });
        });

        // Extract headings
        const headings = {
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: []
        };
        $('h1, h2, h3, h4, h5, h6').each((index, element) => {
            headings[$(element).prop('tagName').toLowerCase()].push($(element).text());
        });

        // Extract links
        const links = [];
        $('a').each((index, element) => {
            links.push($(element).attr('href'));
        });

        // Construct analysis result object
        const analysisResult = {
            url: websiteUrl,
            title,
            metaTags,
            headings,
            links
        };

        return analysisResult;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred during website analysis.');
    }
}

module.exports = { analyzeWebsite };
