// Import required modules
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module


// Initialize Express app
const app = express();
app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 20 * 60 * 1000, // Set the session duration to 20 minutes (in milliseconds)
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const hbs = exphbs.create({
  extname: 'handlebars',
  defaultLayout: 'main', // Assuming you have a main layout file
  layoutsDir: __dirname + '/src/views/layouts/', // Adjust the path accordingly
  partialsDir: __dirname + '/src/views/partials/', // Add this line for partials
  helpers: {
    switch: function(value, options) {
      this._switch_value_ = value;
      const html = options.fn(this);
      delete this._switch_value_;
      return html;
    },
    case: function(value, options) {
      if (value == this._switch_value_) {
        return options.fn(this);
      }
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views','./src/views');

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ASSOS_TEMP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/authRoutes');
const userRouter = require('./src/routes/userRoutes');
const projectRouter = require('./src/routes/projectRoutes');
const membershipRouter = require('./src/routes/membershipRoutes');
const aboutRouter = require('./src/routes/aboutRoutes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRouter);
//app.use('/user', userRouter); 
app.use('/project', projectRouter);
app.use('/membership', membershipRouter);
app.use('/about', aboutRouter);


// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running properly on port ${PORT}`);
});
