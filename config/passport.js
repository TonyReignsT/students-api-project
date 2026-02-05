const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {MongoClient} = require("mongodb");

const uri = process.env.MONGODB_URI;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("schoolDB");

      const users = db.collection("users");

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

passport.deserializeUser(async (id, done) => {
  done(null, id);
});
