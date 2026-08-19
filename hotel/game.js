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
    if (c.length === 1) {
      return [
        go("d2_open", "Yank it open", extra),
        go("d2_listen", "Keep it shut. Listen first.", extra),
        go("d2_window", "The sash. Out.", extra)
      ];
    }
    return c;
  }
  var kitchen = () => [
    go("d_brig_stove", "The stove. That's a job I understand."),
    go("d_brig_chop", "Take the cutting board."),
    go("d_brig_stare", "Stand there. Process the ears.")
  ];
  var spill = (extra = {}) => [
    go("d3_mop", "Get on your knees and help", extra),
    go("d3_watch", "Stand back. Let her finish.", extra),
    go("d3_chaos", "Pull her off the carpet", extra)
  ];
  var desk = (s, extra = {}) => s.loop >= 2 ? [
    go("d10b", "Talk to the postman", extra),
    go("d4_ledger", "Open the ledger anyway", extra),
    go("d5", "The boards. They won't wait.", extra)
  ] : [
    go("d4_ledger", "Open the ledger", extra),
    go("d4_bell", "Tap the bell. Once.", extra),
    go("d5", "The boards", extra)
  ];
  var three = (extra = {}) => [
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
      if (s.loop === 1 && s.deaths === 0) {
        return `I woke up in a bed that I was pretty sure wasn't mine. And there was a work order crumpled in my hand that I'm also sure I'd never seen before. The paper felt\u2026 too real. Is that actually a thing? It was scrawled on hotel stationery, in handwriting that looked suspiciously like it might well be mine.

Fix what breaks. Don't ask questions. Then do it all again.

Fuck knows what that meant. Last clear thing was Taverners, then the Bushmills, and now a pastel nightmare that looked like it'd been decorated by someone who'd lost a sizeable bet with a color wheel.

A rapid knocking rattled the door frame.`;
      }
      if (s.loop === 2) {
        const extra = s.workOrder.length > 1 ? `

There's a new line that absolutely was not there yesterday.

${s.workOrder.slice(1).join("\n")}

Okay. Fine. So I'm leaving notes for myself following my brutal death now, am I?` : "";
        return `Same bed. Same knock. Same bloody stationery in my fist. Head clear as a Sunday morning, which is the first thing that's gone right since Taverners.${extra}

She's going to say Jack. She's going to say late. She is not, as far as I can tell, going to remember a damn thing.`;
      }
      return `I did the checks, because apparently that's who I am now. Same stain. Same knock. Work order's grown another line.${s.lastDeath ? ` Last time I ${s.lastDeath.toLowerCase()}` : ""}`;
    },
    choices: (s) => {
      const c = [];
      if (!s.flags.lookedRoom) c.push(go("d1_room", "That stain in the corner"));
      if (!s.flags.lookedSelf) c.push(go("d1_self", "Catch yourself in the mirror"));
      c.push(go("d2", "Answer the door"));
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
    text: (s) => s.loop >= 2 ? `"Jack! You're late again!"

Word for bloody word. I mouthed late along with her, half a beat behind, like karaoke to a song I hate.

"Brig's going mental. And the lobby's already trying to eat the carpet!"` : `"Jack! You're late again!"

The voice was bright, bubbly, and way too cheerful for whatever ungodly hour this was. I'd also never heard it before. But it sounded like it knew me.

"Brig's going mental. And the lobby's already trying to eat the carpet!"

The lobby's already trying to do what now?`,
    choices: [
      go("d2_open", "Yank it open"),
      go("d2_listen", "Keep it shut. Listen first."),
      go("d2_window", "The sash. Out.")
    ]
  });
  add({
    id: "d2_open",
    location: "Corridor",
    art: "/art/trudie-door.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    time: "morning",
    text: `I hurried over and yanked it open. Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin. She grabbed my wrist with one slightly tacky hand.

"Come on, slowpoke! Brig's growling, the Rulekeeper's been circling the second floor, Ione's patching tears, and the Stayover's acting up in the basement." Her ass didn't stop when she did.

Then the kitchen door slammed open. Ears. Teeth. A tail. A wooden spoon. "Late again, Causey!"`,
    choices: kitchen
  });
  add({
    id: "d2_listen",
    location: "Corridor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "morning",
    text: `I put my ear to the paint, because I am a grown man and this is a reasonable way to start a Tuesday. She was talking to someone who wasn't there. Spore counts. The Stayover in the basement. A Rulekeeper on night shift, quote, rude.

"I can hear you breathing, slowpoke." The handle turned.

Trudie Crisp. That's what the name tag said, perched on the left of an enormous pair of tits. Blue-green hair. Ripples through her like she wasn't entirely solid. She already had my wrist.

Then a growl from the kitchen, and a woman with actual furry ears jammed a spoon at my chest.`,
    choices: () => [
      go("d_brig_stove", "The stove. That's a job I understand.", { set: { heardBridie: true }, journal: 1 }),
      go("d_brig_chop", "Take the cutting board.", { set: { heardBridie: true }, journal: 1 }),
      go("d_brig_stare", "Stand there. Process the ears.", { set: { heardBridie: true }, journal: 1 })
    ]
  });
  add({
    id: "d2_window",
    location: "Courtyard",
    art: "/art/courtyard.jpg",
    speaker: "jack",
    time: "morning",
    text: `The sash stuck, then gave, the way a sash does when nobody's planed three millimeters off the bottom in forty years. I got four steps. She poured out after me.

"JACK CAUSEY you complete menace!"

Same maid outfit. Same name tag. Same tacky hand on a wet wrist. She dragged me in the front like a bad decision, talking about the Rulekeeper and Ione and the Stayover in the basement, and then a hellhound in a chef's jacket tried to take my head off with a spoon.`,
    choices: () => [
      go("d_brig_stove", "The stove. That's a job I understand.", { set: { arrivedWet: true }, journal: 1 }),
      go("d_brig_chop", "Take the cutting board.", { set: { arrivedWet: true }, journal: 1 }),
      go("d_brig_stare", "Stand there. Process the ears.", { set: { arrivedWet: true }, journal: 1 })
    ]
  });
  add({
    id: "d_brig_stove",
    location: "Kitchen",
    art: "/art/brig-stove.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: (s) => (s.loop >= 2 ? `"Wards running hot, I reckon. Third fitting down, weeping into the line." Her ears went flat, the careful way. "You've not even looked at it, Causey." The toolkit popped into my hand. I saw it arrive this time.` : `Ancient cast iron. Flames flickering between honest orange and something sicky greeny-black. Smelled like burning herbs and rot. My hands went to work without asking me, which was either competence or the hotel wearing me like a glove.`) + `

She shoved a bowl at me. The one without the chip. "Nearest bowl," she said, which I did not believe. Then a rag hit my chest and the lobby carpet was fizzing.`,
    choices: () => spill({
      journal: 1,
      addRule: "The stove weeps at the third fitting. Wards run hot."
    })
  });
  add({
    id: "d_brig_chop",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `"Chop chop. Uniformly. Uneven dice and I'm using your fingers for stock." I fix pipes. I do not dice onions for a woman with a tail. Trudie plucked the knife away with a wink. "What she actually wants is the stove."

I did the stove. She did the bowl without the chip. A rag hit my chest on the way out. The lobby carpet was bubbling like mold in fast-forward.`,
    choices: () => spill()
  });
  add({
    id: "d_brig_stare",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `"I\u2026 just woke up?" Her ears flattened. "Woken up. Right. That's just perfect." Those ears. That tail. The teeth. The flames around her flared higher than physics allowed. This wasn't a costume.

Trudie dragged me to the oven anyway. I ate. The unchipped bowl. Then the carpet, fizzing, and a rag.`,
    choices: () => spill()
  });
  add({
    id: "d3_mop",
    location: "Lobby",
    art: "/art/trudie-mop.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I got down. The fizz died under the cloth the way a valve dies when you finally seat it. A compliment about her work landed harder than one about her ass. She went a shameless rose color, and the edges of her went vague.

The desk was empty. Brass plate: INNKEEPER. Vacant. The east boards coughed.`,
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
    speaker: "trudie",
    text: `"Suit yourself." Tight circles. She was very good at this and very used to doing it alone, which I noticed in the way I notice a hinge that's been oiled by the same hand for years. "Desk needs you. I don't."

Mahogany. A flickering ledger. INNKEEPER. Vacant. The boards under the east seam made a rotten little sound.`,
    choices: (s) => desk(s)
  });
  add({
    id: "d3_chaos",
    location: "Lobby",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    text: `I pulled. She was heavier than she looked, then lighter, like water. The rag slapped the tiles. The fizz climbed. She laughed and ran for the stairs. "Two o'clock is going to be so rude."

The desk was still vacant. The boards were not going to wait for me to feel clever about it.`,
    choices: (s) => desk(s, {
      set: { flagChaos: true, mutSpillIgnored: true },
      addRule: "If you pull her off the seal, two o'clock comes hunting."
    })
  });
  add({
    id: "d4_ledger",
    location: "Front desk",
    art: "/art/ledger.jpg",
    speaker: "jack",
    text: `CAUSEY, JACK. Room 204. A time that was not a time. Under it, fainter: CAUSEY, JACK. And again. That book is trying to check me in. I shut it.

The boards had a hole in them the width of a dinner plate, or they were about to.`,
    choices: (s) => [
      go("d10b", "The postman is waiting", {
        when: (st) => st.loop >= 2,
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      }),
      go("d5_patch", "Patch the boards. That's the job.", {
        when: (st) => st.loop < 2,
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      }),
      go("d5_look", "Lie down and look through.", {
        when: (st) => st.loop < 2,
        set: { lookedLedger: true }
      }),
      go("d5_leave", "Leave the hole. She said don't go down.", {
        when: (st) => st.loop < 2,
        set: { lookedLedger: true }
      }),
      go("d5_patch", "Patch it before it gets worse", {
        when: (st) => st.loop >= 2,
        set: { lookedLedger: true }
      }),
      go("d5_look", "Look through anyway", {
        when: (st) => st.loop >= 2,
        set: { lookedLedger: true }
      })
    ]
  });
  add({
    id: "d4_bell",
    location: "Front desk",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `One tap. The sound went further than the room. Somewhere below, something answered. Trudie, without looking up: "Don't do that twice. House rule."

The east boards were done pretending.`,
    choices: [
      go("d5_patch", "Patch them. That's the job.", {
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      }),
      go("d5_look", "Lie down. Just look.", { set: { lookedBell: true } }),
      go("d5_leave", "Leave it. She said don't.", { set: { lookedBell: true } })
    ]
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
      go("d5_patch", "Tell him you remember dying. Then patch the floor.", {
        set: { lelandMet: true },
        journal: 1
      }),
      go("d5_look", "Ask if he's the manager. Then look down the hole.", { set: { lelandMet: true } }),
      go("d5_leave", "Ask what the job is. Then leave the boards.", {
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
    time: "three",
    text: `Offcut. Two nails waiting like they'd been set out for me. My hands signed the inside of it without asking. The cold stopped coming up.

I fixed a leaky pipe on muscle memory, then a flickering fixture. The clock struck three. Temperature dropped like someone had kicked me into a deep freeze. Dragging, underneath. Mold like handprints. A child's voice.`,
    choices: () => three({
      journal: 1,
      addRule: "Ten o'clock is the east boards. Patch them. Don't climb in."
    })
  });
  add({
    id: "d5_look",
    location: "East boards",
    art: "/art/basement.jpg",
    speaker: "jack",
    time: "three",
    text: `Like the colossal fucking idiot everyone always said I was, I got down on my elbows. Silk. A lot of it. A shape that might have been a boy once. A click. Then another. I got back before the fourth.

Pipe. Light. Three o'clock. The basement door was cracked open. Something down there was breathing on a schedule.`,
    choices: () => three({ journal: 1 })
  });
  add({
    id: "d5_leave",
    location: "East boards",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    time: "three",
    text: `"Good boy." Joke and not. "Ione will silk it. You go find a kettle. Or a life."

I found a pipe instead, and a light, and then three o'clock found me. Dragging. Mold. A child's voice from a door that should have been shut.`,
    choices: () => three()
  });
  add({
    id: "d9_down",
    location: "Basement door",
    art: "/art/stayover.jpg",
    speaker: "jack",
    tone: "death",
    text: `"Stay\u2026 with us\u2026"

Something pale and wrong lunged. Far too many arms. A crying child's face.

I died. Last thing in my mind was Trudie's filthy grin. Then black.`,
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
    text: `I turned on my heel and walked the other way, because I can take an instruction off my own handwriting when it's offered. The unlit stairs were still there. I put my hand on the rail. A pen clicked.

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
