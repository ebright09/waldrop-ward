
import { Scenario, VisualTraits, PropType } from '../types';
import { COLORS } from '../constants';

// Helper to get random traits
const getRandomTraits = (): VisualTraits => ({
  skinColor: COLORS.SKIN_TONES[Math.floor(Math.random() * COLORS.SKIN_TONES.length)],
  hairColor: COLORS.HAIR_COLORS[Math.floor(Math.random() * COLORS.HAIR_COLORS.length)],
});

// --- THE BESPOKE PATIENT DATABASE (20 BASE ARCHETYPES) ---
const BASE_ARCHETYPES: Omit<Scenario, 'id'>[] = [
  {
    title: "The Influencer",
    narrative: "She has constructed a full production studio in the delivery room, complete with three soft-boxes and a boom mic. She is currently live-streaming to Twitch and asking chat to vote on whether she should push or wait for Prime Time engagement metrics. The chat is spamming 'L'.",
    complaint: "Excuuuuse me? You are physically blocking the Ring Light 3000 and my lighting looks homophobic. Move your bald head or I will dox you to my 1.2 million followers immediately.",
    propType: 'RING_LIGHT',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#E6CEA8' },
    options: [
      {
        id: 'inf_1',
        label: "Production Assistant",
        actionText: "PRODUCING",
        risk: 'Low',
        description: "Accept your fate as a PA. Hold the silver reflector to bounce light onto her pores and instruct her to push during the Raid Shadow Legends ad read.",
        successDetail: "The baby slid out during the sponsored segment. The stream hit the front page of Reddit. You have been tipped 5000 bits.",
        failureDetail: "You dropped the reflector and ruined the white balance. She is suing for 'loss of face' and her stans are currently reviewing bombing your practice."
      },
      {
        id: 'inf_2',
        label: "Yeet the iPhone",
        actionText: "CENSORING",
        risk: 'Medium',
        description: "Scream 'HIPAA VIOLATION', snatch that phone out of the tripod, and yeet it directly into the biohazard bin before she leaks your bald spot to the internet.",
        successDetail: "The phone shattered into a million pieces. She screamed in horror. The baby was born while she was distracted by the loss of clout.",
        failureDetail: "She bit your hand like a feral raccoon. The chat clipped it. You are now a meme called 'The Baby Snatcher' and have a KnowYourMeme page.",
      },
      {
        id: 'inf_3',
        label: "Sell Out",
        actionText: "MONETIZING",
        risk: 'High',
        description: "Agree to wear a branded 'NordVPN' surgical cap and shout 'SMASH THAT LIKE BUTTON' at the top of your lungs as the head crowns.",
        successDetail: "Stream hit 5M views. The baby is technically sponsored by a VPN service. You got a 10% cut of the ad revenue.",
        failureDetail: "You forgot the promo code. She screams 'SCAM' at the top of your lungs and kicks you in the throat. The baby is demonetized."
      }
    ]
  },
  {
    title: "The Crypto Husband",
    narrative: "The patient is actually doing fine, but her husband has set up a massive server rack in the corner to 'offset the hospital bill'. The room is 95 degrees and sounds like a jet engine taking off.",
    complaint: "Babe, hold it in! The hash rate is dropping! Dr. Waldrop, do you accept DogeCoin? If we time the birth with the block halving, we're rich!",
    propType: 'SERVERS',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#3B3024' },
    options: [
      {
        id: 'cry_1',
        label: "Unplug the Rig",
        actionText: "SABOTAGING",
        risk: 'Medium',
        description: "Trip 'accidentally' over the heavy duty power cord of that godforsaken mining rig and feign total ignorance when the fans die.",
        successDetail: "Silence falls over the room. It cools down instantly. He cries about his 'portfolio', but the baby is born safe and sound.",
        failureDetail: "You unplugged the life support monitor instead. Just kidding, but you corrupted his hard drive. He is screaming about 'cold storage' and lawyers."
      },
      {
        id: 'cry_2',
        label: "Mint the Baby",
        actionText: "TOKENIZING",
        risk: 'High',
        description: "Offer to mint the baby's footprint as a unique NFT on the Ethereum network to pay for the epidural gas fees.",
        successDetail: "He loves it. He creates a 'BabyDAO' immediately. The delivery is fully funded by Venture Capitalists in Silicon Valley.",
        failureDetail: "Gas fees were too high. The transaction failed. He blames you for the bear market and refuses to sign the birth certificate."
      },
      {
        id: 'cry_3',
        label: "Reality Check",
        actionText: "EDUCATING",
        risk: 'Low',
        description: "Tell him to shut the hell up about fiat currency or you will have security escort him to the nearest ATM to pay in cash.",
        successDetail: "He cowers before your centralized authority. The baby is delivered peacefully while he sulks about decentralization.",
        failureDetail: "He starts mansplaining the gold standard to the nurses. You get a migraine so severe you drop the forceps."
      }
    ]
  },
  {
    title: "The Sneakerhead",
    narrative: "He refuses to wear the hospital mandated shoe covers because they 'mess up the silhouette' of his rare Travis Scott Jordans. He has stacked boxes of shoes near the stirrups.",
    complaint: "Yo, watch the drip! Do NOT get amniotic fluid on the toe box, these are resale only! If you crease them, I sue!",
    propType: 'SNEAKERS',
    patientTraits: { skinColor: '#8d5524', hairColor: '#090806' },
    options: [
      {
        id: 'snk_1',
        label: "Respect the Drip",
        actionText: "ACROBATICS",
        risk: 'Low',
        description: "Contort your body into a pretzel to deliver the baby without splashing a single drop of fluid near his precious suede uppers.",
        successDetail: "A gravity-defying delivery. The Jordans remain pristine. He tips you in a pair of Yeezy slides that are two sizes too small.",
        failureDetail: "Your knee buckled under the pressure. You splashed fluid directly on the left shoe. He tackles you mid-delivery."
      },
      {
        id: 'snk_2',
        label: "Ruined Kicks",
        actionText: "SABOTAGE",
        risk: 'High',
        description: "Look him in the eye and 'accidentally' kick over the iodine bucket directly onto the suede uppers of both shoes.",
        successDetail: "He leaves the room crying to clean them. The mother is visibly relieved. Easy delivery without the hype beast.",
        failureDetail: "He pulls a knife... wait, no, he just cries louder. He files a massive malpractice claim for emotional distress to his footwear."
      },
      {
        id: 'snk_3',
        label: "Eject Him",
        actionText: "EJECTING",
        risk: 'Medium',
        description: "Tell him the shoes are a biological hazard and he needs to wait in the parking lot if he wants to keep them fresh.",
        successDetail: "He leaves immediately to protect the investment. Good riddance. The nurses applaud.",
        failureDetail: "He refuses to leave. You call security. The baby crowns while you are arguing about the resale value of Nike Dunks."
      }
    ]
  },
  {
    title: "The Goth",
    narrative: "She has surrounded the hospital bed with black candles and drawn a pentagram in chalk on the floor. She is refusing the epidural because 'pain makes me feel alive'.",
    complaint: "Turn off the lights. The fluorescent hum disturbs the spirits. Does this hospital gown come in black? Or velvet?",
    propType: 'CANDLES',
    patientTraits: { skinColor: '#f7fafc', hairColor: '#090806' },
    options: [
      {
        id: 'goth_1',
        label: "Embrace Darkness",
        actionText: "VIBING",
        risk: 'Low',
        description: "Dim the lights, light a cigarette (metaphorically), and agree to deliver this antichrist in total darkness to respect the aesthetic.",
        successDetail: "The baby emerged in total silence, wearing eyeliner. It was metal as f*ck. The mother smirked.",
        failureDetail: "You couldn't see sh*t. You accidentally stitched the mother to the bedsheet. The lawsuit will be goth."
      },
      {
        id: 'goth_2',
        label: "Exorcism",
        actionText: "BLESSING",
        risk: 'High',
        description: "Spray her with holy water (it's just saline) and shout 'THE POWER OF CHRIST COMPELS YOU!' to force the baby out.",
        successDetail: "She loved the drama of it all. She pushed out of pure spite. The baby is safe and unpossessed.",
        failureDetail: "She hexed you. You tripped and fell face first into the placenta bucket. You are now cursed forever."
      },
      {
        id: 'goth_3',
        label: "Floodlights",
        actionText: "BLINDING",
        risk: 'Medium',
        description: "Ignore her requests and bring in the high-intensity surgery floodlights. Sunlight is the best disinfectant.",
        successDetail: "She hissed like a vampire exposed to the sun, but the visibility allowed for a textbook delivery.",
        failureDetail: "The candles ignited the oxygen tank. The fire alarm soaked everyone. The goth makeup is running everywhere."
      }
    ]
  },
  {
    title: "The CrossFit Cultist",
    narrative: "She is doing lunges between contractions. She wants the birth time recorded as a 'PR' and asks if the baby counts as a weighted vest.",
    complaint: "3... 2... 1... REP! Doc, your form is terrible. Engage your glutes when you catch! No days off!",
    propType: 'KETTLEBELLS',
    patientTraits: { skinColor: '#c68642', hairColor: '#E6CEA8' },
    options: [
      {
        id: 'gym_1',
        label: "Be the Coach",
        actionText: "SPOTTING",
        risk: 'Low',
        description: "Adopt the persona of a personal trainer. Scream 'LIGHT WEIGHT BABY' and 'YEAH BUDDY' until the oxytocin kicks in.",
        successDetail: "She PR'd her dilation. The baby shot out like a medicine ball. A new gym record.",
        failureDetail: "She tried to clean-and-jerk the stirrups and tore a ligament. You are banned from her box."
      },
      {
        id: 'gym_2',
        label: "Sedate Her",
        actionText: "RESTING",
        risk: 'Medium',
        description: "Tell her it's a mandatory 'Rest Day' for recovery and inject the epidural while she is distracted by protein powder.",
        successDetail: "She passed out immediately. The room is quiet. An easy delivery for everyone involved.",
        failureDetail: "She fought the sedative. She went 'Beast Mode' and kicked you across the room. It hurt."
      },
      {
        id: 'gym_3',
        label: "Compete",
        actionText: "FLEXING",
        risk: 'High',
        description: "Rip off your scrubs to reveal your own abs and challenge her to a burpee contest mid-labor.",
        successDetail: "She respected your gains. She pushed with perfect form to avoid losing to you.",
        failureDetail: "You threw out your back on the first burpee. The nurses are laughing at you. You are weak."
      }
    ]
  },
  {
    title: "The Essential Oil Mom",
    narrative: "She is diffusing Thieves Oil which is actively burning your retinas. Her birth plan forbids 'negative energy', 'toxins', and valid medical degrees.",
    complaint: "I don't need Pitocin, I need Lavender! Do you have organic, non-GMO, cold-pressed Lavender?! Keep your pharma-poison away!",
    propType: 'ESSENTIAL_OILS',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#A9A9A9' },
    options: [
      {
        id: 'oil_1',
        label: "The Placebo",
        actionText: "LYING",
        risk: 'Low',
        description: "Give her a sugar pill and tell her it is ancient Himalayan moon dust that aligns the uterus.",
        successDetail: "She felt the 'energy shift' immediately. Baby born. The smell remains terrible, but the job is done.",
        failureDetail: "She tasted the sugar. She knows. She is chanting a curse on your bloodline."
      },
      {
        id: 'oil_2',
        label: "Confiscate",
        actionText: "CONFISCATING",
        risk: 'Medium',
        description: "Grab that stinking diffuser and throw it out the window, citing a made-up 'Fire Hazard' regulation.",
        successDetail: "Fresh air fills the room. Her aura is ruined, but the baby is breathing oxygen instead of patchouli.",
        failureDetail: "She has a backup diffuser. Peppermint this time. Your eyes are watering so bad you can't see the baby."
      },
      {
        id: 'oil_3',
        label: "Chakra Align",
        actionText: "ALIGNING",
        risk: 'High',
        description: "Claim her chakras are severely blocked and only immediate medical cooperation will unblock the Root Chakra.",
        successDetail: "The fear of having a beige aura worked. She pushed. The baby is healthy and oil-free.",
        failureDetail: "You misidentified the Root Chakra. She called you a fraud and threw a crystal at your head."
      }
    ]
  },
  {
    title: "The Flat Earther",
    narrative: "She is deeply concerned that if she pushes too hard, the baby might fall off the edge of the world. She brought a spirit level for the bed.",
    complaint: "Gravity is just buoyancy! Keep the bed level or he'll slide off the firmament! NASA lies!",
    propType: 'NONE',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#3B3024' },
    options: [
      {
        id: 'flat_1',
        label: "Validate",
        actionText: "AGREEING",
        risk: 'Low',
        description: "Agree that the earth is a disk and tilt the bed slightly to 'counteract the dome refraction'.",
        successDetail: "She appreciated your scientific accuracy. The baby was born safely on the plane of existence.",
        failureDetail: "You tilted the bed too far. She slid off. Gravity worked ironically."
      },
      {
        id: 'flat_2',
        label: "Spin Globe",
        actionText: "SPINNING",
        risk: 'High',
        description: "Bring in a school globe and spin it aggressively in front of her face to assert dominance.",
        successDetail: "She got dizzy watching it. Forgot to be crazy for a minute. Delivered successfully.",
        failureDetail: "She screamed 'CGI!' and punched the globe across the room. It hit a nurse."
      },
      {
        id: 'flat_3',
        label: "Ice Wall",
        actionText: "FREEZING",
        risk: 'Medium',
        description: "Tell her the baby is approaching the Ice Wall (cervix) and needs a passport to cross.",
        successDetail: "She produced a sovereign citizen ID card. It worked. The baby crossed the border.",
        failureDetail: "She refused to cross the Ice Wall without a UN treaty. Labor stalled."
      }
    ]
  },
  {
    title: "The WebMD Warrior",
    narrative: "She has diagnosed herself with 14 tropical diseases despite never leaving Ohio. She is reading the Wikipedia 'C-Section' page to correct your technique.",
    complaint: "According to this forum post from 2009, you're holding the forceps wrong. My symptoms indicate Dengue Fever.",
    propType: 'SERVERS',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#A9A9A9' },
    options: [
      {
        id: 'web_1',
        label: "Out-Jargon",
        actionText: "CONFUSING",
        risk: 'Low',
        description: "Invent a condition called 'Hyper-Cranial-Rotation' and tell her only you know the cure.",
        successDetail: "It wasn't on Google, so she had to trust you out of fear. Delivered successfully.",
        failureDetail: "She found out you lied. She is currently live-tweeting your malpractice suit."
      },
      {
        id: 'web_2',
        label: "Throw Phone",
        actionText: "DISCONNECTING",
        risk: 'Medium',
        description: "Grab her phone and toss it in the biohazard bin. 'Oops, it was slippery'.",
        successDetail: "Reverted to factory settings. Normal birth ensued without 5G interference.",
        failureDetail: "It was an iPhone 15 Pro. You owe her $1200 and she is suing you."
      },
      {
        id: 'web_3',
        label: "Debate",
        actionText: "DEBATING",
        risk: 'High',
        description: "Engage in a formal debate: Her forum post vs your medical degree. Winner takes the baby.",
        successDetail: "You destroyed her with logic. She cried, then pushed. Baby safe.",
        failureDetail: "She cited a better source. You lost the debate. The nurses are laughing at you."
      }
    ]
  },
  {
    title: "The Trad Wife",
    narrative: "She is baking sourdough in a portable oven she brought. She wants a 'biblical birth' in a wheat field but settled for Room 304.",
    complaint: "A woman's sorrow is her duty! Does this gown come in linen? Polyester is a sin against nature.",
    propType: 'CANDLES',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#E6CEA8' },
    options: [
      {
        id: 'trad_1',
        label: "LARP",
        actionText: "LARPING",
        risk: 'Low',
        description: "Speak exclusively in Old English. Refer to the baby as 'The Harvest' and the epidural as 'Witchcraft'.",
        successDetail: "She felt connected to her ancestors. Bountiful Harvest achieved. Huzzah.",
        failureDetail: "You used the wrong century dialect. She called you a heretic and spit on you."
      },
      {
        id: 'trad_2',
        label: "Eat Bread",
        actionText: "CONSUMING",
        risk: 'Medium',
        description: "Aggressively eat her raw sourdough starter in front of her to assert modern dominance.",
        successDetail: "She was terrified of your raw power. She pushed just to escape you.",
        failureDetail: "The starter was active. You have food poisoning. You vomited on the baby."
      },
      {
        id: 'trad_3',
        label: "Kardashians",
        actionText: "DRUGGING",
        risk: 'High',
        description: "Turn the TV to 'The Kardashians' to break the spell of the homestead.",
        successDetail: "She got hooked on the drama. Forgot about the wheat field. Baby born.",
        failureDetail: "She smashed the TV with a rolling pin. Security called. Chaos."
      }
    ]
  },
  {
    title: "The CEO",
    narrative: "She is currently on a Zoom call firing her VP of Marketing. She has labeled the birth as a 'Q3 Deliverable' and is asking for a Gantt chart.",
    complaint: "I need a roadmap for dilation. Is it scalable? Let's circle back on the pain management. Ping me.",
    propType: 'SERVERS',
    patientTraits: { skinColor: '#8d5524', hairColor: '#090806' },
    options: [
      {
        id: 'ceo_1',
        label: "Manage Up",
        actionText: "SYNERGIZING",
        risk: 'Low',
        description: "Present the baby as a 'High-Impact MVP' that needs an immediate launch to market.",
        successDetail: "She authorized the launch. The baby was shipped to production. Good quarter.",
        failureDetail: "She told you to put a pin in it. Launch delayed 4 hours. You missed your OKRs."
      },
      {
        id: 'ceo_2',
        label: "Hostile Takeover",
        actionText: "FIRING",
        risk: 'Medium',
        description: "Tell her you are the Chairman of the Board now. Push or be severed from the company.",
        successDetail: "She respects hierarchy. She pushed efficiently. Synergy achieved.",
        failureDetail: "She called HR. You are being investigated for workplace harassment."
      },
      {
        id: 'ceo_3',
        label: "Pivot",
        actionText: "PIVOTING",
        risk: 'High',
        description: "Tell her the market has shifted and she needs to produce TWINS to remain competitive.",
        successDetail: "She pushed twice as hard. Satisfied with the ROI. Baby born.",
        failureDetail: "She tried to outsource the labor to a contractor. It didn't work."
      }
    ]
  },
  {
    title: "The Alien Truther",
    narrative: "She is convinced the baby is a Starseed. She has covered the windows in tin foil to prevent signal scanning. She is demanding you prove you aren't a Reptilian.",
    complaint: "Don't look in its eyes! They download consciousness! Is the doctor a reptilian? BLINK SIDEWAYS IF YOU ARE LIZARD!",
    propType: 'NONE', // CHANGED FROM SERVERS TO NONE FOR FOIL HAT VIBE
    patientTraits: { skinColor: '#f7fafc', hairColor: '#A9A9A9' },
    options: [
      {
        id: 'alien_1',
        label: "Wear Foil",
        actionText: "PROTECTING",
        risk: 'Low',
        description: "Make a hat out of tin foil from the cafeteria. Claim you have Level 5 Clearance from the Galactic Federation.",
        successDetail: "She trusted your clearance code (1234). The hybrid was extracted safely. Welcome to Earth.",
        failureDetail: "Your hat fell off. You were compromised. She bit you to check if your blood is blue."
      },
      {
        id: 'alien_2',
        label: "Probe",
        actionText: "PROBING",
        risk: 'Medium',
        description: "Tell her you need to check the 'Docking Bay' for the mothership arrival sequence. Beeping noises required.",
        successDetail: "She opened the bay doors. The baby landed. Beam me up, Scotty.",
        failureDetail: "She screamed 'UNAUTHORIZED PROBE' and tazed you with a smuggled cattle prod."
      },
      {
        id: 'alien_3',
        label: "Signal",
        actionText: "SIGNALING",
        risk: 'High',
        description: "Make high pitched beep-boop noises and claim the extraction team is ready for immediate transport.",
        successDetail: "She pushed for the window to catch the ride. Success. The truth is out there.",
        failureDetail: "You said a binary slur in her dialect. She was offended. Chaos ensued."
      }
    ]
  },
  {
    title: "The Horse Girl",
    narrative: "She is galloping in place in the bed. She is treating the hospital room like a stable and the nurses like stable hands. She keeps asking for oats.",
    complaint: "Easy boy! Whoa! Give me a sugar cube! My fetlocks are swollen! Check my shoes!",
    propType: 'KETTLEBELLS',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#B55239' },
    options: [
      { id: 'horse_1', label: "Apple", actionText: "FEEDING", risk: 'Low', description: "Feed her a crisp apple and pat her on the nose to calm her down. Whisper sweet nothings.", successDetail: "She calmed down and chewed contentedly. The foal was delivered successfully.", failureDetail: "She bit your hand thinking it was a carrot. You lost a finger." },
      { id: 'horse_2', label: "Spook", actionText: "SPOOKING", risk: 'Medium', description: "Open an umbrella inside the room. Spook her into immediate labor flight response.", successDetail: "She bolted. The baby was ejected at high speed. A photo finish.", failureDetail: "She kicked you in the chest with both legs. You have broken ribs." },
      { id: 'horse_3', label: "Jockey", actionText: "RIDING", risk: 'High', description: "Climb on her back. Ride this delivery to the finish line. Whip it.", successDetail: "Won the Kentucky Derby. Baby born with a gold medal. Triple Crown.", failureDetail: "Bucked off. Concussion. The horse won. You are in the glue factory." }
    ]
  },
  {
    title: "The DIY Dad",
    narrative: "The husband thinks he can deliver the baby because he built a deck once. He has a multi-tool in his hand and is measuring the cervix with a tape measure.",
    complaint: "I watched a YouTube video. It's just hydraulics. Just need some pliers and some WD-40. Move over.",
    propType: 'SERVERS',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#090806' },
    options: [
      { id: 'diy_1', label: "Distract", actionText: "DISTRACTING", risk: 'Low', description: "Ask him to fix the leaky sink in the bathroom immediately. Say it's critical for structural integrity.", successDetail: "He left to fix it. You did your job. Sink still leaks. Men are simple.", failureDetail: "He flooded the room. The baby is swimming. Water birth achieved unwillingly." },
      { id: 'diy_2', label: "Compare Tools", actionText: "MEASURING", risk: 'Medium', description: "Show him your surgical forceps. Ask if he has titanium grade. Emasculate him with gear.", successDetail: "He felt inadequate and sat down. Delivery proceeded. Size matters.", failureDetail: "He pulled out a bigger drill. You lost the tool war. He is the captain now." },
      { id: 'diy_3', label: "Hire Him", actionText: "HIRING", risk: 'High', description: "Let him hold the leg. Call him 'Foreman'. Give him a hard hat.", successDetail: "He felt useful. Good job, dad. Baby born. Under budget and ahead of schedule.", failureDetail: "He fainted at the sight of blood. Concussion. Worker's Comp filed." }
    ]
  },
  {
    title: "The TikTok Prankster",
    narrative: "Hidden cameras are everywhere. He keeps shouting 'It's just a prank bro!' while his wife is crowning. He has a bucket of confetti ready.",
    complaint: "Smile! You're on 'Labor or Die'! Don't forget to subscribe! 1 Million likes and we name the baby Chungus!",
    propType: 'RING_LIGHT',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#E6CEA8' },
    options: [
      { id: 'prank_1', label: "Find Cams", actionText: "SEARCHING", risk: 'Low', description: "Locate and smash all hidden cameras before proceeding. Check the plants.", successDetail: "Show cancelled. Baby born in privacy. No revenue generated.", failureDetail: "Missed one. You are the star of a viral fail video. 10M views." },
      { id: 'prank_2', label: "Counter Prank", actionText: "PRANKING", risk: 'High', description: "Fake drop the baby. Scream 'GOTCHA!' then reveal it was a doll.", successDetail: "They loved it. Clout gained. Baby actually safe. Collaborative content.", failureDetail: "Grandma had a heart attack. Lawsuit filed. Prank gone wrong (GONE SEXUAL)." },
      { id: 'prank_3', label: "Copyright", actionText: "STRIKING", risk: 'Medium', description: "Play Disney music loudly to force a DMCA takedown of his stream.", successDetail: "Audio muted. Stream died. Delivery finished in silence.", failureDetail: "The Mouse lawyers sued YOU instead. You own nothing now." }
    ]
  },
  {
    title: "The Ghost Hunter",
    narrative: "EVP recorder is running. She claims the room has high EMF and the baby might be a Victorian ghost named Beatrice.",
    complaint: "Shh! Did you hear that? Is the baby haunted? The spirit box said 'Demon'! Get the sage!",
    propType: 'CANDLES',
    patientTraits: { skinColor: '#f7fafc', hairColor: '#090806' },
    options: [
      { id: 'gh_1', label: "Be Ghost", actionText: "HAUNTING", risk: 'Medium', description: "Moan 'Puuuush' in a spectral voice from the corner of the room.", successDetail: "Caught on tape. She pushed out of fear. Viral ghost video confirmed.", failureDetail: "She salted the floor. You slipped and fell. Ectoplasm everywhere." },
      { id: 'gh_2', label: "Debunk", actionText: "EXPLAINING", risk: 'Low', description: "Explain that the moaning is her husband, not a ghost. Use logic.", successDetail: "Embarrassed. Delivered normally. Science wins.", failureDetail: "You got possessed. Your head spun around. Call the priest." },
      { id: 'gh_3', label: "Seance", actionText: "SUMMONING", risk: 'High', description: "Call the spirits to assist with the birth. Hold hands.", successDetail: "Ghost nurses helped. Very efficient. Cold hands though.", failureDetail: "Poltergeist threw a scalpel at you. You need stitches." }
    ]
  },
  {
    title: "The Sovereign Citizen",
    narrative: "She keeps shouting that she doesn't consent to joinder with the hospital corporation. She has a stack of legal documents.",
    complaint: "I am a living woman! I do not contract with maritime law! This bed is a vessel! I do not stand under your authority!",
    propType: 'NONE',
    patientTraits: { skinColor: '#c68642', hairColor: '#A9A9A9' },
    options: [
      { id: 'sov_1', label: "Gold Fringe", actionText: "LAWYERING", risk: 'Medium', description: "Point out the flag in the lobby has gold fringe. Declare Martial Law in the womb.", successDetail: "She accepted your authority. Baby born. Case dismissed.", failureDetail: "She filed a lien on your house. You are bankrupt. You own nothing." },
      { id: 'sov_2', label: "Travel", actionText: "TRAVELING", risk: 'Low', description: "Tell her she isn't delivering, she is 'traveling' the baby out of her person.", successDetail: "Logic loop created. Baby traveled out. No license required.", failureDetail: "She charged you $1M per minute for unlawful detention. Invoice sent." },
      { id: 'sov_3', label: "Taze", actionText: "ENFORCING", risk: 'High', description: "The P. Barnes approach. 'Stop resisting'.", successDetail: "It worked. Shockingly effective. Compliance achieved.", failureDetail: "She smashed a window and escaped. Manhunt underway." }
    ]
  },
  {
    title: "The Astrologer",
    narrative: "Checking Co-Star app frantically. Mercury is in Gatorade and she refuses to push until the moon moves into Taurus.",
    complaint: "Can't birth yet! Moon is void of course! The vibes are rancid! I won't have a Gemini!",
    propType: 'CANDLES',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#3B3024' },
    options: [
      { id: 'astro_1', label: "Fake Chart", actionText: "CHARTING", risk: 'Low', description: "Lie and say her Saturn return is RIGHT NOW and brings good fortune.", successDetail: "She panic pushed. Success. The stars aligned.", failureDetail: "She checked the app. You lied. She screamed. Bad karma." },
      { id: 'astro_2', label: "Ascendant", actionText: "RISING", risk: 'Medium', description: "Tell her the baby is rising Scorpio if she waits one more minute.", successDetail: "She pushed immediately to avoid a Scorpio child. Good birth.", failureDetail: "She wanted a Scorpio. You ruined it. She hates you." },
      { id: 'astro_3', label: "Crystals", actionText: "CHARGING", risk: 'High', description: "Insert a quartz crystal. Literally. Don't ask where.", successDetail: "Vibrations were good. Baby came out charged up.", failureDetail: "The crystal got stuck. It was awkward. Geodes everywhere." }
    ]
  },
  {
    title: "The MLM Boss Babe",
    narrative: "Recruiting nurses to her downline while contracting. Selling leggings mid-labor. She calls you 'Hun'.",
    complaint: "Hey hun! Want to be your own boss? I can sign you up right now! Diamond status!",
    propType: 'ESSENTIAL_OILS',
    patientTraits: { skinColor: '#f8d9c0', hairColor: '#E6CEA8' },
    options: [
      { id: 'mlm_1', label: "Buy In", actionText: "JOINING", risk: 'High', description: "Agree to buy the leggings inventory if she pushes right now.", successDetail: "Sold out inventory. Delivered baby. You are now a platinum member.", failureDetail: "Credit card declined. She stopped labor to call support. Scam." },
      { id: 'mlm_2', label: "Pyramid", actionText: "TOPPLING", risk: 'Low', description: "Draw a triangle on the whiteboard. Ask her to explain it mathematically.", successDetail: "Mind blown. Baby born while she was thinking about geometry.", failureDetail: "She called it a reverse funnel system. You lost. You bought the starter kit." },
      { id: 'mlm_3', label: "Girlboss", actionText: "GASLIGHTING", risk: 'Medium', description: "Gaslight, Gatekeep, Gestate. Tell her real bosses multitask.", successDetail: "Slayed. She pushed while posting on Instagram.", failureDetail: "She gatekept the baby. Refused to release product. Backorder." }
    ]
  },
  {
    title: "The Gamer",
    narrative: "Steam Deck in hand. Fighting a boss in Elden Ring. Refuses to pause. The baby is blocking the screen.",
    complaint: "Pause! No pause in multiplayer! Heal me! I need a flask! Don't distract me!",
    propType: 'SERVERS',
    patientTraits: { skinColor: '#f7fafc', hairColor: '#090806' },
    options: [
      { id: 'game_1', label: "Unplug", actionText: "RAGING", risk: 'High', description: "Pull the plug on the router. Force a disconnect.", successDetail: "She rage pushed. Baby born. Connection lost.", failureDetail: "She threw the controller at your head. Critical hit." },
      { id: 'game_2', label: "Carry", actionText: "CARRYING", risk: 'Medium', description: "Offer to carry her level if she delivers. Git gud.", successDetail: "GG EZ. Baby born. You leveled up.", failureDetail: "You are a noob. She kicked you. Skill issue." },
      { id: 'game_3', label: "Speedrun", actionText: "SPEEDRUNNING", risk: 'Low', description: "Tell her to Any% Glitchless this birth. Frame perfect inputs only.", successDetail: "World record time. Frame perfect delivery. WR.", failureDetail: "Softlocked the birth. Clipped through the bed." }
    ]
  },
  {
    title: "The Anime Stan",
    narrative: "Body pillow on the bed. Naruto running to the bathroom. Calling you 'Baka'. She is charging up an attack.",
    complaint: "Notice me Senpai! Use your bankai! This is my final form!",
    propType: 'RING_LIGHT',
    patientTraits: { skinColor: '#e0ac69', hairColor: '#B55239' },
    options: [
      { id: 'ani_1', label: "Power Up", actionText: "SCREAMING", risk: 'Low', description: "Scream until your hair turns yellow. Charge your ki.", successDetail: "Super Saiyan achieved. Baby born. Over 9000.", failureDetail: "It was a filler episode. Nothing happened. Next time on Dragon Ball Z." },
      { id: 'ani_2', label: "Tentacles", actionText: "CENSORING", risk: 'High', description: "Don't ask. Just don't ask.", successDetail: "It worked. We don't talk about it.", failureDetail: "You were banned from the hospital. And Japan." },
      { id: 'ani_3', label: "Dubbed", actionText: "DUBBING", risk: 'Medium', description: "Speak in a bad English dub voice. Mismatch your lip flaps.", successDetail: "She cringed the baby out. Success.", failureDetail: "She is a sub purist. She attacked you with a katana." }
    ]
  }
];

