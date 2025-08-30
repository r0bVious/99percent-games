# 🎰 Drop-In Games

As a sort of “stretch goal” after my primary responsibilities, I was assigned to create a series of smaller **casino-style games** that would integrate with the larger app ecosystem, letting users **gamble their profile points**.

Sadly, the plan was **cancelled** while I was midway through developing the third game.  
That said, I **really enjoyed** planning and working on this project. 🙂

---

### ✨ Notable Features

#### 🧩 **Shared Components & Contexts**
This is the **big one**. Each game is built on top of a **shared codebase** that handles:
- Layout
- Authentication
- Database querying  

Because of this, **each game can be deployed independently** while reusing as much code as possible. I focused heavily on **efficiency and scalability** here.  
> _Check out the `shared/` folder!_

---

#### 🎞 **Framer Motion Integration**
Animation can be **tricky**... but for this project, I leaned into it.  
I used **Framer Motion** to create smooth, engaging animations across the games, treating motion as an **integral part of the design** rather than an afterthought.  

- The **roulette wheel** spins dynamically 🎡  
- The **slot machine** has my **favorite animation result** 🎰  
> _Check out both in action. I really like the slots!_

---

#### 🔐 **Backend-Driven Security & Game Logic**
Since these games involve **point wagering**, all critical game logic and results are **calculated on the backend** to prevent tampering.

More interestingly, I designed each game to be **data-driven**:  
- A **single backend config file** dictates:
  - 🎨 The graphics on the frontend  
  - 🧠 The game logic  
  - 🌀 The animation patterns  

Need to tweak a game’s payout rate, variance, or difficulty?  
**Just edit the data file. No code changes required.**  
> _See the individual game folders in `backend/src/`!_

---

### 🕹 Games

1. 🎡 **Roulette / Spin-the-Wheel**
2. 🎰 **Slot Machine**
3. 🪜 **“Ghost Leg” / “Ladder Game” / 사다리타기** **{WIP}**

I was in the middle of figuring out the **animation system** for the third game when the project was cut short.  
My animation/design idea for the last game was **Flip the whole thing upside down** and have a **monkey climbing trees** instead. 🐒🌴

---
