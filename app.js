const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Route to render the form
app.get('/', (req, res) => {
  res.render('forms');
});
const submissions = []
// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;
  
    // Simple server-side validation
    if (!name || !email || !phone || !message) {
      return res.status(400).send("All fields are required.");
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).send("Phone number must be exactly 10 digits.");
    }
  
    // Store validated data
    submissions.push({ name, email, phone, message });
  
    res.render('success', { name, email, phone, message });
  });
  app.get('/submissions', (req, res) => {
    res.json(submissions);
  });
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
