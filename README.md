# Drop-In Games

As a sort of "stretch-goal" after the primary responsibilities, I was assigned to make a series of smaller "casino-like" games that would interface with the larger app ecosystem where the user could gamble their profile's points.

Sadly, the plan was cancelled as I was partway through the third game.
I really enjoyed planning and working on this one :)

### Notable Features

**Shared components and contexts**
This is the big one. Each game can be built from the shared code handling the layout, login, and database querying then deployed independently of the others. I really tried to be as efficient as possible in all ways development.
_See the shared folder!_

**(Framer) Motion**
Animation can be tricky. While I've tinkered with animation (and Motion a little), I really tried to methodically approach animation as an integral part of this assignment.
_Both the wheel and slots are animated with Motion - slots is my favorite result :)_

**Security**
It would come as no surprise that the game logic's result would need to be calculated on the backend and delivered to the front to prevent frontend tampering. More interestingly, I decided it would be wise to build each game on some hardcoded data that would then dictate both the game logic, the graphics on the front, **and** the animation. My goal was to put full control within one file on the backend.
Is a game paying out too much? Too little? Maybe it needs more variance? Just change the source-data for that game!
_Check the individual game folders in the backend/src!_

## Games

1. Roulette / Spin-the-Wheel
2. Slot Machine
3. "Ghost Leg" / "Ladder Game" / 사다리타기 **{WIP}**

_I was in the process of figuring out how best to handle animation for the last one when the 'plug was pulled' on this project. I was considering flipping the whole thing upside down and having a monkey climb up trees :)_
