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
    location: "Room 204",
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
        const extra = s.workOrder.length > 1 ? `

There's a new line on the work order that absolutely was not there yesterday.

${s.workOrder.slice(1).map((l) => l).join("\n")}

Okay. Fine. So I'm leaving notes for myself following my brutal death now, am I?` : "";
        return `Same bed. Same knock. Same bloody stationery in my fist. Head clear as a Sunday morning, which is the first thing that's gone right since Taverners.

I'd love to tell you I sat up and had a good long think about dying. But I didn't. You see, here's the thing about dying before lunch. It's a wonderful teacher, and a shit one, because the lesson is just do it again and try not to be quite so stupid.${extra}

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
      c.push(go("d2", "Get up and deal with the door", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d1_room",
    location: "Room 204",
    art: "/art/room-stain.jpg",
    speaker: "jack",
    text: `Yeah, this definitely wasn't my crappy apartment's couch. Single window, netted. Wardrobe that smelled of someone else's cedar. No lock on the door, no chain, no courtesy latch, which is a thing I'd have words about if this were a job I was quoting.

There was damp bloom in the corner where the ceiling met the wall and it was running about a foot across. That hadn't been caused by a leak from above, I didn't think, because the stain had no run to it and no tail. It was rising, then. Something behind the plaster was being all patient about it. Someone needed to fix the source or they'd be painting over that shot every spring until they died.`,
    choices: [
      go("d2", "On your feet", { set: { lookedRoom: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_order",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.workOrder.length === 1 ? `Three lines. Hotel stationery. Handwriting that looked suspiciously like mine, which is a sentence I do not enjoy thinking about before coffee.

Fix what breaks. Don't ask questions. Then do it all again.

Fuck knows what that meant. Had I gone and got all gnostic at some point during last night's bender? If this is a callout, it's the worst brief I've ever been given. If it's a philosophy, it's the last six months of my life printed on nice paper.` : `The list has been growing. Every line after the first three is a thing I learned by having something appalling happen to me, which is a method of professional development I cannot recommend.

${s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n")}

I'd like, just once, a hint in advance of my horrible murder.`,
    choices: [
      go("d2", "On your feet", { set: { lookedOrder: true }, journal: 1 })
    ]
  });
  add({
    id: "d1_self",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `I sat up, moaned, and rubbed my face. Jesus Frederico Christ. Dark hair sticking up in every possible direction and I seemed to have acquired a week's worth of stubble overnight. Eyes bloodshot enough to look like I hadn't slept in a month, and I didn't even want to consider what was spilt down the front of my favorite T-shirt.

I looked beyond rough. The woman knocking didn't seem to be overly bothered about any of that, which was either kindness or she had bigger problems, and I could be wrong but I think this hotel does bigger problems as a house special.`,
    choices: [
      go("d2", "On your feet", { set: { lookedSelf: true }, journal: 1 })
    ]
  });
  add({
    id: "d2",
    location: "Room 204",
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
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I hurried over and yanked it open. Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Especially as she looked like she'd been designed by someone with excellent taste in trouble. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin.

Without waiting for me to say anything she reached out and grabbed my wrist with one slightly tacky hand and started dragging me down the hall. I didn't even get a chance to find wherever I'd kicked off my boots.

"Ooh, bed hair!" she said over her shoulder. "Very rugged. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important!"

And hang on. Was there something wrong with the light in the corridor? Because it was like I could see translucent ripples running through her as if she wasn't entirely solid. Weird as anything. Pretty fucking hypnotic, if I'm honest.`,
    choices: [go("d2_meet", "She already has your wrist")]
  });
  add({
    id: "d2_listen",
    location: "Corridor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I put my ear to the paint, because I am a grown man and this is a reasonable way to start a Tuesday.

She was talking to someone who wasn't there. Spore counts. The Stayover in the basement. Register names flickering. A thing called the Rulekeeper who'd shown up on night shift and was, quote, rude.

Then, brightly, to the door: "I can hear you breathing, slowpoke."

The handle turned anyway.`,
    choices: [
      go("d2_meet", "She's coming in", {
        set: { heardBridie: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d2_window",
    location: "Courtyard",
    art: "/art/courtyard.jpg",
    speaker: "jack",
    text: `The sash stuck, then gave, the way a sash does when the housing's swollen on the face and nobody's planed three millimeters off the bottom in about forty years. I dropped into a courtyard that smelled of wet stone and something sweeter, like fruit left too long.

The fountain in the middle was dry as a lie. I got about four steps toward what I hoped was a front door.

"JACK CAUSEY you complete menace!"

She'd come out the window after me. Barely. Mostly she'd poured. I was still going to have to meet her.`,
    choices: [
      go("d2_meet", "Alright. You've met her.", {
        set: { arrivedWet: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d2_meet",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: (s) => s.flags.arrivedWet ? `Young woman. Unnecessarily slutty maid outfit. Blue-green hair, all the piercings in the world, a filthy grin, and a crooked name tag perched on the left of an enormous pair of tits that said Trudie Crisp.

She was also slightly see-through, and I was wet, and she still grabbed my wrist with one slightly tacky hand.

"Ooh, bed hair! Very rugged. And now you're soggy. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important!"` : `Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Especially as she looked like she'd been designed by someone with excellent taste in trouble. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin.

Without waiting for me to say anything she reached out and grabbed my wrist with one slightly tacky hand and started dragging me down the hall. I didn't even get a chance to find wherever I'd kicked off my boots.

"Ooh, bed hair!" she said over her shoulder. "Very rugged. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important!"

And hang on. Was there something wrong with the light in the corridor? Because it was like I could see translucent ripples running through her as if she wasn't entirely solid.`,
    choices: [go("d2_hall", "Let her pull you")]
  });
  add({
    id: "d2_hall",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: (s) => `I let her pull me. Partly because I was still trying to figure out what the hell was going on, and partly because her grip on my arm was one of the nicer sensations I'd experienced recently.

"Come on, slowpoke! Brig is already growling about breakfast and the Rulekeeper's been circling the second floor for the last hour. Up and at them!"

${s.flags.heardBridie ? "I'd already heard half of this through the door. Hearing it again didn't make it make any more sense." : "She kept talking whether I was listening or not."} Fragments about spore counts. The Stayover acting up in the basement. Register names in reception flickering. Ione patching tears in the second floor and drinking something that might have been silk tea.

It all sounded very involved and I had absolutely no idea what any of it meant.

We turned toward the lobby. Pastel walls. Dirty brass. A carpet that was, I was fairly sure, fizzing.

Then a growl rolled out of the kitchen.`,
    choices: [
      go("d_brig", "The kitchen door", {
        time: "morning",
        journal: 1,
        addRule: "Rulekeeper walks the second floor. Stayover is in the basement. Ione patches tears."
      })
    ]
  });
  add({
    id: "d_brig",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    time: "morning",
    text: (s) => s.loop >= 2 ? `The kitchen door slammed open on schedule. Ears. Teeth. Wooden spoon, jabbed my way in a pretty unfriendly manner.

"You. Late again! What's your excuse this time, handyman?"

I could tell her about the stove before I'd looked at it. I could play dumb. I could stand here like a lemon and wait for her to throw vegetables at me.` : `"Trudie! If that waste-of-skin handyman is late again I'm going to spank his ass myself!"

Then the kitchen door slammed open and out came the second woman this morning who made my brain go out to lunch. Pointed furry ears. Impossibly sharp teeth. A white chef's jacket straining against a body that looked like it could bench a truck and then eat it. And a long furry tail that lashed about behind her.

"You," she growled, jabbing a wooden spoon my way. "Late again! What's your excuse this time, Causey?"

What the actual fucking fuckery fuck? Was I still asleep?`,
    choices: [
      go("d_brig_stove", "The stove. That's a job I understand.", { hint: "Fix" }),
      go("d_brig_chop", "Take the cutting board. Try not to die.", { hint: "Help" }),
      go("d_brig_stare", "Just\u2026 stand there. Process the ears.", { hint: "Freeze" })
    ]
  });
  add({
    id: "d_brig_stove",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: (s) => s.loop >= 2 ? `"There's something wrong with your big stove, isn't there?" I said. "I could be wrong, but I think the wards are running hot and the flame's going all greeny-black under the orange. Pressure feed on the left side, third fitting down, weeping into the line. I can have that sorted in a jiffy."

The kitchen went quiet. Brig's ears went flat, and not in the angry way. The careful way.

"But you've not even looked at it, Causey. How can you possibly know that?"

"Just a lucky guess." The toolkit popped into my hand. I saw it arrive this time.

"Stop poncing about and fix it."` : `Trudie plucked the knife away before I could disgrace a carrot. "What Brig really needs you for is the big stove. Flames going weird colors. Wards getting far too hot. You know how it gets when it's in one of its moods."

"The oven gets moods?" I said.

"Bit like Brig, really. Loud, hot, and sulks if you ignore it."

"Say that again, Trudie, and you're going in the stew as thickener."

Ancient cast iron. Dials older than God. Flames flickering between normal orange and something sicky greeny-black. The air smelled like burning herbs and rot. My hands went to work on the fittings without asking me, which was either competence or the hotel wearing me like a glove.`,
    choices: [
      go("d_brig_out", "Fix it. Get out of her kitchen.", {
        journal: 1,
        addRule: "The stove weeps at the third fitting. Wards run hot."
      })
    ]
  });
  add({
    id: "d_brig_chop",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `She shoved a cutting board and vegetables at me. "Chop chop. Uniformly. If I see one uneven dice I'm using your fingers for stock. You see if I don't."

I took the knife on autopilot. I fix pipes. Wiring. Drywall. I do not, as a matter of course, dice onions for a woman who looks like she's stepped out of the world's most well-resourced furry convention.

Trudie took pity and plucked the knife away with a wink. "Let me. What she actually wants is the stove."

Brig's tail lashed. "Him on the oven. Last handyman who messed with my kitchen without permission ended up as seasoning."`,
    choices: [go("d_brig_out", "Right. Stove. Then out.")]
  });
  add({
    id: "d_brig_stare",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `"I\u2026 just woke up?" My voice came out far smaller than I'd meant it to. "In fact, I'm not actually sure that I have\u2026"

Her ears flattened. "Woken up. Right. Because that's just perfect, isn't it."

Trudie giggled from the doorway. "It's so excellent to see you're in a better mood today, Brig!"

A cutting board hit my chest. Then Trudie stole the knife off me, and I was pointed at the stove like a dog being shown the newspaper.

Those ears. That tail. The teeth. The flames around her flared higher than physics allowed. This wasn't a costume.`,
    choices: [go("d_brig_out", "Do the stove. Don't argue.")]
  });
  add({
    id: "d_brig_out",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `The flames settled back to orange. She grunted what might have been approval and shoved a bowl at me. Warm, rich, a spice kick that almost cleared the hangover. The one without the chip in it.

"She saved you the good bowl," Trudie stage-whispered.

"It was just the nearest bowl."

"It's the bowl you\u2026"

"It was the nearest bowl!"

"Good enough. Now get out of my kitchen and go earn your fucking salary."

Trudie was already being pointed at the lobby with a rag.`,
    choices: [go("d3", "The carpet she was sent to seal")]
  });
  add({
    id: "d3",
    location: "Lobby",
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
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I got down. Muscle memory, I guess, or the bit of me that still thinks a leaking thing wants a rag more than it wants a speech. The fizz died under the cloth the way a valve dies when you finally seat it, and the east seam lay down like it had been told.

A compliment about her work landed harder than one about her ass. She went a shameless rose color and the edges of her went vague, as if her outline was the first thing she stopped bothering with when she was pleased.

"See? You do know how to be useful. Brig said you were a plumber. I said you were a menace. We can both be right."

And yes, I still preened a bit at it, because apparently a man can be utterly baffled about what is going on in his universe and still also enjoy being flirted with.`,
    choices: [
      go("d4", "The desk is empty. Someone should stand there.", {
        set: { flagOrder: true, mutSpillHelped: true },
        trust: 1,
        addRule: "The lobby is Trudie's. Help her finish the seal."
      })
    ]
  });
  add({
    id: "d3_watch",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Suit yourself." She didn't look up. The rag went in tight circles. She was very good at this and very used to doing it alone, which I noticed in the way I notice a hinge that's been oiled by the same hand for years.

The seal went down. The fizz sulked. She sat back on her heels and blew a strand of blue-green off her mouth.

"Desk needs you. I don't. Not this morning, anyway."`,
    choices: [go("d4", "She pointed you at the desk")]
  });
  add({
    id: "d3_chaos",
    location: "Lobby",
    art: "/art/corridor.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I pulled. She was heavier than a woman her size had any right to be, and then she was lighter, the way water keeps moving in a glass after you've set the glass down.

"Hey!"

The rag slapped the tiles. The fizz found the gap and climbed. Trudie laughed, which was not the reaction I'd wanted, and sprinted for the stairs.

"Now you've done it, slowpoke. Two o'clock is going to be so rude."

I could be wrong, but I think I just made a schedule problem.`,
    choices: [
      go("d4", "The desk, then, since the floor's gone feral", {
        set: { flagChaos: true, mutSpillIgnored: true },
        addRule: "If you pull her off the seal, two o'clock comes hunting."
      })
    ]
  });
  add({
    id: "d4",
    location: "Front desk",
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
      if (s.loop >= 2) c.push(go("d10b", "There's a man at the desk", { hint: "Advance" }));
      else c.push(go("d5", "The east boards are going", { hint: "Advance" }));
      return c;
    }
  });
  add({
    id: "d4_ledger",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `Yesterday's arrivals were written in a hand that kept changing its mind. CAUSEY, JACK. Room 204. Checked in at a time that was not a time.

Under it, fainter: CAUSEY, JACK. And again. And again.

That book is trying to check me in. It writes a name, it can't finish, so it drops the name and starts it over. I closed it before the page could add another one while I was watching.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk", {
        when: (st) => st.loop >= 2,
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      }),
      go("d5", "The east boards are going", {
        when: (st) => st.loop < 2,
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      })
    ]
  });
  add({
    id: "d4_plate",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `INNKEEPER. Vacant.

The word vacant had been polished more than the rest of the plate, as if a lot of people had stood here and rubbed it with their thumb, thinking. There was a line underneath for a signature. The pen was still wet.

I didn't sign. Not yet. A man who signs the inside of a thing is a man who expects other men to work on it later, and I have not decided I am that man in this building.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk", {
        when: (st) => st.loop >= 2,
        set: { lookedPlate: true },
        journal: 1
      }),
      go("d5", "The east boards are going", {
        when: (st) => st.loop < 2,
        set: { lookedPlate: true },
        journal: 1
      })
    ]
  });
  add({
    id: "d4_bell",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `One tap.

The sound went further than the room. Somewhere above, a rope thought about moving. Somewhere below, something answered that it had heard.

Trudie, from the floor, without looking up: "Don't do that twice. House rule."

Noted. I can take an instruction when it's offered without a lecture.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk", {
        when: (st) => st.loop >= 2,
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      }),
      go("d5", "The east boards are going", {
        when: (st) => st.loop < 2,
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      })
    ]
  });
  add({
    id: "d10b",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: (s) => s.flags.lelandMet ? `"You're upright," Leland said. Satchel. Feathers for sideburns, if you looked at him properly. "Don't waste it asking if you're mad. You're not. The hotel is."` : `A man in a postman's coat was standing where I'd been standing. Satchel. Rain that wasn't falling on him. Eyes like a bird's, and not in a poetic way.

"Causey." Not a question. "I'm not your address. I'm the four-thirty, and I'm early, which means something's already gone wrong with the round. Don't ask me if you're mad. You're not. The hotel is."`,
    choices: [
      go("d10b_truth", "Tell him you remember dying", { hint: "Truth" }),
      go("d10b_joke", "Play it light. Ask if he's the manager.", { hint: "Dodge" }),
      go("d10b_ask", "Ask him what the job actually is", { hint: "Work" })
    ]
  });
  add({
    id: "d10b_truth",
    location: "Front desk",
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
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Manager." He tasted the word and put it back. "If there was one, you wouldn't be holding that paper. Never been an advert out for a handyman either. Not one, in the whole time it's been on the round."

He dealt an envelope into a pigeonhole that went out like a match.

"I'm Leland. I bring what gets through. I do not explain the house to men who think they're funny before four-thirty."`,
    choices: [
      go("d10b_out", "Fair", { set: { lelandMet: true } })
    ]
  });
  add({
    id: "d10b_ask",
    location: "Front desk",
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
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `He was already going. The satchel hit his hip. The boards under the east seam chose that moment to give up the pretence of being wood, which I thought was a bit on the nose, even for this place.`,
    choices: [go("d5", "Now the floor")]
  });
  add({
    id: "d5",
    location: "East boards",
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
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `Offcut from behind the desk. Two nails that were waiting like they'd been set out for me. It is a truth universally acknowledged that a man who fixes a thing that he thinks other men will have to work on later will sign the inside of it, and my hands did the rest without asking me.

The hole closed. The cold stopped coming up. My hands have been in this hotel longer than I have, which is not a comforting sentence.

Trudie whooped like I'd done a trick. Maybe I had.`,
    choices: [
      go("d5_jobs", "That's the morning, then", {
        journal: 1,
        addRule: "Ten o'clock is the east boards. Patch them. Don't climb in."
      })
    ]
  });
  add({
    id: "d5_look",
    location: "East boards",
    art: "/art/basement.jpg",
    speaker: "jack",
    text: `Like the colossal fucking idiot everyone always said I was, I got down on my elbows and looked.

Down there: silk. A lot of it. And further, a shape that might have been a boy once, if boys came with too many hours in them.

A click. Then another. Then a third, closer.

I got back before the fourth.`,
    choices: [
      go("d5_jobs", "Never again before you're invited", {
        journal: 1
      })
    ]
  });
  add({
    id: "d5_leave",
    location: "East boards",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Good boy." She said it like a joke and like it wasn't. "Ione will silk it if it gets any ruder. You go find a kettle. Or a life. I'm not fussy."

The hole stayed. The cold stayed. I had chosen not to be useful, and I sat and looked at those two things for a while.`,
    choices: [go("d5_jobs", "There's still a leak, and a light")]
  });
  add({
    id: "d5_jobs",
    location: "Second floor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I fixed a leaky pipe on pure muscle memory. Then a flickering fixture on the second floor. Every one of these tasks felt familiar to my hands, but my brain kept screaming the same thing: I'd never been to this place before in my whole life.

These women knew my name. They were talking to me like I'd been part of their crew forever. None of it made a jot of sense.

I was still trying to mentally map the layout when the clock struck three.`,
    choices: [go("d9", "The temperature dropped", { time: "three" })]
  });
  add({
    id: "d9",
    location: "Service stairs",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "three",
    text: `The lights flickered. From somewhere below, a dragging sound. Black mold on the walls near the service stairwell in patterns that almost looked like\u2026 yeah, they looked like handprints, didn't they?

The basement door at the bottom was cracked open a touch. I thought I could hear a child's voice.

I could follow it, like the colossal fucking idiot everyone always said I was. I could walk the other way. I could take the unlit stairs up, on account of the bulb I hadn't got around to fixing.`,
    choices: [
      go("d9_down", "Follow the sound down", { hint: "The basement" }),
      go("d9_away", "Turn around. Walk the other way.", { hint: "Don't" }),
      go("d9_up", "Take the service stairs up. In the dark.", { hint: "Shortcut" })
    ]
  });
  add({
    id: "d9_down",
    location: "Basement door",
    art: "/art/basement.jpg",
    speaker: "jack",
    text: `Like the colossal fucking idiot everyone always said I was, I followed the sound down toward one of the service stairwells.

"Stay\u2026 with us\u2026"

Something pale and wrong lunged out from behind that door. Far too many arms and legs. A crying child's face. I didn't even have time to scream.`,
    choices: [go("d9_end_stay", "That's it, then")]
  });
  add({
    id: "d9_away",
    location: "Second floor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I turned on my heel and walked the other way, because I can take an instruction off my own handwriting when it's offered.

The service stairs were still right there. Unlit. Eleven steps of ordinary darkness between me and the nice safe second floor. I put my hand on the rail.

Somewhere above me, I heard a pen click.`,
    choices: [go("d9_end_rule", "Ah. The stairs.")]
  });
  add({
    id: "d9_up",
    location: "Service stairs",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I put my hand on the rail and my foot on the first step.

Somewhere above me, I heard a pen click.

The dark unfolded down on top of me. A suggestion of a long coat, and a clipboard, and a face that was mostly the distilled disappointment from every school report I'd ever received. Then a pen ticking down a list toward a line that had my name on it.

"Ah," I said. "The stairs. In the dark. That's going to turn out to be a big no-no rule, isn't it?"`,
    choices: [go("d9_end_rule", "It was")]
  });
  add({
    id: "d9_end_stay",
    location: "Reset",
    art: "/art/hotel.jpg",
    speaker: "jack",
    tone: "death",
    text: `I died.

Funnily enough, the last thing in my mind was Trudie's filthy grin. Then black.

The work order will still be in my fist. There'll be a new line. I want you to read it this time.`,
    death: {
      cause: "The thing in the basement.",
      rule: "The basement is not on the schedule right now."
    },
    choices: []
  });
  add({
    id: "d9_end_rule",
    location: "Reset",
    art: "/art/hotel.jpg",
    speaker: "jack",
    tone: "death",
    text: `The thing, this was the Rulekeeper, right, was on me between one blink and the next.

To be fair, this one was much quicker than the last. The last thing through my head wasn't fear. It was, roughly: fine. Now I knew.

This hotel had better have a bloody suggestion box.`,
    death: {
      cause: "The stairs. In the dark.",
      rule: "No stairs in the dark."
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
