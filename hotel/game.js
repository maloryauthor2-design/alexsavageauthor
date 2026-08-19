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
  var desk = (s, extra = {}) => s.loop >= 2 ? [
    go("d10b", "Talk to the postman", extra),
    go("d4_ledger", "Open the ledger anyway", extra),
    go("d5", "The boards. They won't wait.", extra)
  ] : [
    go("d4_ledger", "Open the ledger", extra),
    go("d4_bell", "Tap the bell. Once.", extra),
    go("d5", "The boards", extra)
  ];
  var jobs = (extra = {}) => [
    go("d_jobs", "Out into the halls", extra)
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
    speaker: "jack",
    time: "morning",
    text: `I hurried over and yanked it open. Out in the corridor was a young woman in a, yeah, I'm going to say it, unnecessarily slutty maid outfit. I don't mind saying that I may well have gawped a little. Especially as she looked like she'd been designed by someone with excellent taste in trouble. Her name was Trudie Crisp, at least according to the crooked name tag perched on the left of an enormous pair of tits. Blue-green hair, all the piercings in the world, a filthy grin.

Without waiting for me to say anything she reached out and grabbed my wrist with one slightly tacky hand and started dragging me down the hall. I didn't even get a chance to find wherever I'd kicked off my boots.`,
    choices: hallAct
  });
  add({
    id: "d2_listen",
    location: "Corridor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "morning",
    text: `I put my ear to the paint, because I am a grown man and this is a reasonable way to start a Tuesday. She was talking to someone who wasn't there, or to the hotel, I couldn't tell which. Something about counts. Something in the basement. A bloke on night shift she thought was rude.

Then, brightly, to the door: "I can hear you breathing, slowpoke." The handle turned anyway.

And there she was. Young woman in an unnecessarily slutty maid outfit, name tag on the left of an enormous pair of tits that said Trudie Crisp, blue-green hair, and ripples running through her like she wasn't entirely solid. She already had my wrist and she was already walking.`,
    choices: () => hallAct().map((c) => ({ ...c, set: { heardBridie: true }, journal: 1 }))
  });
  add({
    id: "d2_window",
    location: "Courtyard",
    art: "/art/courtyard.jpg",
    speaker: "jack",
    time: "morning",
    text: `The sash stuck, then gave, the way a sash does when nobody's planed three millimeters off the bottom in about forty years. I dropped into a courtyard that smelled of wet stone and something sweeter, like fruit left too long. The fountain in the middle was dry as a lie. I got four steps toward what I hoped was a front door.

"JACK CAUSEY you complete menace!"

She'd poured out after me. Young woman, unnecessarily slutty maid outfit, blue-green hair, all the piercings in the world, a filthy grin, and a crooked name tag on the left of an enormous pair of tits that said Trudie Crisp. Slightly see-through. Slightly tacky. She grabbed my wet wrist and started hauling me toward the front door like this was a perfectly normal way to start a Tuesday.`,
    choices: () => hallAct().map((c) => ({ ...c, set: { arrivedWet: true }, journal: 1 }))
  });
  add({
    id: "d_hall_listen",
    location: "Corridor",
    art: "/art/trudie-hall.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: (s) => `I let her pull me${s.flags.arrivedWet ? ", dripping, in through the front like a bad decision" : ""}. Partly because I was still trying to figure out what the hell was going on, and partly because her grip on my arm was one of the nicer sensations I'd experienced recently.

"Come on, slowpoke! Brig is already growling about breakfast and the Rulekeeper's been circling the second floor for the last hour. Up and at them!"

She didn't stop talking. I caught fragments \u2014 a rude bloke on the second floor, a woman named Ione patching tears and drinking silk tea, something called the Stayover in the basement \u2014 and I had absolutely no idea what any of it meant.`,
    choices: [
      go("d_lobby", "The lobby opened up", {
        journal: 1,
        addRule: "Rulekeeper walks the second floor. Stayover is in the basement. Ione patches tears."
      })
    ]
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
    choices: [go("d_lobby", "The lobby opened up")]
  });
  add({
    id: "d_hall_stop",
    location: "Corridor",
    art: "/art/corridor.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "jack",
    text: (s) => `"Where are we going? Which hotel is this? Why do you know my name?"

She didn't slow down. "Kitchen first, slowpoke. Brig's going to spank your ass herself if you're late, and I want to watch. Rulekeeper's on the second floor, Ione's in a mood, Stayover's acting up in the basement. You know how it is."

I did not know how it was. I knew the floral wallpaper and the damp smell${s.flags.arrivedWet ? ", and that I was leaving a wet trail across someone else's carpet" : ", and that my boots were still in 204"}.`,
    choices: [go("d_lobby", "The lobby opened up")]
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
    art: "/art/lobby.jpg",
    speaker: "jack",
    text: `The fizz had a smell under the lemon soap. Sweet. Wrong. Trudie patted it like a dog as we passed and did not slow down.

A growl rolled out of the kitchen.`,
    choices: [go("d_brig", "The kitchen door slammed open")]
  });
  add({
    id: "d_lobby_desk",
    location: "Lobby",
    art: "/art/desk.jpg",
    speaker: "jack",
    text: `The register was open. Names that flickered if you looked too long. I didn't get a proper look. She didn't let me.

A growl rolled out of the kitchen.`,
    choices: [go("d_brig", "The kitchen door slammed open")]
  });
  add({
    id: "d_brig",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    time: "morning",
    text: (s) => s.loop >= 2 ? `"Trudie! If that waste-of-skin handyman is late again I'm going to spank his ass myself!"

On schedule. The door slammed. Ears. Teeth. Wooden spoon. "You. Late again! What's your excuse this time, Causey?"` : `"Trudie! If that waste-of-skin handyman is late again I'm going to spank his ass myself!"

The kitchen door slammed open. Pointed furry ears. Impossibly sharp teeth. A white chef's jacket straining against a body that looked like it could bench a truck and then eat it. And a long furry tail that lashed about behind her.

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
    speaker: "brig",
    text: (s) => (s.loop >= 2 ? `"Wards running hot, I reckon. Third fitting down, weeping into the line." Her ears went flat, the careful way. "You've not even looked at it, Causey." The toolkit popped into my hand. I saw it arrive this time.` : `Ancient cast iron. Flames flickering between honest orange and something sicky greeny-black. Smelled like burning herbs and rot. My hands went to work without asking me, which was either competence or the hotel wearing me like a glove.`) + `

She shoved a bowl at me without warning. The one without the chip. Warm, rich, a spice kick that almost cleared the hangover. "She saved you the good bowl," Trudie whispered. "It was the nearest bowl!" I ate. I didn't argue. "Funny," Brig said. "You say that every few days. Then you go back to fixing things like nothing happened."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: [
      go("d3", "Out. The carpet she was sent to seal.", {
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
    text: `"Chop chop. Uniformly. Uneven dice and I'm using your fingers for stock." I fix pipes. I do not dice onions for a woman with a tail. Trudie plucked the knife away with a wink. "What she actually wants is the stove."

I did the stove anyway. She shoved the unchipped bowl at me and I ate, because the stew smelled stupidly good and I looked like shit. "Funny. You say you don't know what you're doing here every few days. Then you go back to fixing things."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: [go("d3", "Out. The carpet she was sent to seal.")]
  });
  add({
    id: "d_brig_stare",
    location: "Kitchen",
    art: "/art/brig-kitchen.jpg",
    portrait: "/art/brig.jpg",
    speaker: "brig",
    text: `"I\u2026 just woke up?" Her ears flattened. "Woken up. Right. That's just perfect." Those ears. That tail. The teeth. The flames around her flared higher than physics allowed. This wasn't a costume.

Trudie dragged me to the oven anyway. I ate. The unchipped bowl. "You say that every few days," Brig said. "Then you go back to fixing things like nothing happened."

"Good enough. Get out of my kitchen and go earn your fucking salary."`,
    choices: [go("d3", "Out. The carpet she was sent to seal.")]
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
    text: `I got down. The fizz died under the cloth the way a valve dies when you finally seat it. I told her she was good at this \u2014 the work, I mean \u2014 and she went a shameless rose color, the edges of her going vague like she'd stopped bothering with an outline.

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
    text: `Yesterday's arrivals were written in a hand that kept changing its mind. CAUSEY, JACK. Room 204. Checked in at a time that was not a time. Under it, fainter, the same name again. I shut it before the page could add another one while I was watching.

The east boards were done pretending.`,
    choices: (s) => [
      go("d10b", "There's a man at the desk", {
        when: (st) => st.loop >= 2,
        set: { lookedLedger: true },
        journal: 1,
        addRule: "The ledger already has your name. Repeatedly."
      }),
      go("d5", "The boards", {
        when: (st) => st.loop < 2,
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
    text: `One tap. The sound went further than the room. Somewhere below, something answered. Trudie, without looking up: "Don't do that twice. House rule."

The east boards were done pretending.`,
    choices: [
      go("d5", "The boards", {
        set: { lookedBell: true },
        journal: 1,
        addRule: "Don't ring the bell twice."
      })
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
    text: `Offcut. Two nails waiting like they'd been set out for me. My hands signed the inside of it without asking. The cold stopped coming up. Trudie whooped like I'd done a trick.`,
    choices: () => jobs({
      journal: 1,
      addRule: "Ten o'clock is the east boards. Patch them. Don't climb in."
    })
  });
  add({
    id: "d5_look",
    location: "East boards",
    art: "/art/basement.jpg",
    speaker: "jack",
    time: "morning",
    text: `Like the colossal fucking idiot everyone always said I was, I got down on my elbows. Silk. A lot of it. A shape that might have been a boy once. A click. Then another. I got back before the fourth.

The hole stayed. The day wasn't finished.`,
    choices: () => jobs({ journal: 1 })
  });
  add({
    id: "d5_leave",
    location: "East boards",
    art: "/art/lobby.jpg",
    portrait: "/art/trudie.jpg",
    speaker: "trudie",
    time: "morning",
    text: `"Good boy." Joke and not. "Ione will silk it. You go find a kettle. Or a life."

The hole stayed. The cold stayed. I had chosen not to be useful.`,
    choices: () => jobs()
  });
  add({
    id: "d_jobs",
    location: "Second floor",
    art: "/art/corridor.jpg",
    speaker: "jack",
    time: "afternoon",
    text: `I grabbed the tools, which I reckon weren't even mine, though my hands knew them, and headed out. The pastel hallways all looked the same, and the damp smell was getting much, much stronger.

I fixed a leaky pipe on pure muscle memory, then a flickering fixture on the second floor. Every one of these tasks felt familiar to my hands. My head kept screaming I'd never been here in my life.`,
    choices: [go("d9", "Then the clock struck three")]
  });
  add({
    id: "d9",
    location: "Service stairs",
    art: "/art/stairs-three.jpg",
    speaker: "jack",
    time: "three",
    text: `The clock struck three and the temperature dropped like someone had kicked my ass into a deep freeze. Lights flickered. A dragging sound from underneath.

Black mold on the service stairwell, in patterns that almost looked like handprints. The basement door at the bottom was cracked open. A child's voice.

I could follow it, like the colossal fucking idiot everyone always said I was. I could walk the other way. I could take the unlit stairs, on account of the bulb I hadn't got around to fixing.`,
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
