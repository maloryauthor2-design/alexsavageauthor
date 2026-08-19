"use strict";
var Hotel = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // play-entry.ts
  var play_entry_exports = {};
  __export(play_entry_exports, {
    TIME_LABEL: () => TIME_LABEL,
    applyChoice: () => applyChoice,
    getScene: () => getScene,
    initialState: () => initialState,
    resetRun: () => resetRun,
    resolveChoices: () => resolveChoices,
    resolveText: () => resolveText,
    wakeFromDeath: () => wakeFromDeath
  });

  // src/lib/game/story.ts
  var scenes = {};
  function add(scene) {
    scenes[scene.id] = scene;
  }
  function getScene(id) {
    return scenes[id] ?? scenes.d1;
  }
  var go = (id, label, extra = {}) => ({
    id,
    label,
    to: extra.to ?? id,
    ...extra
  });
  add({
    id: "d1",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    time: "dawn",
    text: (s) => {
      if (s.loop === 1 && s.deaths === 0) {
        return `I woke up in a bed that I was pretty sure wasn't mine, with a work order crumpled in my fist that I was also sure I'd never seen.

The paper felt too real. The room was a pastel nightmare with a damp bloom in the corner \u2014 rising, not leaking. Last night I'd been at Taverners. Then the Bushmills. Then nothing.

Someone is hammering on the door like she owns my name.`;
      }
      if (s.loop === 2) {
        return `Same bed. Same stain. Same knock coming in three\u2026 two\u2026

The work order has grown. I died in this hotel. I remember the bell, the black, the way the floor took me.

She is going to say Jack. She is going to say late. She is not going to remember a damn thing.`;
      }
      const last = s.lastDeath ? ` Last time: ${s.lastDeath}` : "";
      return `Loop ${s.loop}. The Brassbank does not care how many times I have done this.${last}

Same knock. Same damp. The list in my hand is getting longer and nobody else can read it.`;
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedRoom) {
        c.push(go("d1_room", "Look around the room", { hint: "Look" }));
      }
      if (!s.flags.lookedOrder) {
        c.push(go("d1_order", "Read the work order properly", { hint: "Look" }));
      }
      if (!s.flags.lookedSelf) {
        c.push(go("d1_self", "Look down at yourself", { hint: "Look" }));
      }
      c.push(go("d1_up", "Get up", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d1_room",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `A single window, netted. A wardrobe that smells of someone else's cedar. No lock on the door, no chain, no courtesy latch.

The stain has no run and no tail. Buildings complain where they're thinnest. If four people are holding four corners of a place and you still get a bloom like this, it isn't the legs. It's that there's more coming down on them than four legs' worth.`,
    choices: [
      go("d1", "Back to the knock", { set: { lookedRoom: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_order",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.workOrder.length === 1 ? `Three lines. Hotel stationery. Handwriting that looks suspiciously like mine, which is a sentence I do not enjoy thinking about before coffee.

Fix what breaks. Don't ask questions. Then do it all again.

If this is a callout, it's the worst brief I've ever been given. If it's a philosophy, it's the last six months of my life printed on nice paper.` : `The list has been growing. Every line after the first three is a thing I learned by having something appalling happen to me.

${s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n")}`,
    choices: [
      go("d1", "The knocking won't wait", { set: { lookedOrder: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_self",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `Yesterday's shirt. No injuries. No hangover, which is the first miracle of the morning and possibly the rudest.

I reach for my name and find it \u2014 Jack Causey, plumber, last seen ruining a perfectly good Tuesday. The rest of last night is a hole with a brass plaque over it.`,
    choices: [
      go("d1", "On your feet in a minute", { set: { lookedSelf: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_up",
    location: "Diamond 1 \u2014 Outcome",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `Boots. Floor. The damp watching me like it has opinions.

I am on my feet. The door is right there. Whoever she is, she already knows my name.`,
    choices: [go("d2", "The door", { time: "dawn" })]
  });
  add({
    id: "d2",
    location: "Diamond 2 \u2014 The Door",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.loop >= 2 ? `"Jack! You're late again!"

Word for bloody word. I mouth late along with her, half a beat behind, like karaoke to a song I hate.

Two inches of painted pine. I already know what her wrist will feel like.` : `She's still going. Bright, bubbly, and way too cheerful for whatever ungodly hour this is.

"Jack! You're late again! Brig's going mental!"

I have never heard this voice before in my life. The handle rattles.`,
    choices: [
      go("d2_open", "Open the door", { hint: "Meet her" }),
      go("d2_listen", "Keep the door shut. Listen first.", { hint: "Wait" }),
      go("d2_window", "Out the window. Avoid her entirely.", { hint: "Dodge" })
    ]
  });
  add({
    id: "d2_open",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/corridor.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Ooh, bed hair! Very rugged. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important."

Blue-green hair. Every piercing in the world. A name tag \u2014 TRUDIE CRISP \u2014 doing heroic work at altitude. She grabs my wrist with a slightly tacky hand and hauls me into the hall before I can find a sentence.

There is something wrong with the light. Translucent ripples run through her as if she isn't entirely solid.`,
    choices: [go("d2_out", "Let her have you")]
  });
  add({
    id: "d2_listen",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `I put my ear to the paint.

She's talking to someone who isn't there. Spore counts. The Stayover in the basement. Register names flickering. A thing called the Rulekeeper who showed up on night shift and was, quote, rude.

Then, brightly, to the door: "I can hear you breathing, slowpoke."

The handle turns anyway. I have shown her I hesitate. She has shown me she does not.`,
    choices: [
      go("d2_out", "She is coming in regardless", {
        set: { heardBridie: true },
        journal: 1,
        addRule: "Trudie talks to the hotel like it answers."
      })
    ]
  });
  add({
    id: "d2_window",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/fountain.jpg",
    speaker: "jack",
    text: `The sash sticks, then gives. I drop into a courtyard that smells of wet stone and something sweeter, like fruit left too long.

My boots hit a puddle that was not rain. The fountain in the middle is dry as a lie. Above me, Trudie Crisp leans out of 204 and shouts that I am a complete menace and also late.

I am going to have to walk in the front door like a guest. Wet.`,
    choices: [
      go("d2_out", "Round to the lobby", {
        set: { arrivedWet: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d2_out",
    location: "Diamond 2 \u2014 Outcome",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: (s) => s.flags.arrivedWet ? `The Brassbank's lobby takes me in through the front like a bad decision. Brass. Carpet. A smell of lemon soap and something under it that is not lemon.

Trudie is already on her knees in the middle of the floor. The carpet is fizzing.` : `The lobby of the Brassbank \u2014 Hotel Sans Nuit, if you believe the brass over the desk \u2014 is having a morning.

The carpet is fizzing. Not metaphorically. Small bright bubbles along the east seam, like the floor is trying to boil a kettle it hasn't got.`,
    choices: [go("d3", "The spill", { time: "morning" })]
  });
  add({
    id: "d3",
    location: "Diamond 3 \u2014 The Lobby Spill",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    time: "morning",
    text: (s) => {
      if (s.flags.mutSpillHelped && s.loop >= 2) {
        return `"You're early!" She looks up, delighted and faintly see-through. "I think it likes you today. It's barely even fizzing."

The east seam is quieter than it was yesterday. The hotel remembers a kindness I have not done yet this morning.

She holds out a rag. "You going to help, or are you going to stand there being rugged?"`;
      }
      if (s.flags.mutSpillIgnored && s.loop >= 2) {
        return `She is already running. The carpet has a mouth today. The fizz has become a hiss.

"Don't just stand there, Jack! I told you \u2014 I told you yesterday \u2014 wait, did I?"

She did not. I did not help. The floor has opinions about that.`;
      }
      return `"Look!" She pats the floor like a well-behaved dog that is not, in fact, behaving. "If we don't get the seal down before ten, the boards go. They always go."

A rag hits my chest. Tacky fingers. A smile that would get a man in trouble in a quieter building.

"What do you do, then? Don't say nothing. Nothing is how we got the last innkeeper."`;
    },
    choices: [
      go("d3_mop", "Get on your knees and help her mop", { hint: "Help" }),
      go("d3_watch", "Stand back. Let her finish. Watch.", { hint: "Hold" }),
      go("d3_chaos", "Grab her wrist and pull her off the carpet", { hint: "Take over" })
    ]
  });
  add({
    id: "d3_mop",
    location: "Diamond 3 \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `A compliment about her work lands harder than one about her ass. She goes a shameless rose color and the edges of her go vague, as if her outline is the first thing she stops bothering with when she's pleased.

"See? You do know how to be useful. Brig said you were a plumber. I said you were a menace. We can both be right."

The fizz dies under the rag. The east seam lies down like a dog that's been told.

I have a cheat sheet starting for a woman who meets me fresh every morning.`,
    choices: [
      go("d3_out", "The desk is next", {
        set: { flagOrder: true, mutSpillHelped: true },
        trust: 1,
        addRule: "The lobby is Trudie's. Help her finish the seal."
      })
    ]
  });
  add({
    id: "d3_watch",
    location: "Diamond 3 \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Suit yourself." She does not look up. The rag goes in tight circles. She is very good at this and very used to doing it alone.

The seal goes down. The fizz sulks. She sits back on her heels and blows a strand of blue-green off her mouth.

"Desk needs you. I don't. Not this morning, anyway."`,
    choices: [go("d3_out", "Leave her the floor")]
  });
  add({
    id: "d3_chaos",
    location: "Diamond 3 \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I pull. She is heavier than a woman her size has any right to be, and then she is lighter, like water changing its mind.

"Hey\u2014!"

The rag slaps the tiles. The fizz finds the gap and climbs. A sound like a kettle screaming into a sock. Trudie laughs, which is not the reaction I wanted, and sprints for the stairs.

"Now you've done it, slowpoke. Two o'clock is going to be so rude."`,
    choices: [
      go("d3_out", "You have made a schedule problem", {
        set: { flagChaos: true, mutSpillIgnored: true },
        addRule: "If you pull her off the seal, two o'clock comes hunting."
      })
    ]
  });
  add({
    id: "d3_out",
    location: "Diamond 3 \u2014 Outcome",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `The lobby has decided what kind of morning it is. The desk is waiting like a mouth.

Someone has to stand behind it. The brass plate says the post is vacant.`,
    choices: [go("d4", "The front desk")]
  });
  add({
    id: "d4",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: (s) => {
      const bits = [
        "Mahogany. A bell that has been polished by better hands than mine. A ledger with names that flicker if you look too long."
      ];
      if (s.flags.heardBridie) {
        bits.push("Trudie said the register names flicker. She was not being cute.");
      }
      if (s.loop >= 2) {
        bits.push("I have stood here before. The vacancy has not filled itself.");
      }
      bits.push("The floor under the east seam gives a small, rotten cough.");
      return bits.join(" ");
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedLedger) c.push(go("d4_ledger", "Open the ledger", { hint: "Look" }));
      if (!s.flags.lookedPlate) c.push(go("d4_plate", "Read the brass plate", { hint: "Look" }));
      if (!s.flags.lookedBell) c.push(go("d4_bell", "Tap the bell", { hint: "Look" }));
      c.push(go("d4_exit", "The boards are going. Deal with that.", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d4_ledger",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `Yesterday's arrivals are written in a hand that keeps changing its mind. CAUSEY, JACK. Room 204. Checked in at a time that is not a time.

Under it, fainter: CAUSEY, JACK. And again. And again.

I close it before the page can add another one while I'm watching.`,
    choices: [
      go("d4", "Shut it", {
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      })
    ]
  });
  add({
    id: "d4_plate",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `INNKEEPER \u2014 vacant.

The word vacant has been polished more than the rest of the plate, as if a lot of people have stood here and rubbed it with their thumb, thinking.

There is a line underneath for a signature. The pen is still wet.`,
    choices: [
      go("d4", "Don't sign. Not yet.", {
        set: { lookedPlate: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d4_bell",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `One tap.

The sound goes further than the room. Somewhere above, a rope thinks about moving. Somewhere below, something answers that it heard.

Trudie, from the floor, without looking up: "Don't do that twice. House rule."`,
    choices: [
      go("d4", "Noted", {
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      })
    ]
  });
  add({
    id: "d4_exit",
    location: "Diamond 4 \u2014 Outcome",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `Ten o'clock has a smell. Wet wood. Sweet rot. The east boards are done pretending.

Whatever I do next, the floor is going to have a say.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk who wasn't there", {
        when: (st) => st.loop >= 2,
        time: "morning"
      }),
      go("d5", "The rotting boards", {
        when: (st) => st.loop < 2
      })
    ]
  });
  add({
    id: "d10b",
    location: "Diamond 10B \u2014 Leland at the Desk",
    art: "/art/lobby.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: (s) => s.flags.lelandMet ? `"You're late," Leland Crum says, which is rich from a man who arrives when the building tells him to. "Don't look at me like that. I remember. That's the whole problem."` : `A man in a postman's coat is standing where I was standing. Satchel. Rain that isn't falling on him. Eyes like he's been delivering to the same wrong address for a long time.

"Causey." Not a question. "You blinked. Don't waste the second morning asking if you're mad. You're not. The hotel is."`,
    choices: [
      go("d10b_truth", "Tell him you remember dying", { hint: "Truth" }),
      go("d10b_joke", "Play it light. Ask if he's the manager.", { hint: "Dodge" }),
      go("d10b_ask", "Ask him what the job actually is", { hint: "Work" })
    ]
  });
  add({
    id: "d10b_truth",
    location: "Diamond 10B \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Good. Write it down. The paper keeps what your head drops."

He taps the work order in my fist without asking how I got it.

"I'm the mail. I go in and out. That's why I keep the days. You stay. That's why you don't, unless you make yourself someone the building can't mislay."`,
    choices: [
      go("d10b_out", "Take that as kindness", {
        set: { lelandMet: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d10b_joke",
    location: "Diamond 10B \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Manager." He tastes the word and puts it back. "If there was one, you wouldn't be holding that paper.

I'm Leland Crum. I bring what gets through. I do not explain the house to men who think they're funny at eight in the morning."

He still leaves a look on me that says: I know you. Don't make me say it twice.`,
    choices: [
      go("d10b_out", "Fair", { set: { lelandMet: true } })
    ]
  });
  add({
    id: "d10b_ask",
    location: "Diamond 10B \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Fix what breaks. Don't ask questions. Then do it all again." He nods at my hand. "You already have the brief. The rest is hours and corners. Four staff. Four nodes. No innkeeper. That's the hole you're standing in."

A pause. The satchel creaks.

"Help the girl with the floor when she asks. The house likes that. It remembers liking."`,
    choices: [
      go("d10b_out", "Four corners. Vacant middle.", {
        set: { lelandMet: true },
        journal: 1,
        addRule: "Four staff. Four nodes. The innkeeper post is the hole."
      })
    ]
  });
  add({
    id: "d10b_out",
    location: "Diamond 10B \u2014 Outcome",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `He is already going. The satchel hits his hip. The boards under the east seam choose this moment to give up the pretence of being wood.`,
    choices: [go("d5", "Now the floor")]
  });
  add({
    id: "d5",
    location: "Diamond 5 \u2014 The Rotting Boards",
    art: "/art/lobby.jpg",
    speaker: "jack",
    time: "morning",
    text: (s) => {
      if (s.flags.mutSpillHelped) {
        return `Ten o'clock arrives late, like a man who was asked nicely.

The east boards are dark, not open. A soft place. I could leave it. I could put a foot through it. I could fetch someone who knows what this house uses for bones.`;
      }
      return `The board goes with a sound like a wet book shutting.

A hole the width of a dinner plate. Under it: not a cellar. A suggestion of one. Cold air with a sweet edge. Something down there is breathing on a schedule.

Trudie, from the far side of the desk, very brightly: "Don't go down. That's not on today."`;
    },
    choices: [
      go("d5_patch", "Patch it. That's the job.", { hint: "Fix" }),
      go("d5_look", "Lie down and look through. Just look.", { hint: "Risk it" }),
      go("d5_leave", "Leave it. She said don't go down.", { hint: "Listen" })
    ]
  });
  add({
    id: "d5_patch",
    location: "Diamond 5 \u2014 Consequence",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `Offcut from behind the desk. Two nails that were waiting like they'd been set out for me. Muscle memory.

The hole closes. The cold stops coming up. My hands have been in this hotel longer than I have.

Trudie whoops like I've done a trick. Maybe I have.`,
    choices: [
      go("d5_out", "That's the morning, then", {
        journal: 1,
        addRule: "Ten o'clock is the east boards. Patch them. Don't climb in."
      })
    ]
  });
  add({
    id: "d5_look",
    location: "Diamond 5 \u2014 Consequence",
    art: "/art/basement.jpg",
    speaker: "jack",
    text: `I drop to my elbows. The air kisses my face like a dog that hasn't decided if you're family.

Down there: silk. A lot of it. And further, a shape that might have been a boy once, if boys came with too many hours in them.

A click. Then another. Then a third, closer.

I get back before the fourth. My mouth tastes of coins.`,
    choices: [
      go("d5_out", "Never again before you're invited", {
        journal: 1,
        addRule: "The basement is not on the schedule right now."
      })
    ]
  });
  add({
    id: "d5_leave",
    location: "Diamond 5 \u2014 Consequence",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Good boy." She says it like a joke and like it isn't. "Ione will silk it if it gets any ruder. You go find a kettle. Or a life. I'm not fussy."

The hole stays. The cold stays. I have chosen not to be useful, and the building files that away.`,
    choices: [go("d5_out", "The day has more hours than this")]
  });
  add({
    id: "d5_out",
    location: "Diamond 5 \u2014 Outcome",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: (s) => s.loop === 1 ? `The rest of the day happens to other people. Pans. Needles. A noon that wants me outdoors and doesn't get me.

I blink and the brass has gone honey. I blink and the lamps are lit. The Brassbank is hurrying me toward a bell I have not heard yet.` : `I know this skip now. The hotel compresses the hours I haven't earned. Evening comes down like a shutter.

Midnight is the thing that wants me.`,
    choices: [go("d9", "Stay up for the bell", { time: "night" })]
  });
  add({
    id: "d9",
    location: "Diamond 9 \u2014 Midnight",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "night",
    text: `Eleven-thirty. The hotel has gone thin. Every ticking thing in the walls has agreed on a tempo.

I can go to the lobby and meet whatever rings. I can stay in 204 and let it come upstairs. I can look, first, like a man who still thinks looking helps.`,
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedNightWindow) {
        c.push(go("d9_window", "Look out at the courtyard", { hint: "Look" }));
      }
      if (!s.flags.lookedNightOrder) {
        c.push(go("d9_order", "Read the work order one more time", { hint: "Look" }));
      }
      c.push(go("d9_lobby", "Go down to the lobby", { hint: "Advance" }));
      c.push(go("d9_stay", "Bolt 204 and wait", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d9_window",
    location: "Diamond 9 \u2014 Midnight",
    art: "/art/fountain.jpg",
    speaker: "jack",
    text: `The fountain is still dry. The courtyard is full of a dark that has thickness.

For a second there is a boy in it. Then there is not. The lamp over the door burns a hole in the wet air and does not help.`,
    choices: [
      go("d9", "Shut the sash", { set: { lookedNightWindow: true }, journal: 1 })
    ]
  });
  add({
    id: "d9_order",
    location: "Diamond 9 \u2014 Midnight",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => `The paper is warm.

${s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n")}

A new line is waiting underneath, in a gap, like a mouth. It will fill itself in when I earn it.`,
    choices: [
      go("d9", "Put it in your pocket", { set: { lookedNightOrder: true } })
    ]
  });
  add({
    id: "d9_lobby",
    location: "Diamond 9 \u2014 Consequence",
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `The desk is empty. The bell is sweating.

It rings once. The sound is wrong \u2014 too big, too old. It rings a second time, and the House has opinions about that.

The lights go. Not out. Away.

Something with too many hours in it comes up through the east boards as if the patch I put there was a courtesy.`,
    choices: [go("d9_end", "There is no third ring")]
  });
  add({
    id: "d9_stay",
    location: "Diamond 9 \u2014 Consequence",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `I put my back to the door. Very brave. Very stupid.

The stain in the corner opens. Not a hole. A decision. The damp had been patient all day and it is done being patient.

The bell finds me through the floor. Once. Twice.

The room inhales.`,
    choices: [go("d9_end", "Don't breathe out")]
  });
  add({
    id: "d9_end",
    location: "Diamond 9 \u2014 Outcome",
    art: "/art/hotel.jpg",
    speaker: "jack",
    tone: "death",
    text: (s) => `Midnight takes the Brassbank back.

Loop ${s.loop} ends the way the brief said it would. Then do it all again.

The work order will still be in my fist. Trudie will not remember my mouth on her name. Leland might.

Wake up. Read the new line.`,
    death: {
      cause: "Midnight took the hotel back.",
      rule: "Be in a bed that belongs to you before the second bell."
    },
    choices: []
  });

  // src/lib/game/types.ts
  var DEFAULT_FLAGS = {
    lookedRoom: false,
    lookedOrder: false,
    lookedSelf: false,
    heardBridie: false,
    arrivedWet: false,
    flagOrder: false,
    flagChaos: false,
    lookedLedger: false,
    lookedPlate: false,
    lookedBell: false,
    lelandMet: false,
    lookedNightWindow: false,
    lookedNightOrder: false,
    mutSpillHelped: false,
    mutSpillIgnored: false
  };
  var OPENING_ORDER = [
    "Fix what breaks. Don't ask questions. Then do it all again."
  ];
  var LOOP_FLAG_KEYS = [
    "lookedRoom",
    "lookedOrder",
    "lookedSelf",
    "heardBridie",
    "arrivedWet",
    "flagOrder",
    "flagChaos",
    "lookedLedger",
    "lookedPlate",
    "lookedBell",
    "lookedNightWindow",
    "lookedNightOrder"
  ];
  var TIME_LABEL = {
    dawn: "7:00 AM",
    morning: "8:15 AM",
    noon: "Noon",
    afternoon: "Afternoon",
    three: "3:00 PM",
    evening: "Evening",
    night: "11:30 PM"
  };
  function initialState() {
    return {
      sceneId: "d1",
      loop: 1,
      deaths: 0,
      time: "dawn",
      savePoint: "wake",
      workOrder: [...OPENING_ORDER],
      flags: { ...DEFAULT_FLAGS },
      deathLog: [],
      bridieTrust: 0,
      journal: 0
    };
  }

  // src/lib/game/engine.ts
  function resolveText(state) {
    const scene = getScene(state.sceneId);
    return typeof scene.text === "function" ? scene.text(state) : scene.text;
  }
  function resolveChoices(state) {
    const scene = getScene(state.sceneId);
    const raw = typeof scene.choices === "function" ? scene.choices(state) : scene.choices;
    return raw.filter((c) => !c.when || c.when(state));
  }
  function applyChoice(state, choice) {
    const next = {
      ...state,
      flags: { ...state.flags, ...choice.set },
      workOrder: [...state.workOrder],
      deathLog: [...state.deathLog],
      bridieTrust: state.bridieTrust + (choice.trust ?? 0),
      journal: state.journal + (choice.journal ?? 0)
    };
    if (choice.time) next.time = choice.time;
    if (choice.savePoint) next.savePoint = choice.savePoint;
    if (choice.addRule && !next.workOrder.includes(choice.addRule)) {
      next.workOrder.push(choice.addRule);
    }
    const dest = getScene(choice.to);
    if (dest.death) {
      return die(next, dest, choice.to);
    }
    next.sceneId = choice.to;
    if (dest.time) next.time = dest.time;
    return next;
  }
  function die(state, dest, sceneId) {
    const cause = dest.death?.cause ?? "You died.";
    const rule = dest.death?.rule;
    const workOrder = [...state.workOrder];
    if (rule && !workOrder.includes(rule)) workOrder.push(rule);
    const flags = { ...state.flags };
    for (const key of LOOP_FLAG_KEYS) flags[key] = DEFAULT_FLAGS[key];
    return {
      ...state,
      sceneId,
      flags,
      workOrder,
      deaths: state.deaths + 1,
      lastDeath: cause,
      deathLog: [...state.deathLog, { cause, loop: state.loop }]
    };
  }
  function wakeFromDeath(state) {
    return {
      ...state,
      sceneId: "d1",
      loop: state.loop + 1,
      time: "dawn"
    };
  }
  function resetRun() {
    return initialState();
  }
  return __toCommonJS(play_entry_exports);
})();