// --- THE CENTURY DECK GENERATOR ---
let SCENARIO_DECK: Scenario[] = [];

export const generateDeck = (): void => {
  SCENARIO_DECK = [];
  const totalDesired = 100;
  if (!BASE_ARCHETYPES || BASE_ARCHETYPES.length === 0) {
     console.error("CRITICAL: No Base Archetypes defined!");
     return;
  }
  const iterations = Math.ceil(totalDesired / BASE_ARCHETYPES.length);
  for(let i=0; i<iterations; i++) { 
     BASE_ARCHETYPES.forEach((template, index) => {
        const variantTraits = getRandomTraits();
        let variantTitle = template.title;
        if (i > 0) variantTitle = `${template.title} #${i + 1}`;
        SCENARIO_DECK.push({
            id: `scen_${i}_${index}`,
            title: variantTitle,
            narrative: template.narrative,
            complaint: template.complaint,
            propType: template.propType as PropType,
            patientTraits: variantTraits, 
            options: template.options.map(opt => ({
                ...opt, 
                id: `${opt.id}_${i}`,
                risk: opt.risk 
            }))
        });
     });
  }
  if (SCENARIO_DECK.length > 100) SCENARIO_DECK = SCENARIO_DECK.slice(0, 100);
  SCENARIO_DECK.sort(() => 0.5 - Math.random());
};

export const drawScenario = (): Scenario => {
  if (!SCENARIO_DECK || SCENARIO_DECK.length === 0) {
    generateDeck();
  }
  const scen = SCENARIO_DECK.pop();
  if (!scen) {
      return {
          id: 'emergency_fallback',
          title: 'The Glitch',
          narrative: 'Reality is bending.',
          complaint: '404 Baby Not Found',
          propType: 'NONE',
          patientTraits: { skinColor: '#fff', hairColor: '#000' },
          options: [{ id: 'f1', label: 'Reset', actionText: 'RESETTING', risk: 'Low', description: 'Fix the game.', successDetail: 'Fixed.', failureDetail: 'Broke.' }]
      };
  }
  return scen;
};

export const getRandomFallbackScenario = (): Scenario => {
  return drawScenario();
};
