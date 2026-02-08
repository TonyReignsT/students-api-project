const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {MongoClient} = require("mongodb");
const db = require("../models/db");

const uri = process.env.MONGODB_URI;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "/auth/google/callback",
      // callbackURL: "http://localhost:8000/auth/google/callback",
      callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const client = new MongoClient(uri);
      await client.connect();
      // const db = client.db("schoolDB");
      // const users = db.collection("users");
      const database = await db.connectDB();
      const users = database.collection("users");

      // Check if user exists
      let user = await users.findOne({ googleId: profile.id });

      if (!user) {
        user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          createdAt: new Date(),
        };
        await users.insertOne(user);
      }

      done(null, user);
    }
  )
);

// Required by passport
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

// passport.deserializeUser(async (id, done) => {
//   done(null, id);
// });

passport.deserializeUser(async (googleId, done) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("schoolDB");

    const user = await db.collection("users").findOne({ googleId });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
