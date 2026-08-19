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
        return `I woke up in a bed that I was pretty sure wasn't mine. A work order was crumpled in my fist. Hotel stationery. Handwriting that looked suspiciously like mine.

Fix what breaks. Don't ask questions. Then do it all again.

Last thing I had clear was Taverners, then the Bushmills. Now this pastel nightmare. A rapid knocking rattled the door frame.`;
      }
      if (s.loop === 2) {
        const extra = s.workOrder.length > 1 ? `

New line on the paper:
${s.workOrder.slice(1).join("\n")}

Okay. Fine. So I'm leaving notes for myself now.` : "";
        return `Same bed. Same knock. Head clear as a Sunday morning.${extra}

She's going to say Jack. She's going to say late. She is not going to remember a damn thing.`;
      }
      return `I did the checks, because apparently that's who I am now. Same stain. Same knock. Work order's grown another line.${s.lastDeath ? ` Last time: ${s.lastDeath.toLowerCase()}` : ""}`;
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedRoom) c.push(go("d1_room", "Look at the room properly"));
      if (!s.flags.lookedOrder) c.push(go("d1_order", "Read the work order"));
      if (!s.flags.lookedSelf) c.push(go("d1_self", "Check the state of yourself"));
      c.push(go("d2", "Get up. Deal with the door."));
      return c;
    }
  });
  add({
    id: "d1_room",
    location: "Room 204",
    art: "/art/room-stain.jpg",
    speaker: "jack",
    text: `Damp bloom in the corner. About a foot across. No run, no tail. Rising, then. Something behind the plaster being all patient about it.`,
    choices: [go("d2", "The knocking hasn't stopped", { set: { lookedRoom: true }, journal: 1 })]
  });
  add({
    id: "d1_order",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.workOrder.length === 1 ? `Fix what breaks. Don't ask questions. Then do it all again.

If this is a callout, it's the worst brief I've ever been given.` : s.workOrder.map((line, i) => `${i + 1}. ${line}`).join("\n"),
    choices: [go("d2", "She's still knocking", { set: { lookedOrder: true }, journal: 1 })]
  });
  add({
    id: "d1_self",
    location: "Room 204",
    art: "/art/mirror.jpg",
    speaker: "jack",
    text: `Jesus Frederico Christ. Hair in every direction. A week's stubble overnight. Eyes like I hadn't slept in a month. The woman knocking did not seem bothered.`,
    choices: [go("d2", "Door.", { set: { lookedSelf: true }, journal: 1 })]
  });
  add({
    id: "d2",
    location: "Room 204",
    art: "/art/room.jpg",
    speaker: "jack",
    text: (s) => s.loop >= 2 ? `"Jack! You're late again!"

Word for bloody word. I mouthed late along with her.

"Brig's going mental. And the lobby's already trying to eat the carpet!"` : `"Jack! You're late again!"

Bright. Bubbly. Way too cheerful. I'd never heard it before. It sounded like it knew me.

"Brig's going mental. And the lobby's already trying to eat the carpet!"

The lobby's already trying to do what now?`,
    choices: [
      go("d2_open", "Yank it open"),
      go("d2_listen", "Keep it shut. Listen."),
      go("d2_window", "The sash. Out.")
    ]
  });
  add({
    id: "d2_open",
    location: "Corridor",
    art: "/art/trudie-door.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I yanked it open. Young woman. Unnecessarily slutty maid outfit. Crooked name tag on the left of an enormous pair of tits: Trudie Crisp. Blue-green hair. All the piercings in the world. A filthy grin.

She grabbed my wrist. Slightly tacky.`,
    choices: [go("d2_out", "She has you")]
  });
  add({
    id: "d2_listen",
    location: "Corridor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `Ear to the paint. She was talking to someone who wasn't there. Spore counts. The Stayover in the basement. A Rulekeeper on night shift, quote, rude.

"I can hear you breathing, slowpoke."

The handle turned anyway.`,
    choices: [go("d2_out", "She's coming in", { set: { heardBridie: true }, journal: 1 })]
  });
  add({
    id: "d2_window",
    location: "Courtyard",
    art: "/art/courtyard.jpg",
    speaker: "jack",
    text: `The sash stuck, then gave. Courtyard. Wet stone. A fountain dry as a lie. I got four steps.

"JACK CAUSEY you complete menace!"

She'd poured out after me.`,
    choices: [go("d2_out", "She's got you anyway", { set: { arrivedWet: true }, journal: 1 })]
  });
  add({
    id: "d2_out",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: (s) => `Trudie Crisp. That was the name. Wrist in her tacky hand${s.flags.arrivedWet ? ", and I was dripping" : ""}. Translucent ripples running through her as if she wasn't entirely solid.

"Come on, slowpoke! Brig's growling, the Rulekeeper's been circling the second floor, Ione's patching tears and drinking silk tea, and the Stayover's acting up in the basement. Up and at them!"

Her ass didn't stop when she did. It carried on a half-second, like water in a glass. Pretty fucking hypnotic.

A growl rolled out of the kitchen.`,
    choices: [
      go("d_brig", "The kitchen", {
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
    text: (s) => s.loop >= 2 ? `"You. Late again! What's your excuse this time, handyman?"

Ears. Teeth. Wooden spoon. I could tell her about the stove before I'd looked at it.` : `"Trudie! If that waste-of-skin handyman is late again I'm going to spank his ass myself!"

The door slammed open. Pointed furry ears. Impossibly sharp teeth. A white jacket straining. A long tail lashing.

"You. Late again! What's your excuse this time, Causey?"

What the actual fucking fuckery fuck?`,
    choices: [
      go("d_brig_stove", "The stove. That's a job."),
      go("d_brig_chop", "Take the cutting board."),
      go("d_brig_stare", "Just stand there. Process the ears.")
    ]
  });
  add({
    id: "d_brig_stove",
    location: "Kitchen",
    art: "/art/brig-stove.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: (s) => s.loop >= 2 ? `"Wards running hot. Third fitting down, weeping into the line. I can have that sorted."

Her ears went flat. The careful way.

"You've not even looked at it, Causey."

The toolkit popped into my hand. I saw it arrive this time.` : `Ancient cast iron. Flames going sickly greeny-black under the orange. Smelled like burning herbs and rot. My hands went to work without asking me.`,
    choices: [
      go("d_brig_out", "Let the hands finish", {
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
    text: `"Chop chop. Uniformly. Uneven dice and I'm using your fingers for stock."

I fix pipes. I do not dice onions for a woman with a tail.

Trudie plucked the knife away. "What she actually wants is the stove."`,
    choices: [go("d_brig_out", "Right. The stove.")]
  });
  add({
    id: "d_brig_stare",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `"I\u2026 just woke up?"

Her ears flattened. "Woken up. Right. That's just perfect."

Those ears. That tail. The teeth. The flames around her flared higher than physics allowed. This wasn't a costume.`,
    choices: [go("d_brig_out", "Do the stove. Don't argue.")]
  });
  add({
    id: "d_brig_out",
    location: "Kitchen",
    art: "/art/brig-bowl.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `She shoved a bowl at me. The one without the chip. Warm. A spice kick that almost cleared the hangover.

"She saved you the good bowl," Trudie whispered.

"It was the nearest bowl!"

"Good enough. Get out of my kitchen and go earn your fucking salary." Trudie was already being pointed at the lobby with a rag.`,
    choices: [go("d3", "Follow the rag")]
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
        return `"You're early!" She looked up, delighted and faintly see-through. "I think it likes you today."

The rag, again.`;
      }
      if (s.flags.mutSpillIgnored && s.loop >= 2) {
        return `The carpet had a mouth today. She was already running.

"Don't just stand there, Jack! I told you yesterday\u2026 wait, did I?"`;
      }
      return `"Look!" She patted the fizzing carpet like a badly behaved dog. "If we don't get the seal down before ten, the boards go. They always go."

A rag hit my chest. Tacky fingers.`;
    },
    choices: [
      go("d3_mop", "Get down and help"),
      go("d3_watch", "Stand back. Let her finish."),
      go("d3_chaos", "Pull her off the carpet")
    ]
  });
  add({
    id: "d3_mop",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `The fizz died under the cloth the way a valve dies when you finally seat it.

A compliment about her work landed harder than one about her ass. She went a shameless rose color. The edges of her went vague.

"See? Useful. Brig said plumber. I said menace. We can both be right."`,
    choices: [
      go("d3_out", "The desk is empty", {
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
    text: `"Suit yourself." Tight circles. She'd been doing this alone for a long time.

"Desk needs you. I don't. Not this morning."`,
    choices: [go("d3_out", "The desk, then")]
  });
  add({
    id: "d3_chaos",
    location: "Lobby",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I pulled. She was heavier than she looked, then lighter, like water.

The rag slapped the tiles. The fizz climbed. She laughed and ran for the stairs.

"Two o'clock is going to be so rude."`,
    choices: [
      go("d3_out", "Well. That's done.", {
        set: { flagChaos: true, mutSpillIgnored: true },
        addRule: "If you pull her off the seal, two o'clock comes hunting."
      })
    ]
  });
  add({
    id: "d3_out",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `Mahogany. A bell. A ledger with names that flickered. A brass plate: INNKEEPER. Vacant.

The east boards gave a small, rotten cough.`,
    choices: (s) => [
      go("d10b", "There's a man here who wasn't", { when: (st) => st.loop >= 2 }),
      go("d4", "Have a look before the floor goes", { when: (st) => st.loop < 2 })
    ]
  });
  add({
    id: "d4",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `The plate had been polished by a lot of thumbs. The pen was still wet. I didn't sign.

I could open the book. I could tap the bell once. Or I could do the job the floor was asking for.`,
    choices: [
      go("d4_ledger", "Open the ledger"),
      go("d4_bell", "Tap the bell. Once."),
      go("d5", "The boards")
    ]
  });
  add({
    id: "d4_ledger",
    location: "Front desk",
    art: "/art/ledger.jpg",
    speaker: "jack",
    text: `CAUSEY, JACK. Room 204. A time that was not a time. Under it, fainter: CAUSEY, JACK. And again.

That book is trying to check me in. I shut it.`,
    choices: [
      go("d5", "The boards", {
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
    text: `One tap. The sound went further than the room. Somewhere below, something answered.

Trudie, without looking up: "Don't do that twice."`,
    choices: [
      go("d5", "Hands off. Boards.", {
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
    text: (s) => s.flags.lelandMet ? `"You're upright," Leland said. Feathers for sideburns. "Don't waste it asking if you're mad. You're not. The hotel is."` : `Postman's coat. Satchel. Rain that wasn't falling on him. Eyes like a bird's.

"Causey. I'm not your address. I'm the four-thirty, and I'm early. Don't ask if you're mad. You're not. The hotel is."`,
    choices: [
      go("d10b_truth", "Tell him you remember dying"),
      go("d10b_joke", "Ask if he's the manager"),
      go("d10b_ask", "Ask him what the job is")
    ]
  });
  add({
    id: "d10b_truth",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Good. Write it down. The paper keeps what your head drops. I go in and out. That's why I keep the days. You stay."`,
    choices: [go("d10b_out", "Take that", { set: { lelandMet: true }, journal: 1 })]
  });
  add({
    id: "d10b_joke",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"Manager." He put the word back. "Never been an advert out for a handyman. Not one. I'm Leland. I bring what gets through."`,
    choices: [go("d10b_out", "Fair", { set: { lelandMet: true } })]
  });
  add({
    id: "d10b_ask",
    location: "Front desk",
    art: "/art/leland.jpg",
    portrait: "/art/leland.jpg",
    speaker: "leland",
    text: `"You already have the brief. Four staff. Four corners. No innkeeper. That's the hole you're standing in. Help the girl with the floor. The house likes that."`,
    choices: [
      go("d10b_out", "Four corners.", {
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
    text: `He was already going. The boards chose that moment to give up the pretence of being wood.`,
    choices: [go("d5", "The hole")]
  });
  add({
    id: "d5",
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    time: "morning",
    text: (s) => s.flags.mutSpillHelped ? `Ten o'clock arrived late. The east boards were dark, not open. A soft place. Water, time, and a bad seal. And something else.` : `The board went like a wet book shutting. A hole the width of a dinner plate. Cold air with a sweet edge.

Trudie, brightly: "Don't go down. That's not on today."`,
    choices: [
      go("d5_patch", "Patch it. That's the job."),
      go("d5_look", "Lie down. Just look."),
      go("d5_leave", "Leave it. She said don't.")
    ]
  });
  add({
    id: "d5_patch",
    location: "East boards",
    art: "/art/boards.jpg",
    speaker: "jack",
    text: `Offcut. Two nails waiting like they'd been set out for me. My hands signed the inside of it without asking.

The cold stopped coming up. Trudie whooped like I'd done a trick.`,
    choices: [
      go("d5_out", "On to the next leak", {
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
    text: `Down there: silk. A lot of it. A shape that might have been a boy once.

A click. Then another. Closer. I got back before the fourth.`,
    choices: [go("d5_out", "Never again uninvited", { journal: 1 })]
  });
  add({
    id: "d5_leave",
    location: "East boards",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `"Good boy." Joke and not. "Ione will silk it. You go find a kettle. Or a life."

The hole stayed. The cold stayed.`,
    choices: [go("d5_out", "There's still a pipe")]
  });
  add({
    id: "d5_out",
    location: "Second floor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    text: `I fixed a leaky pipe on muscle memory. Then a flickering fixture. My hands knew this hotel. My head had never been here.

The clock struck three. The temperature dropped like someone had kicked me into a deep freeze.`,
    choices: [go("d9", "The dragging sound", { time: "three" })]
  });
  add({
    id: "d9",
    location: "Service stairs",
    art: "/art/stairs-three.jpg",
    speaker: "jack",
    time: "three",
    text: `Lights flickered. A dragging sound below. Mold on the walls like handprints. The basement door cracked open. A child's voice.

I could follow it. I could walk the other way. I could take the unlit stairs, on account of the bulb I hadn't fixed.`,
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

Something pale. Too many arms. A crying child's face.

I died. Last thing was Trudie's grin. Then black.`,
    death: {
      cause: "The thing in the basement.",
      rule: "The basement is not on the schedule right now."
    },
    choices: []
  });
  add({
    id: "d9_away",
    location: "Service stairs",
    art: "/art/rulekeeper.jpg",
    speaker: "jack",
    tone: "death",
    text: `I walked the other way. The unlit stairs were still there. I put my hand on the rail.

A pen clicked.

Fine. Now I knew.`,
    death: {
      cause: "The stairs. In the dark.",
      rule: "No stairs in the dark."
    },
    choices: []
  });
  add({
    id: "d9_up",
    location: "Service stairs",
    art: "/art/rulekeeper.jpg",
    speaker: "jack",
    tone: "death",
    text: `First step. A pen click. A long coat. A clipboard. Distilled disappointment.

"Ah," I said. "The stairs. In the dark."

I died. Quicker than the last one.`,
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
