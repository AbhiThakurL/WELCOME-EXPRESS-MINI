import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (css, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  const branding = [
    { title: 'Branding', content: 'Develop a strong, recognizable fashion brand identity. s strong reco', bgColor: '#f8f9fa', link: '/Branding' },
    { title: 'Identity ', content: 'We create a unique and consistent image for your fashion brand. for card 2', bgColor: '#e0f7fa', link: '/Identity' },
    { title: 'Marketing ', content: 'Content Reach and engage your target audience effectively on all plattforms.',  bgColor: '#fff3e0', link: '/Marketing ' },
    { title: 'E-Commerce', content: 'Optimize online sales and drive growth for your e-commere store. for card 4', bgColor: '#ffe0e0', link: '/E-Commerce' },
  ];

  res.render('index', { branding });
});

// server.js (Express)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
