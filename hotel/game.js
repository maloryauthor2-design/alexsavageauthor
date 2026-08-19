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
  function afterLook(s, set) {
    const flags = { ...s.flags, ...set };
    const extra = { set, journal: 1 };
    const c = [];
    if (!flags.lookedRoom) c.push(go("d1_room", "That stain in the corner", extra));
    if (!flags.lookedSelf) c.push(go("d1_self", "Catch yourself in the mirror", extra));
    c.push(go("d2", "Answer the door", extra));
    return c;
  }
  var hallAct = () => [
    go("d_hall_listen", "Listen. Try to keep up."),
    go("d_hall_look", "Watch her walk."),
    go("d_hall_stop", "Plant your feet. Ask where you're going.")
  ];
  var hallAsk = (extra = {}) => [
    go("d_ask_rk", "The Rulekeeper. Who's that?", extra),
    go("d_ask_ione", "Ione. Silk tea.", extra),
    go("d_ask_stay", "The Stayover. In the basement.", extra)
  ];
  var hallLook = () => [
    go("d_look_ripple", "The ripples. Ask."),
    go("d_look_slow", "Ask her to slow down."),
    go("d_look_stare", "Don't say a word. Watch.")
  ];
  var lobbyAct = (extra = {}) => [
    go("d_lobby_carpet", "Look at the carpet", extra),
    go("d_lobby_desk", "Look at the register", extra),
    go("d_brig", "Keep following her", extra)
  ];
  var kitchenAct = (extra = {}) => [
    go("d_brig_stove", "The stove. That's a job I understand.", extra),
    go("d_brig_chop", "Take the cutting board.", extra),
    go("d_brig_stare", "Stand there. Process the ears.", extra)
  ];
  var kitchenOut = (extra = {}) => [
    go("d_brig_days", "Every few days. Say that again.", extra),
    go("d_brig_thanks", "Thank her for the bowl.", extra),
    go("d_brig_out", "Get out before the tail decides.", extra)
  ];
  var spill = (extra = {}) => [
    go("d3_mop", "Get on your knees and help", extra),
    go("d3_watch", "Stand back. Let her finish.", extra),
    go("d3_chaos", "Pull her off the carpet", extra)
  ];
  var desk = (s, extra = {}) => [
    go("d4_ledger", "Open the ledger", extra),
    go("d4_bell", "Tap the bell. Once.", extra),
    go("d5", "The boards", extra)
  ];
  var boardAct = (extra = {}) => [
    go("d5_patch", "Patch it. That's the job.", extra),
    go("d5_look", "Lie down and look. Just look.", extra),
    go("d5_leave", "Leave it. She said don't go down.", extra)
  ];
  var jobsAct = (extra = {}) => [
    go("d_pipe", "The leaky pipe", extra),
    go("d_light", "The flickering fixture", extra),
    go("d_kettle", "Go looking for a kettle", extra)
  ];
  var threeAct = (extra = {}) => [
    go("d9_down", "Follow the sound", extra),
    go("d9_away", "Walk the other way", extra),
    go("d9_up", "The dark stairs. Up.", extra)
  ];
  add({
    id: "d1",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    time: "dawn",
    text: (s) => {
      return `I woke up in a bed that I was pretty sure wasn't mine. And there was a work order crumpled in my hand that I'm also sure I'd never seen before. The paper felt\u2026 too real. Is that actually a thing? It was scrawled on hotel stationery, in handwriting that looked suspiciously like it might well be mine.

Fix what breaks. Don't ask questions. Then do it all again.

Fuck knows what that meant. Last clear thing was Taverners, then the Bushmills, and now a pastel nightmare that looked like it'd been decorated by someone who'd lost a sizeable bet with a color wheel.

A rapid knocking rattled the door frame.`;
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedRoom) c.push(go("d1_room", "That stain in the corner"));
      if (!s.flags.lookedSelf) c.push(go("d1_self", "Catch yourself in the mirror"));
      c.push(go("d2", "There's someone at the door"));
      return c;
    }
  });
  add({
    id: "d1_room",
    location: "Room 204",
    art: "/art/room-stain.jpg",
    speaker: "jack",
    text: `Yeah, this definitely wasn't my crappy apartment's couch. There was damp bloom in the corner where the ceiling met the wall, running about a foot across. No run to it, no tail. Rising, then. Something behind the plaster was being all patient about it.`,
    choices: (s) => afterLook(s, { lookedRoom: true })
  });
  add({
    id: "d1_self",
    location: "Room 204",
    art: "/art/mirror.jpg",
    speaker: "jack",
    text: `I sat up and caught myself in the mirror facing the bed. Jesus Frederico Christ. Dark hair in every possible direction, a week's worth of stubble overnight, eyes bloodshot enough to look like I hadn't slept in a month. I looked beyond rough. The woman knocking didn't seem overly bothered about any of that.`,
    choices: (s) => afterLook(s, { lookedSelf: true })
  });
  add({
    id: "d2",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    text: `"Jack! You're late again!"

The voice was bright, bubbly, and way too cheerful for whatever ungodly hour this was. I'd also never heard it before. But it sounded like it knew me.

"Brig's going mental. And the lobby's already trying to eat the carpet!"

The lobby's already trying to do what now?`,
    choices: [
      go("d2_open", "Yank it open"),
      go("d2_listen", "Keep it shut. Listen first."),
      go("d2_boots", "Find your boots first.")
    ]
  });
  add({
    id: "d2_open",
    location: "Corridor",
    art: "/art/trudie-door.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    time: "morning",
    text: `I hurried over and yanked it open. Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Especially as she looked like she'd been designed by someone with excellent taste in trouble. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin.

Without waiting for me to say anything she reached out and grabbed my wrist with one slightly tacky hand and started dragging me down the hall. I didn't even get a chance to find wherever I'd kicked off my boots.`,
    choices: hallAct
  });
  add({
    id: "d2_listen",
    location: "Corridor",
    art: "/art/trudie-door.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    time: "morning",
    text: `I put my ear to the paint, because I am a grown man and this is a reasonable way to start a Tuesday. She was talking to someone who wasn't there, or to the hotel, I couldn't tell which. Something about counts. Something in the basement. A bloke on night shift she thought was rude.

Then, brightly, to the door: "I can hear you breathing, slowpoke." The handle turned anyway.

And there she was. Young woman in an unnecessarily slutty maid outfit, name tag on the left of an enormous pair of tits that said Trudie Crisp, blue-green hair, and ripples running through her like she wasn't entirely solid. She already had my wrist and she was already walking.`,
    choices: () => hallAct().map((c) => ({ ...c, set: { heardBridie: true }, journal: 1 }))
  });
  add({
    id: "d2_boots",
    location: "Room 204",
    art: "/art/trudie-door.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    time: "morning",
    text: `I went looking for my boots, because I am a grown man and I was not going out there in my socks.

I didn't find them.

The door opened anyway. Young woman in an unnecessarily slutty maid outfit, name tag on the left of an enormous pair of tits that said Trudie Crisp, blue-green hair, filthy grin, and one slightly tacky hand already around my wrist.

"Slowpoke," she said. "Brig's going mental." She started walking. Bare feet on the carpet would have to do.`,
    choices: hallAct
  });
  add({
    id: "d_hall_listen",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: (s) => `I let her pull me${s.flags.arrivedWet ? ", dripping, in through the front like a bad decision" : ""}. Partly because I was still trying to figure out what the hell was going on, and partly because her grip on my arm was one of the nicer sensations I'd experienced recently.

"Come on, slowpoke! Brig is already growling about breakfast and the Rulekeeper's been circling the second floor for the last hour. Up and at them!"

She didn't stop talking. I caught fragments, a rude bloke on the second floor, a woman named Ione patching tears and drinking silk tea, something called the Stayover in the basement, and I had absolutely no idea what any of it meant.`,
    choices: () => hallAsk({
      journal: 1,
      addRule: "Rulekeeper walks the second floor. Stayover is in the basement. Ione patches tears."
    })
  });
  add({
    id: "d_hall_look",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Ooh, bed hair!" she said over her shoulder. "Very rugged. I'd tell you not to worry because nobody important's going to see you, but I'm going to see you, and I'm extremely important!"

And Christ, what a view. Trudie's ass swayed ahead of me with every bouncy step, her minuscule maid skirt doing absolutely nothing. When she stopped at the corner, all that shifting and jiggling didn't stop when she did. It carried on for a half-second longer than it had any business carrying on, the way water keeps moving in a glass after you've set the glass down.

And hang on. Was there something wrong with the light? Translucent ripples running through her as if she wasn't entirely solid. Pretty fucking hypnotic, if I'm honest.

She was still talking. Rulekeeper. Ione. Stayover in the basement. I was not, at that moment, taking notes.`,
    choices: hallLook
  });
  add({
    id: "d_hall_stop",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: (s) => `"Where are we going? Which hotel is this? Why do you know my name?"

She didn't slow down. "Kitchen first, slowpoke. Brig's going to spank your ass herself if you're late, and I want to watch. Rulekeeper's on the second floor, Ione's in a mood, Stayover's acting up in the basement. You know how it is."

I did not know how it was. I knew the floral wallpaper and the damp smell${s.flags.arrivedWet ? ", and that I was leaving a wet trail across someone else's carpet" : ", and that my boots were still in 204"}.`,
    choices: hallAsk
  });
  add({
    id: "d_ask_rk",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"The Rulekeeper," I said, because it had sounded like a job title, and I have always been a mug for job titles.

"Second floor, clipboard, face like a cancelled booking. Don't take the stairs in the dark, he gets all official." She squeezed my wrist, delighted I'd asked. "You'll meet him. Everyone does."

Then we turned a corner and the lobby of the hotel proper opened up. More of those pastel walls. Dirty brass gone gold where hands actually land. A leather register sitting open. And the carpet near the far wall, bubbling, properly fizzing, small dark patches spreading outwards like mold in fast-forward.`,
    choices: () => lobbyAct({
      journal: 1,
      addRule: "Don't take the stairs in the dark. The Rulekeeper gets official."
    })
  });
  add({
    id: "d_ask_ione",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Ione," I said. "Silk tea."

"Five arms, patches tears, drinks something that isn't tea. She's in a mood. Stay out of her way until she's had\u2026 whatever. You always ask about her first. It's cute."

I had not, as far as I knew, always asked about anyone.

Then the lobby opened whether I was ready or not, pastel and brass and a register I didn't get to read, and the carpet fizzing like it had opinions.`,
    choices: () => lobbyAct({
      journal: 1,
      addRule: "Ione has five arms. She patches tears. Stay out of her way."
    })
  });
  add({
    id: "d_ask_stay",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"The Stayover," I said. "In the basement."

Her grin went a bit tight. On her that looks like she's trying to remember how faces work. "Not on today's list, slowpoke. Don't go down. I mean it. I always mean it and you never listen."

We turned into the lobby anyway. The carpet was bubbling. The register was open. She still had my wrist.`,
    choices: () => lobbyAct({
      journal: 1,
      addRule: "The basement is not on the schedule right now."
    })
  });
  add({
    id: "d_look_ripple",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"You're doing a thing," I said. "With the light. Like you aren't entirely\u2026 here."

"Rude. I'm extremely here." She bounced on her heels and the ripples ran the length of her, which did not help my argument. "Slime, Jack. We've had this talk. You always go pink when we have this talk."

Then we were in the lobby and I was still pink, and the carpet was still boiling, which I reckon is not how you want to start a Tuesday.`,
    choices: lobbyAct
  });
  add({
    id: "d_look_slow",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Could we," I said, "not run."

She did not slow down. She did a little skip that made the maid skirt a lost cause. "Brig's going to spank you. I want a good seat. Come on."

The lobby opened whether I was ready or not, register and brass and carpet fizzing, and a growl already warming up in the kitchen.`,
    choices: lobbyAct
  });
  add({
    id: "d_look_stare",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `I didn't say a word. I watched. I am not proud. The leftover jiggle, the ripples, the crooked tag, the whole stupid beautiful mess of her. Then we were in the lobby and I had learned nothing except that I am, as previously advertised, still me.

The carpet was bubbling. The register was open. The kitchen was growling.`,
    choices: lobbyAct
  });
  add({
    id: "d_lobby",
    location: "Lobby",
    art: "/art/lobby.jpg",
    speaker: "jack",
    time: "morning",
    text: `Then we turned a corner and the lobby of the hotel proper opened up. More of those pastel walls. Dirty brass, the sort that's been handled by a hundred years of people and gone soft and gold at all the places where hands actually land. Pride of place, a reception desk with a big leather-bound register sitting open on it. I'd love to tell you I stopped and had a good long think about that. But I didn't. There was rather a lot going on.

Everything looked pretty impressive, except for the carpet near the far wall which was bubbling. Properly fizzing, small dark patches spreading outwards like mold in fast-forward. Utterly bizarre.

Trudie kept tugging me forward. "You handle the east wing, I'll finish the lobby seals before noon. The spores get worse after lunch and Sorrel hates it when they reach the conservatory\u2026"`,
    choices: [
      go("d_lobby_carpet", "Look at the carpet"),
      go("d_lobby_desk", "Look at the register"),
      go("d_brig", "Keep following her")
    ]
  });
  add({
    id: "d_lobby_carpet",
    location: "Lobby",
    art: "/art/carpet.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    text: `The fizz had a smell under the lemon soap, sweet in a way that made my fillings ache, which I reckon is not how carpet is meant to smell. Trudie patted it like a dog as we passed and did not slow down.

Then a growl rolled out of the kitchen, and the door slammed open, and there were ears. Actual pointed furry ears. Impossibly sharp teeth. A white chef's jacket straining against a body that looked like it could bench a truck and then eat it, and a long furry tail that lashed about behind her.

"You," she growled, jabbing a wooden spoon my way. "Late again! What's your excuse this time, Causey?"`,
    choices: kitchenAct
  });
  add({
    id: "d_lobby_desk",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    text: `The register was open. Names that flickered if you looked too long. I didn't get a proper look. She didn't let me.

Then a growl rolled out of the kitchen, and the door slammed open, and there were ears, and teeth, and a tail, and a wooden spoon pointed at my chest like a warrant.

"You. Late again! What's your excuse this time, Causey?"

What the actual fucking fuckery fuck? Was I still asleep?`,
    choices: kitchenAct
  });
  add({
    id: "d_brig",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    time: "morning",
    text: `"Trudie! If that waste-of-skin handyman is late again I'm going to spank his ass myself!"

The kitchen door slammed open. Pointed furry ears, impossibly sharp teeth, a white chef's jacket straining against a body that looked like it could bench a truck and then eat it, and a long furry tail that lashed about behind her.

"You," she growled, jabbing a wooden spoon my way. "Late again! What's your excuse this time, Causey?"

What the actual fucking fuckery fuck? Was I still asleep?`,
    choices: [
      go("d_brig_stove", "The stove. That's a job I understand."),
      go("d_brig_chop", "Take the cutting board."),
      go("d_brig_stare", "Stand there. Process the ears.")
    ]
  });
  add({
    id: "d_brig_stove",
    location: "Kitchen",
    art: "/art/brig-stove.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    text: `Ancient cast iron, all covered in dials and pipes older than God. Flames flickering between honest orange and something sicky greeny-black. Smelled like burning herbs and rot. My hands went to work without asking me, which was either competence or the hotel wearing me like a glove.

She shoved a bowl at me without warning. The one without the chip. Warm, rich, a spice kick that almost cleared the hangover. "She saved you the good bowl," Trudie whispered. "It was the nearest bowl!" I ate. I didn't argue. "Funny," Brig said. "You say that every few days. Then you go back to fixing things like nothing happened."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: () => kitchenOut({
      journal: 1,
      addRule: "The stove weeps at the third fitting. Wards run hot."
    })
  });
  add({
    id: "d_brig_chop",
    location: "Kitchen",
    art: "/art/brig-stove.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    text: `"Chop chop. Uniformly. Uneven dice and I'm using your fingers for stock." I fixed pipes. I did not, as a matter of course, dice onions for a woman with a tail. Trudie plucked the knife away with a wink. "What she actually wants is the stove."

I did the stove anyway. She shoved the unchipped bowl at me and I ate, because the stew smelled stupidly good and I looked like shit. "Funny. You say you don't know what you're doing here every few days. Then you go back to fixing things."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: kitchenOut
  });
  add({
    id: "d_brig_stare",
    location: "Kitchen",
    art: "/art/brig-stove.jpg",
    portrait: "/art/brig.jpg",
    speaker: "jack",
    text: `"I\u2026 just woke up?" Her ears flattened. "Woken up. Right. That's just perfect." Those ears, and that tail, and the teeth, and the flames around her flaring higher than physics allowed. This wasn't a costume.

Trudie dragged me to the oven anyway. I ate. The unchipped bowl. "You say that every few days," Brig said. "Then you go back to fixing things like nothing happened."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: kitchenOut
  });
  add({
    id: "d_brig_days",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Every few days," I said. "You said I say that every few days."

Her ears went flat, the careful way. "Did I. Eat your stew, Causey." She didn't explain. I didn't make her. I have been told to drop a subject before, I reckon I know the shape of it.

I came back out into the lobby with the taste of it still in my mouth. The carpet near the far wall was still bubbling, and Trudie was pointing at it with a rag like I might have forgotten.

"If we don't get the seal down before ten, the boards go. They always go. What do you do, then? Don't say nothing. Nothing is how we got the last innkeeper."`,
    choices: () => spill({
      journal: 1,
      addRule: "You say you don't know what you're doing here. Every few days."
    })
  });
  add({
    id: "d_brig_thanks",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Thanks," I said, because the bowl had been the one without the chip and I am not entirely made of pride.

"It was the nearest bowl." Her tail said otherwise. Trudie, in the doorway, made a noise like a kettle achieving gossip.

I came back out into the lobby with the taste of stew still in my mouth. The carpet was still bubbling. Trudie had the rag ready.

"If we don't get the seal down before ten, the boards go. They always go. What do you do, then?"`,
    choices: spill
  });
  add({
    id: "d_brig_out",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `I got out before the tail decided I was seasoning. The pastel halls all looked the same. The damp smell was already getting stronger.

Trudie was pointing at the bubbling carpet with a rag like I might have forgotten.

"If we don't get the seal down before ten, the boards go. They always go. What do you do, then? Don't say nothing. Nothing is how we got the last innkeeper."`,
    choices: spill
  });
  add({
    id: "d3",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    time: "morning",
    text: (s) => {
      if (s.flags.mutSpillHelped && s.loop >= 2) {
        return `I came back out into the lobby with the taste of stew still in my mouth. Trudie was already on her knees, delighted and faintly see-through. "You're early! I think it likes you today."

The rag, again.`;
      }
      if (s.flags.mutSpillIgnored && s.loop >= 2) {
        return `The carpet had a mouth today. She was already running. "Don't just stand there, Jack! I told you yesterday\u2026 wait, did I?"`;
      }
      return `I came back out into the lobby with the taste of stew still in my mouth. The carpet near the far wall was still bubbling, and Trudie was pointing at it with a rag like I might have forgotten.

"If we don't get the seal down before ten, the boards go. They always go. What do you do, then? Don't say nothing. Nothing is how we got the last innkeeper."`;
    },
    choices: [
      go("d3_mop", "Get on your knees and help"),
      go("d3_watch", "Stand back. Let her finish."),
      go("d3_chaos", "Pull her off the carpet")
    ]
  });
  add({
    id: "d3_mop",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `I got down. The fizz died under the cloth the way a valve dies when you finally seat it. I told her she was good at this, the work, I mean, and she went a shameless rose color, the edges of her going vague like she'd stopped bothering with an outline.

The desk was empty. The plate said the innkeeper post was vacant, and I want you to pay attention to that word, because vacant is doing a lot of work.`,
    choices: (s) => desk(s, {
      set: { flagOrder: true, mutSpillHelped: true },
      trust: 1,
      addRule: "The lobby is Trudie's. Help her finish the seal."
    })
  });
  add({
    id: "d3_watch",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"Suit yourself." She went back to tight circles, and she was very good at this and very used to doing it alone, which I noticed the way I notice a hinge that's been oiled by the same hand for years. "Desk needs you. I don't."

The desk was still vacant. The boards under the east seam made a rotten little sound.`,
    choices: (s) => desk(s)
  });
  add({
    id: "d3_chaos",
    location: "Lobby",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `I pulled. She was heavier than she looked, then lighter, like water. The rag slapped the tiles. The fizz climbed. She laughed and ran for the stairs, which I guess means I had just made her morning.

The desk was still vacant. The boards were not going to wait for me to feel clever about it.`,
    choices: (s) => desk(s, {
      set: { flagChaos: true, mutSpillIgnored: true },
      addRule: "If you pull her off the seal, the boards go early."
    })
  });
  add({
    id: "d4_ledger",
    location: "Front desk",
    art: "/art/ledger.jpg",
    speaker: "jack",
    text: `Yesterday's arrivals were written in a hand that kept changing its mind. CAUSEY, JACK. Room 204. Checked in at a time that was not a time. Under it, fainter, the same name again.

The east boards were done pretending.`,
    choices: [
      go("d4_trace", "Trace the second CAUSEY"),
      go("d4_flip", "Flip back a page"),
      go("d5", "Shut it. The boards.", {
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      })
    ]
  });
  add({
    id: "d4_bell",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `I tapped it once and the sound went further than the room, which it had no business doing. Somewhere below, something answered. Trudie, without looking up: "Don't do that twice. House rule."

The east boards were done pretending.`,
    choices: [
      go("d4_what", "Ask her what answered"),
      go("d4_bell2", "Tap it again. Because I am an idiot."),
      go("d5", "Leave it. The boards.", {
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      })
    ]
  });
  add({
    id: "d4_trace",
    location: "Front desk",
    art: "/art/ledger.jpg",
    speaker: "jack",
    text: `I put my finger on the second CAUSEY. The ink was still wet. Under it, while I was watching, a third one started, thought better of it, and went faint.

I shut it. The east boards were making a sound like a wet book thinking about shutting.`,
    choices: () => boardAct({
      set: { lookedLedger: true },
      journal: 1,
      addRule: "The ledger already has your name. Repeatedly."
    })
  });
  add({
    id: "d4_flip",
    location: "Front desk",
    art: "/art/ledger.jpg",
    speaker: "jack",
    text: `I flipped back a page. Same name. Same room. A time that was not a time. The page before that was blank, which I reckon is worse.

The east boards were done pretending.`,
    choices: () => boardAct({
      set: { lookedLedger: true },
      journal: 1,
      addRule: "The ledger already has your name. Repeatedly."
    })
  });
  add({
    id: "d4_what",
    location: "Front desk",
    art: "/art/desk.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: `"What answered," I said.

"Don't," she said, still on the carpet, still not looking up. "If you make me come over there and explain the bell, the boards go while I'm being educational."

They were already going.`,
    choices: () => boardAct({
      set: { lookedBell: true },
      journal: 1,
      addRule: "Don't ring the bell twice."
    })
  });
  add({
    id: "d4_bell2",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `I tapped it again, because I am a grown man and this is a reasonable way to test a house rule.

The sound went down and didn't come back. Trudie swore, which on her is like hearing a kettle learn a new word. Something under the floor liked it. The boards made a rotten little sound that I would describe as pleased, if I wanted to have a worse afternoon.

"I told you," she said. "I always tell you."`,
    choices: () => boardAct({
      set: { lookedBell: true, flagChaos: true },
      journal: 1,
      addRule: "Don't ring the bell twice."
    })
  });
  add({
    id: "d5",
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    time: "morning",
    text: (s) => s.flags.mutSpillHelped ? `Ten o'clock arrived late, like a man who'd been asked nicely. The east boards were dark, not open. A soft place. Water and time and a bad seal, and something else I couldn't account for yet.` : `The board went with a sound like a wet book shutting. A hole the width of a dinner plate. Cold air with a sweet edge. Trudie, very brightly: "Don't go down. That's not on today."`,
    choices: [
      go("d5_patch", "Patch it. That's the job."),
      go("d5_look", "Lie down and look. Just look."),
      go("d5_leave", "Leave it. She said don't go down.")
    ]
  });
  add({
    id: "d10b",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: (s) => s.flags.lelandMet ? `"You're upright," Leland said. Feathers for sideburns. "Don't waste it asking if you're mad. You're not. The hotel is."` : `Postman's coat. Satchel. Rain that wasn't falling on him. Eyes like a bird's.

"Causey. I'm not your address. I'm the four-thirty, and I'm early. Don't ask if you're mad. You're not. The hotel is."`,
    choices: [
      go("d10b_truth", "Tell him you remember dying"),
      go("d10b_joke", "Ask if he's the manager"),
      go("d10b_ask", "Ask him what the job actually is")
    ]
  });
  add({
    id: "d10b_truth",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Good. Write it down. The paper keeps what your head drops. I go in and out. That's why I keep the days. You stay. That's why you don't, unless you make yourself someone the building can't mislay."`,
    choices: [go("d5", "The boards are going", { set: { lelandMet: true }, journal: 1 })]
  });
  add({
    id: "d10b_joke",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Manager." He tasted the word and put it back. "If there was one, you wouldn't be holding that paper. Never been an advert out for a handyman either. I'm Leland. I bring what gets through."`,
    choices: [go("d5", "The boards are going", { set: { lelandMet: true } })]
  });
  add({
    id: "d10b_ask",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"You already have the brief. Four staff. Four corners. No innkeeper. That's the hole you're standing in. Help the girl with the floor when she asks. The house likes that."`,
    choices: [
      go("d5", "The boards are going", {
        set: { lelandMet: true },
        journal: 1,
        addRule: "Four staff. Four nodes. The innkeeper post is the hole."
      })
    ]
  });
  add({
    id: "d5_patch",
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    time: "morning",
    text: `There was an offcut and two nails waiting like they'd been set out for me, which I guess is the hotel being helpful or creepy. My hands signed the inside of the patch without asking. The cold stopped coming up. Trudie whooped like I'd done a trick.

I grabbed the tools, which I reckon weren't even mine, though my hands knew them.`,
    choices: () => jobsAct({
      journal: 1,
      addRule: "Ten o'clock is the east boards. Patch them. Don't climb in."
    })
  });
  add({
    id: "d5_look",
    location: "East boards",
    art: "/art/stairs-three.jpg",
    speaker: "jack",
    time: "morning",
    text: `Like the colossal fucking idiot everyone always said I was, I got down on my elbows and looked. Silk down there, a lot of it, and a shape that might have been a boy once if boys came with too many hours in them. A click, then another. I got back before the fourth.

The hole stayed. The day wasn't finished. I grabbed the tools.`,
    choices: () => jobsAct({ journal: 1 })
  });
  add({
    id: "d5_leave",
    location: "East boards",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    time: "morning",
    text: `"Good boy." She said it like a joke and like it wasn't. "Ione will silk it. You go find a kettle. Or a life."

The hole stayed. The cold stayed. I had chosen not to be useful. The tools were still there, waiting, which I guess is the hotel having an opinion.`,
    choices: () => jobsAct()
  });
  add({
    id: "d_pipe",
    location: "Second floor",
    art: "/art/pipe.jpg",
    speaker: "jack",
    time: "afternoon",
    text: `The joint was sweating the way a joint does when nobody's bothered with hemp in forty years. My hands knew the fitting. My head kept insisting it had never met this pipe in its life.

I packed it. The drip stopped. The damp smell did not.

The clock struck three and the temperature dropped like someone had kicked my ass into a deep freeze. Lights flickered, and there was a dragging sound from underneath, which I did not like at all.

Black mold on the service stairwell, in patterns that almost looked like handprints. The basement door at the bottom was cracked open. A child's voice.`,
    choices: threeAct
  });
  add({
    id: "d_light",
    location: "Second floor",
    art: "/art/fixture.jpg",
    speaker: "jack",
    time: "afternoon",
    text: `The sconce was flickering between honest gold and dead, which is a mood I recognised. I tightened the contact. It held. For a minute I felt like a man who knew his job.

Then the clock struck three and the temperature dropped like someone had kicked my ass into a deep freeze. The light I'd just fixed went sick. Dragging from underneath.

Black mold on the service stairwell, like handprints. Basement door cracked. A child's voice.`,
    choices: threeAct
  });
  add({
    id: "d_kettle",
    location: "Linen cupboard",
    art: "/art/kettle.jpg",
    speaker: "jack",
    time: "afternoon",
    text: `I went looking for a kettle, or a life, the way she'd said. Found a linen cupboard and a dented copper thing that had seen better centuries. The towels were warm. I do not know why the towels were warm.

I put the kettle back. I am not, at three in the afternoon, making tea in a hotel that eats carpet.

The clock struck three anyway. Temperature dropped. Dragging from underneath. Black mold on the service stairwell, like handprints. Basement door cracked. A child's voice.`,
    choices: threeAct
  });
  add({
    id: "d9",
    location: "Service stairs",
    art: "/art/stairs-three.jpg",
    speaker: "jack",
    time: "three",
    text: `The clock struck three and the temperature dropped like someone had kicked my ass into a deep freeze. Lights flickered, and there was a dragging sound from underneath, which I did not like at all.

Black mold on the service stairwell, in patterns that almost looked like handprints. The basement door at the bottom was cracked open. A child's voice.

I could follow it. I could walk the other way. I could take the unlit stairs, on account of the bulb I hadn't got around to fixing.`,
    choices: [
      go("d9_down", "Follow the sound"),
      go("d9_away", "Walk the other way"),
      go("d9_up", "The dark stairs. Up.")
    ]
  });
  add({
    id: "d9_down",
    location: "Basement door",
    art: "/art/stayover.jpg",
    speaker: "jack",
    tone: "death",
    text: `"Stay\u2026 with us\u2026"

I had time to think that was a child, and then I had time to think that it was not, and then I didn't have time for anything except Trudie's filthy grin, which is a stupid last thought and I stand by it.`,
    death: {
      cause: "The thing in the basement.",
      rule: "The basement is not on the schedule right now."
    },
    choices: []
  });
  add({
    id: "d9_away",
    location: "Service stairs",
    art: "/art/stayover.jpg",
    speaker: "jack",
    tone: "death",
    text: `I turned on my heel and walked the other way, because following a child's voice into a basement is how men like me get a reputation.

It followed me up. Silk on the steps. Too many arms. A crying face that was not, I reckon, asking nicely.

Last thing in my mind was Trudie's grin. Then black.`,
    death: {
      cause: "The thing in the basement.",
      rule: "The basement is not on the schedule right now."
    },
    choices: []
  });
  add({
    id: "d9_up",
    location: "Service stairs",
    art: "/art/rulekeeper.jpg",
    speaker: "jack",
    tone: "death",
    text: `I put my foot on the first step because it looked like an ordinary shortcut, and I have always been a fool for ordinary shortcuts.

Somewhere above me a pen clicked. I had time to think, ah, the stairs, in the dark, that's going to turn out to be a rule, and then I didn't have time for anything else.`,
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
