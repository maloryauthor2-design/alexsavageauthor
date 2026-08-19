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
        return `I woke up in a bed that I was pretty sure wasn't mine. And there was a work order crumpled in my hand that I'm also sure I'd never seen before. The paper felt\u2026 too real. Is that actually a thing? It was scrawled on hotel stationery and at the bottom was a note in handwriting that looked suspiciously like it might well be mine.

Fix what breaks. Don't ask questions. Then do it all again.

Fuck knows what that meant. Last thing I had clear was Taverners, then the Bushmills, and now this pastel nightmare that looked like it'd been decorated by someone who'd lost a sizeable bet with a color wheel.

A rapid knocking rattled the door frame.`;
      }
      if (s.loop === 2) {
        return `Same bed. Same knock. Same bloody stationery in my fist.

I'd love to tell you I sat up and had a good long think about dying. But I didn't. You see, here's the thing about dying once before lunch. It's a wonderful teacher, and a shit one, because the lesson is just do it again and try not to be quite so stupid.

She's going to say Jack. She's going to say late. She is not, as far as I can tell, going to remember a damn thing.`;
      }
      const last = s.lastDeath ? ` Last time I ${s.lastDeath.toLowerCase()}` : "";
      return `I did the checks, because apparently that's who I am now. Same stain. Same knock. Work order's grown another line.${last}

I reckon I could write a manual. I also reckon nobody else in this building can read it.`;
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedRoom) {
        c.push(go("d1_room", "Have a proper look at the room", { hint: "Look" }));
      }
      if (!s.flags.lookedOrder) {
        c.push(go("d1_order", "Read the work order properly", { hint: "Look" }));
      }
      if (!s.flags.lookedSelf) {
        c.push(go("d1_self", "Check the state of yourself", { hint: "Look" }));
      }
      c.push(go("d1_up", "Get up and deal with the door", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d1_room",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room-stain.jpg",
    speaker: "jack",
    text: `Yeah, this definitely wasn't my crappy apartment's couch. Single window, netted. Wardrobe that smelled of someone else's cedar. No lock on the door, no chain, no courtesy latch, which is a thing I'd have words about if this were a job I was quoting.

There was damp bloom in the corner where the ceiling met the wall and it was running about a foot across. That hadn't been caused by a leak from above, I didn't think, because the stain had no run to it and no tail. It was rising, then. Something behind the plaster was being all patient about it. Someone needed to fix the source or they'd be painting over that shot every spring until they died.`,
    choices: [
      go("d1", "The knocking hasn't stopped", { set: { lookedRoom: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_order",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.workOrder.length === 1 ? `Three lines. Hotel stationery. Handwriting that looked suspiciously like mine, which is a sentence I do not enjoy thinking about before coffee.

Fix what breaks. Don't ask questions. Then do it all again.

Fuck knows what that meant. Had I gone and got all gnostic at some point during last night's bender? If this is a callout, it's the worst brief I've ever been given. If it's a philosophy, it's the last six months of my life printed on nice paper.` : `The list has been growing. Every line after the first three is a thing I learned by having something appalling happen to me, which is a method of professional development I cannot recommend.

${s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n")}

I'd like, just once, a hint in advance of my horrible murder.`,
    choices: [
      go("d1", "She's not going to knock forever", { set: { lookedOrder: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_self",
    location: "Diamond 1 \u2014 The Waking",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `I sat up, moaned, and rubbed my face. Jesus Frederico Christ. Dark hair sticking up in every possible direction and I seemed to have acquired a week's worth of stubble overnight. Eyes bloodshot enough to look like I hadn't slept in a month, and I didn't even want to consider what was spilt down the front of my favorite T-shirt.

I looked beyond rough. The woman knocking didn't seem to be overly bothered about any of that, which was either kindness or she had bigger problems, and I could be wrong but I think this hotel does bigger problems as a house special.`,
    choices: [
      go("d1", "Right. Door.", { set: { lookedSelf: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_up",
    location: "Diamond 1 \u2014 Outcome",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I stood up. The anxious voice in my head that sounded remarkably like my mother started arguing with the disappointed career-counselor voice, and after a while both of them arrived at the conclusion that whatever this was, it was somehow my fault. That's their answer to everything, up to and including the weather, so I told the pair of them to fuck off.

Boots if I could find them. Door if I couldn't. She already knew my name, which was a bit rich given I'd never heard hers.`,
    choices: [go("d2", "The door", { time: "dawn" })]
  });
  add({
    id: "d2",
    location: "Diamond 2 \u2014 The Door",
    art: "/art/trudie-hall.jpg",
    speaker: "jack",
    text: (s) => s.loop >= 2 ? `"Jack! You're late again!"

Word for bloody word. I mouthed late along with her, half a beat behind, like karaoke to a song I hate.

"Brig's going mental. And the lobby's already trying to eat the carpet!"

The lobby's already trying to do what now. I knew. I still mouthed it. Two inches of painted pine and I already knew what her wrist was going to feel like.` : `"Jack! You're late again!"

The voice was bright, bubbly, and way too cheerful for whatever ungodly hour this was. I'd also never heard it before. But it sounded like it knew me\u2026

"Brig's going mental. And the lobby's already trying to eat the carpet!"

The lobby's already trying to do what now?`,
    choices: [
      go("d2_open", "Yank the door open", { hint: "Meet her" }),
      go("d2_listen", "Keep it shut a second. Listen.", { hint: "Wait" }),
      go("d2_window", "Sash window. Out. Avoid her entirely.", { hint: "Dodge" })
    ]
  });
  add({
    id: "d2_open",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I hurried over and yanked it open. Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Especially as she looked like she'd been designed by someone with excellent taste in trouble. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin.

Without waiting for me to say anything she reached out and grabbed my wrist with one slightly tacky hand and started dragging me down the hall. I didn't even get a chance to find wherever I'd kicked off my boots.

"Ooh, bed hair!" she said over her shoulder. "Very rugged. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important!"

And hang on. Was there something wrong with the light in the corridor? Because it was like I could see translucent ripples running through her as if she wasn't entirely solid. Weird as anything. Pretty fucking hypnotic, if I'm honest.`,
    choices: [go("d2_out", "Let her pull you")]
  });
  add({
    id: "d2_listen",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I put my ear to the paint, because I am a grown man and this is a reasonable way to start a Tuesday.

She was talking to someone who wasn't there. Spore counts. The Stayover in the basement. Register names flickering. A thing called the Rulekeeper who'd shown up on night shift and was, quote, rude.

Then, brightly, to the door: "I can hear you breathing, slowpoke."

The handle turned anyway. I'd shown her I hesitate. She'd shown me she doesn't, and I want you to pay attention to that, because it's going to keep happening.`,
    choices: [
      go("d2_out", "She's coming in regardless", {
        set: { heardBridie: true },
        journal: 1,
        addRule: "Trudie talks to the hotel like it answers."
      })
    ]
  });
  add({
    id: "d2_window",
    location: "Diamond 2 \u2014 Consequence",
    art: "/art/courtyard.jpg",
    speaker: "jack",
    text: `The sash stuck, then gave, the way a sash does when the housing's swollen on the face and nobody's planed three millimeters off the bottom in about forty years. I dropped into a courtyard that smelled of wet stone and something sweeter, like fruit left too long.

My boots hit a puddle that was not rain. The fountain in the middle was dry as a lie. Above me, Trudie Crisp leaned out of 204 and shouted that I was a complete menace and also late.

So now I was going to have to walk in the front door like a guest. Wet. For the record, I'd like to say that this one was very nearly a complete and utter triumph.`,
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
    text: (s) => s.flags.arrivedWet ? `The lobby took me in through the front like a bad decision. Pastel walls. Dirty brass, the sort that's been handled by a hundred years of people and gone soft and gold at all the places where hands actually land. A smell of lemon soap and something under it that was not lemon.

Trudie was already on her knees in the middle of the floor. The carpet was fizzing.` : `Then we turned a corner and the lobby of the hotel proper opened up. More of those pastel walls, more of that dirty brass, and pride of place a totally Instagram-ready reception desk with a big leather-bound register sitting open on it. I'd love to tell you I stopped and had a good long think about that. But I didn't. There was rather a lot going on.

Everything looked pretty impressive, actually, except for the carpet near the far wall which was\u2026 bubbling. Like, properly fizzing with small dark patches spreading outwards like mold in fast-forward. It was utterly bizarre.`,
    choices: [go("d3", "The spill", { time: "morning" })]
  });
  add({
    id: "d3",
    location: "Diamond 3 \u2014 The Lobby Spill",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    time: "morning",
    text: (s) => {
      if (s.flags.mutSpillHelped && s.loop >= 2) {
        return `"You're early!" She looked up, delighted and faintly see-through. "I think it likes you today. It's barely even fizzing."

The east seam was quieter than it had been yesterday, which is a sentence I am still not entirely comfortable having opinions about. The hotel remembered a kindness I had not done yet this morning.

She held out a rag. "You going to help, or are you going to stand there being rugged?"`;
      }
      if (s.flags.mutSpillIgnored && s.loop >= 2) {
        return `She was already running. The carpet had a mouth today. The fizz had become a hiss.

"Don't just stand there, Jack! I told you\u2026 I told you yesterday\u2026 wait, did I?"

She hadn't. I hadn't helped. The floor had opinions about that, and I could be wrong but I don't think they were complimentary.`;
      }
      return `"Look!" She patted the floor like a well-behaved dog that was not, in fact, behaving. "If we don't get the seal down before ten, the boards go. They always go."

A rag hit my chest. Tacky fingers. A grin that would get a man in trouble in a quieter building.

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
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I got down. Muscle memory, I guess, or the bit of me that still thinks a leaking thing wants a rag more than it wants a speech. The fizz died under the cloth the way a valve dies when you finally seat it, and the east seam lay down like it had been told.

A compliment about her work landed harder than one about her ass. She went a shameless rose color and the edges of her went vague, as if her outline was the first thing she stopped bothering with when she was pleased.

"See? You do know how to be useful. Brig said you were a plumber. I said you were a menace. We can both be right."

And yes, I still preened a bit at it, because apparently a man can be utterly baffled about what is going on in his universe and still also enjoy being flirted with.`,
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
    text: `"Suit yourself." She didn't look up. The rag went in tight circles. She was very good at this and very used to doing it alone, which I noticed in the way I notice a hinge that's been oiled by the same hand for years.

The seal went down. The fizz sulked. She sat back on her heels and blew a strand of blue-green off her mouth.

"Desk needs you. I don't. Not this morning, anyway."`,
    choices: [go("d3_out", "Leave her the floor")]
  });
  add({
    id: "d3_chaos",
    location: "Diamond 3 \u2014 Consequence",
    art: "/art/corridor.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I pulled. She was heavier than a woman her size had any right to be, and then she was lighter, the way water keeps moving in a glass after you've set the glass down.

"Hey!"

The rag slapped the tiles. The fizz found the gap and climbed. Trudie laughed, which was not the reaction I'd wanted, and sprinted for the stairs.

"Now you've done it, slowpoke. Two o'clock is going to be so rude."

I could be wrong, but I think I just made a schedule problem.`,
    choices: [
      go("d3_out", "Well. That's done.", {
        set: { flagChaos: true, mutSpillIgnored: true },
        addRule: "If you pull her off the seal, two o'clock comes hunting."
      })
    ]
  });
  add({
    id: "d3_out",
    location: "Diamond 3 \u2014 Outcome",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `The lobby had decided what kind of morning it was going to be. The desk was waiting.

Someone had to stand behind it. The brass plate said the post was vacant, and I want you to pay attention to the preposition there, because vacant is doing a fuckload of work.`,
    choices: [go("d4", "The front desk")]
  });
  add({
    id: "d4",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: (s) => {
      const bits = [
        "Mahogany. A bell that had been polished by better hands than mine. A ledger with names that flickered if you looked too long, which is not a thing ledgers are meant to do."
      ];
      if (s.flags.heardBridie) {
        bits.push("Trudie'd said the register names flickered. She hadn't been being cute.");
      }
      if (s.loop >= 2) {
        bits.push("I'd stood here before. The vacancy had not filled itself, mind you, and I hadn't expected it to.");
      }
      bits.push("The floor under the east seam gave a small, rotten cough.");
      return bits.join(" ");
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedLedger) c.push(go("d4_ledger", "Open the ledger", { hint: "Look" }));
      if (!s.flags.lookedPlate) c.push(go("d4_plate", "Read the brass plate", { hint: "Look" }));
      if (!s.flags.lookedBell) c.push(go("d4_bell", "Tap the bell. Just the once.", { hint: "Look" }));
      c.push(go("d4_exit", "The boards are going. Deal with that.", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d4_ledger",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `Yesterday's arrivals were written in a hand that kept changing its mind. CAUSEY, JACK. Room 204. Checked in at a time that was not a time.

Under it, fainter: CAUSEY, JACK. And again. And again.

That book is trying to check me in. It writes a name, it can't finish, so it drops the name and starts it over. I closed it before the page could add another one while I was watching.`,
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
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `INNKEEPER. Vacant.

The word vacant had been polished more than the rest of the plate, as if a lot of people had stood here and rubbed it with their thumb, thinking. There was a line underneath for a signature. The pen was still wet.

I didn't sign. Not yet. A man who signs the inside of a thing is a man who expects other men to work on it later, and I have not decided I am that man in this building.`,
    choices: [
      go("d4", "Leave the pen", {
        set: { lookedPlate: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d4_bell",
    location: "Diamond 4 \u2014 The Front Desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `One tap.

The sound went further than the room. Somewhere above, a rope thought about moving. Somewhere below, something answered that it had heard.

Trudie, from the floor, without looking up: "Don't do that twice. House rule."

Noted. I can take an instruction when it's offered without a lecture.`,
    choices: [
      go("d4", "Hands off the bell", {
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      })
    ]
  });
  add({
    id: "d4_exit",
    location: "Diamond 4 \u2014 Outcome",
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `Ten o'clock has a smell. Wet wood. Sweet rot. The east boards were done pretending, and I didn't need a moisture meter to tell me that.

Whatever I did next, the floor was going to have a say.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk who wasn't there a minute ago", {
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
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: (s) => s.flags.lelandMet ? `"You're late," Leland Crum said, which is rich from a man who arrives when the building tells him to. "Don't look at me like that. I remember. That's the whole problem."` : `A man in a postman's coat was standing where I'd been standing. Satchel. Rain that wasn't falling on him. Eyes like he'd been delivering to the same wrong address for a long time.

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
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Good. Write it down. The paper keeps what your head drops."

He tapped the work order in my fist without asking how I'd got it.

"I'm the mail. I go in and out. That's why I keep the days. You stay. That's why you don't, unless you make yourself someone the building can't mislay."

I stood there a second not liking it much. Then I nodded, because he was right, and I hate it when the mail is right.`,
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
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Manager." He tasted the word and put it back. "If there was one, you wouldn't be holding that paper.

I'm Leland Crum. I bring what gets through. I do not explain the house to men who think they're funny at eight in the morning."

Fair. I still preened a bit, because apparently I can be told off by a postman and still enjoy having been recognized.`,
    choices: [
      go("d10b_out", "Fair", { set: { lelandMet: true } })
    ]
  });
  add({
    id: "d10b_ask",
    location: "Diamond 10B \u2014 Consequence",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Fix what breaks. Don't ask questions. Then do it all again." He nodded at my hand. "You already have the brief. The rest is hours and corners. Four staff. Four nodes. No innkeeper. That's the hole you're standing in."

The satchel creaked.

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
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `He was already going. The satchel hit his hip. The boards under the east seam chose that moment to give up the pretence of being wood, which I thought was a bit on the nose, even for this place.`,
    choices: [go("d5", "Now the floor")]
  });
  add({
    id: "d5",
    location: "Diamond 5 \u2014 The Rotting Boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    time: "morning",
    text: (s) => {
      if (s.flags.mutSpillHelped) {
        return `Ten o'clock arrived late, like a man who'd been asked nicely.

The east boards were dark, not open. A soft place. I could leave it. I could put a foot through it. I could fetch someone who knows what this house uses for bones. The reason a board goes is usually water and time and whoever last bodged the seal. This one had all three, and something else I couldn't account for yet.`;
      }
      return `The board went with a sound like a wet book shutting.

A hole the width of a dinner plate. Under it: not a cellar. A suggestion of one. Cold air with a sweet edge. Something down there was breathing on a schedule.

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
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `Offcut from behind the desk. Two nails that were waiting like they'd been set out for me. It is a truth universally acknowledged that a man who fixes a thing that he thinks other men will have to work on later will sign the inside of it, and my hands did the rest without asking me.

The hole closed. The cold stopped coming up. My hands have been in this hotel longer than I have, which is not a comforting sentence.

Trudie whooped like I'd done a trick. Maybe I had.`,
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
    text: `Like the colossal fucking idiot everyone always said I was, I got down on my elbows and looked.

Down there: silk. A lot of it. And further, a shape that might have been a boy once, if boys came with too many hours in them.

A click. Then another. Then a third, closer.

I got back before the fourth.`,
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
    text: `"Good boy." She said it like a joke and like it wasn't. "Ione will silk it if it gets any ruder. You go find a kettle. Or a life. I'm not fussy."

The hole stayed. The cold stayed. I had chosen not to be useful, and I sat and looked at those two things for a while.`,
    choices: [go("d5_out", "The day has more hours than this")]
  });
  add({
    id: "d5_out",
    location: "Diamond 5 \u2014 Outcome",
    art: "/art/brig-kitchen.jpg",
    speaker: "jack",
    text: (s) => s.loop === 1 ? `The rest of the day happened to other people. Pans. Needles. A noon that wanted me outdoors and didn't get me, because there was always something else in that hotel about to kill me and, you know, a man has to prioritize.

I blinked and the brass had gone honey. I blinked and the lamps were lit. It's fair to say I'd had a bit of a morning.` : `I know this skip now. I did the checks, because apparently that's who I am now, and the hotel compressed the hours I hadn't earned.

Midnight is the thing that wants me. I really wasn't enjoying this fieldtrip overmuch.`,
    choices: [go("d9", "Stay up for the bell", { time: "night" })]
  });
  add({
    id: "d9",
    location: "Diamond 9 \u2014 Midnight",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "night",
    text: `Eleven-thirty. The hotel had gone thin. Every ticking thing in the walls had agreed on a tempo, which is never what you want from a building.

I could go down to the lobby and meet whatever rang. I could stay in 204 and let it come upstairs. I could look first, like a man who still thinks looking helps.`,
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
    art: "/art/courtyard.jpg",
    speaker: "jack",
    text: `The fountain was still dry. The courtyard was full of a dark that had thickness.

For a second there was a boy in it. Then there wasn't. I stood there a second not liking it much.`,
    choices: [
      go("d9", "Shut the sash", { set: { lookedNightWindow: true }, journal: 1 })
    ]
  });
  add({
    id: "d9_order",
    location: "Diamond 9 \u2014 Midnight",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => `The paper was warm.

${s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n")}

A new line was waiting underneath, in a gap. It would fill itself in when I earned it. Don't ask questions. Then do it all again. Yeah. That sounded like about the perfect description of my increasingly shitty life.`,
    choices: [
      go("d9", "Pocket it", { set: { lookedNightOrder: true } })
    ]
  });
  add({
    id: "d9_lobby",
    location: "Diamond 9 \u2014 Consequence",
    art: "/art/night-lobby.jpg",
    speaker: "jack",
    text: `The desk was empty. The bell was sweating.

It rang once. Then it rang a second time.

The lights went.

Something with too many hours in it came up through the east boards as if the patch I'd put there was a courtesy.`,
    choices: [go("d9_end", "There is no third ring")]
  });
  add({
    id: "d9_stay",
    location: "Diamond 9 \u2014 Consequence",
    art: "/art/room-stain.jpg",
    speaker: "jack",
    text: `I put my back to the door.

The stain in the corner opened. The damp had been patient all day.

The bell found me through the floor. Once. Twice.`,
    choices: [go("d9_end", "That's it then")]
  });
  add({
    id: "d9_end",
    location: "Diamond 9 \u2014 Outcome",
    art: "/art/hotel.jpg",
    speaker: "jack",
    tone: "death",
    text: (s) => s.loop === 1 ? `I died.

The work order will still be in my fist. Trudie will not remember my name in her mouth. Leland might.

Wake up. Read the new line.` : `I died. Again.

I did the checks, because apparently that's who I am now. Then do it all again.`,
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
