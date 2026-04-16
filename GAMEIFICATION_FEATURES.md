# PetRating - Gamification & Addiction Features

## Overview
This document outlines features to make PetRating more fun, engaging, and addictive through gamification mechanics, social features, and progression systems.

---

## Gamification Features

### Daily Pet Challenge
- **One free pet rating per day** with bonus rewards
- **Streak counter** for consecutive days of rating
- **"Judge of the Day" badge** for maintaining streaks
- **Streak multipliers** - 2x XP on 7-day streak, 3x on 30-day streak

### Achievement System
- **"Certified Judge"** badge after 10 ratings
- **"Chaos Hunter"** for rating pets with 90%+ chaos energy
- **"Betrayal Detective"** for finding high betrayal capacity pets
- **"Nap Expert"** for rating high nap proficiency pets
- **"Speed Demon"** for rating pets quickly
- **"Social Butterfly"** for sharing verdicts
- **"Collector"** for saving pets to portfolio
- **"Veteran Judge"** for 100+ ratings

### Leaderboard Improvements
- **Global rankings** by total pets rated
- **Weekly "Top Judge"** competitions with prizes
- **Friend leaderboards** for social competition
- **Regional/country rankings**
- **Category-specific leaderboards** (most chaos, most betrayal, etc.)
- **Time-based leaderboards** (daily, weekly, monthly)

---

## Social Features

### Pet Battles
- **Users can pit their pets against friends' pets**
- **Community voting** on who wins the battle
- **Battle history** and win rates tracking
- **Tournament brackets** for multiple pets
- **Battle chat/reactions**

### Pet Collection
- **Save rated pets to a "Pet Portfolio"**
- **Collect rare verdicts** as digital cards
- **Share portfolio on social media**
- **Trading card style collection view**
- **Portfolio rarity score** based on verdicts collected

### Comments & Reactions
- **Add comments to pet verdicts**
- **React with emojis** (🔨, 😈, 💀, 😂, 🐶, 😼)
- **Most commented pets** get featured on homepage
- **Trending verdicts** section
- **Reply threads** on comments

---

## Progression System

### Judge Level
- **XP system**: gain XP for each rating
- **Level up unlocks** new verdict categories
- **Judge titles progression**:
  - Level 1-5: Rookie Judge
  - Level 6-10: Associate Judge
  - Level 11-20: Circuit Judge
  - Level 21-30: Superior Court Justice
  - Level 31-50: Supreme Court Justice
  - Level 50+: Legendary Judge
- **Level perks**: More daily ratings, special verdicts, profile cosmetics

### Currency System
- **Earn "Gavel Coins"** for:
  - Each pet rating (+10 coins)
  - Daily streak bonuses (+50 coins)
  - Achievement unlocks (+100-500 coins)
  - Winning pet battles (+25 coins)
  - Sharing verdicts (+5 coins)
  
- **Spend coins on**:
  - Extra daily ratings (50 coins each)
  - Special verdict themes (200 coins)
  - Profile customization (100-500 coins)
  - Power-ups (better chance of rare verdicts) (150 coins)
  - Skip analysis animation (25 coins)

---

## Time-Limited Events

### Weekly Tournaments
- **Theme-based events**:
  - "Chaos Week" - bonus for high chaos ratings
  - "Nap Week" - focus on sleepy pets
  - "Betrayal Week" - high betrayal pets featured
- **Special verdicts** only available during events
- **Event-exclusive badges**
- **Leaderboard bonuses** for event participants

### Season Pass
- **Free tier**: Basic rewards, standard verdicts
- **Premium tier** (500 coins):
  - Exclusive verdict categories
  - Pet cosmetics
  - Profile themes
  - Bonus XP multiplier
- **Seasonal leaderboards**
- **Seasonal achievements**
- **Limited-time pet categories**

---

## Content Expansion

### More Pet Categories
- **Exotic pets**: lizards, snakes, birds, hamsters
- **Mythical creatures**: dragons, unicorns, phoenixes
- **Fictional pets**: Pokemon, cartoon characters
- **Wild animals**: lions, tigers, bears
- **Aquatic pets**: fish, dolphins, sharks

### Verdict Expansion
- **50+ unique verdicts** instead of current 5
- **Category-specific verdicts** (different for dogs vs cats vs exotics)
- **Ultra-rare "Legendary" verdicts** (1% drop rate)
- **Verdict tiers**: Common, Rare, Epic, Legendary
- **Seasonal verdicts** that rotate

### Analysis Variations
- **Different courtroom themes**:
  - Space Court (sci-fi theme)
  - Underwater Court (ocean theme)
  - Jungle Court (adventure theme)
  - Medieval Court (fantasy theme)
- **Different judge personalities** with unique dialogue
- **Seasonal analysis themes** (Halloween, Christmas, etc.)

---

## Competitive Features

### Prediction Markets
- **Bet coins on what verdict** your pet will get
- **Risk/reward system** - higher risk = higher reward
- **Prediction accuracy tracking**
- **Leaderboard for best predictors**

### Rate the Judge
- **Users can rate other users' ratings** (helpful, funny, accurate)
- **Quality score system** for judges
- **Best rated judges** get featured on homepage
- **Judge reputation system**

---

## Engagement Hooks

### Push Notifications
- **"Your pet's verdict is ready!"**
- **"You've been challenged to a pet battle!"**
- **"Daily challenge available"**
- **"You're #1 on the leaderboard!"**
- **"Streak about to expire - rate now!"**
- **"New legendary verdict unlocked!"**

### Shareable Moments
- **"Your pet just got a legendary verdict!"** card
- **"You're on a 7-day streak!"** celebration
- **"You just unlocked a new badge!"** announcement
- **"You're #1 on the leaderboard!"** brag
- **Auto-generated viral content** for social sharing

### Surprise Mechanics
- **Random "Double XP" events** (lasts 1 hour)
- **Mystery verdict boxes** (random rare verdicts)
- **Random judge appearances** with special bonuses
- **Lucky streak multipliers**
- **Daily spin wheel** for bonus coins

---

## Technical Implementation Notes

### Database Schema Needed
- User profiles (XP, level, coins, badges)
- Pet portfolios (saved pets, verdicts)
- Battle history
- Achievement progress
- Leaderboard rankings
- Event participation tracking

### Backend Requirements
- Real-time leaderboards
- Push notification system
- WebSocket for live battles
- Scheduled job system for daily challenges
- Event management system

### Frontend Considerations
- Achievement popup system
- Level up animations
- Coin balance display
- Progress bars for XP and achievements
- Notification center
- Profile customization UI

---

## Priority Implementation Order

### Phase 1 (Foundation)
1. User profiles with XP and levels
2. Daily challenge system
3. Basic achievement system
4. Coin currency

### Phase 2 (Social)
5. Pet portfolio/collection
6. Leaderboards
7. Comments and reactions
8. Share functionality improvements

### Phase 3 (Advanced)
9. Pet battles
10. Time-limited events
11. Season pass
12. Push notifications

### Phase 4 (Expansion)
13. More pet categories
14. Verdict expansion
15. Courtroom themes
16. Prediction markets

---

## Success Metrics to Track

- Daily active users (DAU)
- Average session duration
- Pets rated per user per day
- Streak retention rate
- Social shares per rating
- Achievement unlock rate
- Coin spend rate
- Battle participation rate
- Leaderboard engagement
- Return user rate

---

## Notes

- All features should maintain the courtroom theme and humor
- Keep the "judgment" language and tone consistent
- Ensure features don't break the simple, fun core experience
- Balance monetization (coins) with free-to-play accessibility
- Consider mobile app version for better engagement
