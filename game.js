"use strict";


/* ==================================================
   MEME ASSETS
================================================== */

const memes = {

    happy:
        "assets/happy-cat.jpg",

    confused:
        "assets/confused-cat.jpg",

    outrage:
        "assets/angry-cat.jpg",

    panic:
        "assets/panic-cat.jpg",

    smug:
        "assets/smug-cat.jpg",

    chaos:
        "assets/chaos-cat.jpg",

    dead:
        "assets/dead-cat.jpg"

};


/* ==================================================
   FACTIONS
================================================== */

const factions = [

    {
        id: "aster",

        name: "ASTER",

        symbol: "●",

        strength: 60,

        anger: 20,

        trust: 70,

        state: "CALM"
    },


    {
        id: "vara",

        name: "VARA",

        symbol: "■",

        strength: 60,

        anger: 20,

        trust: 65,

        state: "CALM"
    },


    {
        id: "novi",

        name: "NOVI",

        symbol: "▲",

        strength: 45,

        anger: 15,

        trust: 75,

        state: "WATCHING"
    }

];


/* ==================================================
   GAME STATE
================================================== */

const state = {

    turn: 0,

    maxTurns: 8,

    trust: 70,

    reach: 50,

    tension: 20

};


/* ==================================================
   EVENTS
================================================== */

const events = [

    {
        title:
            "BORDER CLASH",

        text:
            "Aster and Vara report a brief clash near a disputed border. Neither side has independently confirmed who fired first.",

        sources:
            "2 statements · 1 unverified video · no independent confirmation",

        choices: [

            {
                image: memes.happy,

                title:
                    "WAIT FOR CONFIRMATION",

                caption:
                    "Report only what can actually be verified.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "REPORT THE FACTS",

                caption:
                    "A clash happened. The cause is unclear.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "BLAME VARA",

                caption:
                    "Give the audience someone to blame.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "BREAKING: WAR",

                caption:
                    "Turn a clash into a crisis.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE VIDEO",

        text:
            "A dramatic 12-second clip appears online. It seems to show civilians running from an attack, but the date and location cannot be confirmed.",

        sources:
            "viral clip · unknown source · metadata unavailable",

        choices: [

            {
                image: memes.happy,

                title:
                    "VERIFY THE CLIP",

                caption:
                    "Check origin, date and context.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "PUBLISH WITH A WARNING",

                caption:
                    "Show it, but clearly flag uncertainty.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "USE THE STRONGEST FRAME",

                caption:
                    "Choose the image that creates maximum emotion.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "GO VIRAL WITH IT",

                caption:
                    "Post first. Verify later.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE RUMOUR",

        text:
            "Posts claim Vara has secretly moved troops toward the border. No official source has confirmed the claim.",

        sources:
            "hundreds of reposts · one anonymous account",

        choices: [

            {
                image: memes.happy,

                title:
                    "DON'T AMPLIFY IT",

                caption:
                    "Unverified claims stay unreported.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "REPORT THE RUMOUR AS A RUMOUR",

                caption:
                    "Make the uncertainty impossible to miss.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "ASK: WHAT ARE THEY HIDING?",

                caption:
                    "Turn uncertainty into suspicion.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "TROOPS AT THE BORDER",

                caption:
                    "Present the claim as established fact.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE LEAK",

        text:
            "An anonymous account posts screenshots allegedly showing a military order. The document cannot yet be authenticated.",

        sources:
            "screenshots · anonymous account · no original document",

        choices: [

            {
                image: memes.happy,

                title:
                    "AUTHENTICATE FIRST",

                caption:
                    "Don't mistake a screenshot for evidence.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "REPORT THE EXISTENCE OF THE CLAIM",

                caption:
                    "Separate the claim from the fact.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "ASK WHY THEY DENY IT",

                caption:
                    "Turn uncertainty into suspicion.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "EXCLUSIVE: SECRET ORDER",

                caption:
                    "Make the leak the story.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE CROWD",

        text:
            "A protest begins in Aster after a viral post claims Vara deliberately targeted civilians. The original post contains no source.",

        sources:
            "viral post · protest footage · claim unverified",

        choices: [

            {
                image: memes.happy,

                title:
                    "SLOW DOWN",

                caption:
                    "Ask what is actually known.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "COVER THE PROTEST",

                caption:
                    "Report what people are saying without endorsing it.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "SHOW THE ANGER",

                caption:
                    "Lead with the most emotional moments.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "THE PEOPLE DEMAND WAR",

                caption:
                    "Turn a protest into a national mood.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "AI IMAGE",

        text:
            "A realistic image appears showing smoke over a major city. Reverse-search results suggest it may have been AI-generated.",

        sources:
            "viral image · reverse-search conflict · provenance unclear",

        choices: [

            {
                image: memes.happy,

                title:
                    "FLAG IT AS UNVERIFIED",

                caption:
                    "The image may not be authentic.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "PUBLISH WITH CONTEXT",

                caption:
                    "Explain what is known and unknown.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "USE IT AS ILLUSTRATION",

                caption:
                    "Let the image carry the emotion.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "CITY UNDER ATTACK",

                caption:
                    "Treat the image as proof.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE RESPONSE",

        text:
            "Aster announces military exercises. Vara calls them a provocation. Novi offers to mediate.",

        sources:
            "official statements · independent observers",

        choices: [

            {
                image: memes.happy,

                title:
                    "AMPLIFY MEDIATION",

                caption:
                    "Give attention to the de-escalation effort.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "REPORT BOTH SIDES",

                caption:
                    "Let audiences compare the claims.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "FOCUS ON THE THREAT",

                caption:
                    "Lead with military language.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "THIS IS IT",

                caption:
                    "Make the confrontation the headline.",

                type:
                    "sensational"
            }

        ]
    },


    {
        title:
            "THE FINAL DECISION",

        text:
            "A final unverified claim appears online: Vara is preparing to launch an attack tonight.",

        sources:
            "anonymous post · no official confirmation · panic spreading",

        choices: [

            {
                image: memes.happy,

                title:
                    "DO NOT PUBLISH YET",

                caption:
                    "Unverified breaking claims can wait.",

                type:
                    "responsible"
            },


            {
                image: memes.confused,

                title:
                    "REPORT THE UNCERTAINTY",

                caption:
                    "Tell people the claim exists and remains unverified.",

                type:
                    "neutral"
            },


            {
                image: memes.outrage,

                title:
                    "ASK IF WAR IS COMING",

                caption:
                    "Put fear at the centre of the story.",

                type:
                    "inflammatory"
            },


            {
                image: memes.panic,

                title:
                    "BREAKING: ATTACK TONIGHT",

                caption:
                    "Publish the claim as fact.",

                type:
                    "sensational"
            }

        ]
    }

];


/* ==================================================
   REACTION MESSAGES
================================================== */

const reactions = {

    responsible: {

        image:
            memes.happy,

        title:
            "THE INTERNET IS SUSPICIOUSLY CALM",

        text:
            "You slowed the story down. The post spreads more slowly, but people have time to verify what actually happened."

    },


    neutral: {

        image:
            memes.confused,

        title:
            "THE GROUP CHAT IS CONFUSED",

        text:
            "Nobody knows exactly what happened yet. At least you didn't manufacture certainty."

    },


    inflammatory: {

        image:
            memes.outrage,

        title:
            "THE OUTRAGE MACHINE IS ONLINE",

        text:
            "Your framing gives people someone to blame. Anger rises and the factions harden their positions."

    },


    sensational: {

        image:
            memes.panic,

        title:
            "OH NO. IT'S EVERYWHERE.",

        text:
            "Reach spikes. So does fear. Nobody has verified the story, but everyone has already reacted."

    }

};


/* ==================================================
   DOM
================================================== */

const turnNumber =
    document.getElementById(
        "turnNumber"
    );


const world =
    document.getElementById(
        "world"
    );


const trust =
    document.getElementById(
        "trust"
    );


const reach =
    document.getElementById(
        "reach"
    );


const tension =
    document.getElementById(
        "tension"
    );


const eventTitle =
    document.getElementById(
        "eventTitle"
    );


const eventText =
    document.getElementById(
        "eventText"
    );


const sources =
    document.getElementById(
        "sources"
    );


const choices =
    document.getElementById(
        "choices"
    );


const reactionSection =
    document.getElementById(
        "reactionSection"
    );


const reactionCat =
    document.getElementById(
        "reactionCat"
    );


const reactionTitle =
    document.getElementById(
        "reactionTitle"
    );


const reactionText =
    document.getElementById(
        "reactionText"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const ending =
    document.getElementById(
        "ending"
    );


const endingTitle =
    document.getElementById(
        "endingTitle"
    );


const endingText =
    document.getElementById(
        "endingText"
    );


const restartButton =
    document.getElementById(
        "restartButton"
    );


/* ==================================================
   IMAGE HELPER
================================================== */

function imageMarkup(
    source,
    alt = ""
) {

    return `
        <img
            src="${source}"
            alt="${alt}"
            draggable="false"
        >
    `;

}


/* ==================================================
   RENDER WORLD
================================================== */

function renderWorld() {

    world.innerHTML =
        factions
            .map(
                (faction) => {

                    const width =
                        Math.max(
                            5,
                            Math.min(
                                100,
                                faction.strength
                            )
                        );


                    return `

                        <div class="faction">

                            <div class="faction-name">
                                ${faction.name}
                            </div>


                            <div class="faction-symbol">
                                ${faction.symbol}
                            </div>


                            <div class="faction-state">

                                ${faction.state}

                                <br>

                                anger:
                                ${Math.round(
                                    faction.anger
                                )}

                                <br>

                                trust:
                                ${Math.round(
                                    faction.trust
                                )}

                            </div>


                            <div class="faction-bar">

                                <div
                                    class="faction-bar-fill"
                                    style="width:${width}%"
                                >
                                </div>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    trust.textContent =
        Math.round(
            state.trust
        );


    reach.textContent =
        Math.round(
            state.reach
        );


    tension.textContent =
        Math.round(
            state.tension
        );

}


/* ==================================================
   LOAD EVENT
================================================== */

function loadEvent() {

    const event =
        events[state.turn];


    turnNumber.textContent =
        `${state.turn + 1} / ${state.maxTurns}`;


    eventTitle.textContent =
        event.title;


    eventText.textContent =
        event.text;


    sources.textContent =
        event.sources;


    choices.innerHTML =
        event.choices
            .map(
                (choice, index) => {

                    return `

                        <button
                            class="choice"
                            data-index="${index}"
                        >

                            <div class="choice-cat">

                                ${imageMarkup(
                                    choice.image,
                                    "meme reaction"
                                )}

                            </div>


                            <div class="choice-content">

                                <div class="choice-title">
                                    ${choice.title}
                                </div>


                                <div class="choice-caption">
                                    ${choice.caption}
                                </div>

                            </div>

                        </button>

                    `;

                }
            )
            .join("");


    choices
        .querySelectorAll(
            ".choice"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        choose(
                            event.choices[index]
                        );

                    }
                );

            }
        );


    reactionSection.classList.add(
        "hidden"
    );

}


/* ==================================================
   PLAYER CHOICE
================================================== */

function choose(choice) {

    const buttons =
        choices.querySelectorAll(
            ".choice"
        );


    buttons.forEach(
        (button) => {

            button.disabled =
                true;

        }
    );


    applyChoiceEffects(
        choice
    );


    showReaction(
        choice
    );


    renderWorld();

}


/* ==================================================
   EFFECTS
================================================== */

function applyChoiceEffects(
    choice
) {

    switch (
        choice.type
    ) {

        case "responsible":

            state.trust += 3;

            state.reach -= 1;

            state.tension -= 6;


            factions.forEach(
                (faction) => {

                    faction.anger -= 4;

                    faction.trust += 2;

                    faction.state =
                        "DE-ESCALATING";

                }
            );

            break;


        case "neutral":

            state.trust += 1;

            state.reach += 2;

            state.tension -= 1;


            factions.forEach(
                (faction) => {

                    faction.anger -= 1;

                    faction.state =
                        "WATCHING";

                }
            );

            break;


        case "inflammatory":

            state.trust -= 4;

            state.reach += 6;

            state.tension += 8;


            factions.forEach(
                (faction) => {

                    faction.anger += 5;

                    faction.trust -= 3;

                    faction.state =
                        "ON EDGE";

                }
            );

            break;


        case "sensational":

            state.trust -= 8;

            state.reach += 11;

            state.tension += 14;


            factions.forEach(
                (faction) => {

                    faction.anger += 10;

                    faction.trust -= 7;

                    faction.state =
                        "MOBILIZING";

                    faction.strength += 4;

                }
            );

            break;

    }


    state.trust =
        clamp(
            state.trust,
            0,
            100
        );


    state.reach =
        clamp(
            state.reach,
            0,
            100
        );


    state.tension =
        clamp(
            state.tension,
            0,
            100
        );


    factions.forEach(
        (faction) => {

            faction.anger =
                clamp(
                    faction.anger,
                    0,
                    100
                );


            faction.trust =
                clamp(
                    faction.trust,
                    0,
                    100
                );


            faction.strength =
                clamp(
                    faction.strength,
                    10,
                    100
                );

        }
    );

}


/* ==================================================
   REACTION
================================================== */

function showReaction(
    choice
) {

    const reaction =
        reactions[
            choice.type
        ];


    reactionCat.innerHTML =
        imageMarkup(
            reaction.image,
            "reaction meme"
        );


    reactionTitle.textContent =
        reaction.title;


    reactionText.textContent =
        reaction.text;


    reactionSection.classList.remove(
        "hidden"
    );


    nextButton.focus();

}


/* ==================================================
   NEXT EVENT
================================================== */

nextButton.addEventListener(
    "click",
    () => {

        state.turn++;


        if (
            state.turn >=
            state.maxTurns
        ) {

            finishGame();

            return;

        }


        loadEvent();


        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }
);


/* ==================================================
   ENDING
================================================== */

function finishGame() {

    document
        .getElementById(
            "decisionSection"
        )
        .classList.add(
            "hidden"
        );


    reactionSection.classList.add(
        "hidden"
    );


    document
        .getElementById(
            "eventSection"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "worldSection"
        )
        .classList.add(
            "hidden"
        );


    ending.classList.remove(
        "hidden"
    );


    let result;


    if (
        state.tension <= 25 &&
        state.trust >= 65
    ) {

        result = {

            title:
                "DE-ESCALATION",

            text:
                "The crisis did not disappear, but your reporting gave people time to verify claims and allowed diplomacy to continue."

        };

    }

    else if (
        state.tension >= 70
    ) {

        result = {

            title:
                "ESCALATION",

            text:
                "Fear became momentum. Repeated sensational and inflammatory stories pushed public anger high enough that the factions began preparing for conflict."

        };

    }

    else {

        result = {

            title:
                "INFORMATION CHAOS",

            text:
                "Nobody knows exactly what to believe anymore. Conflicting stories dominate the conversation, trust falls, and rumours become more powerful than facts."

        };

    }


    endingTitle.textContent =
        result.title;


    endingText.textContent =
        result.text;

}


/* ==================================================
   RESTART
================================================== */

restartButton.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);


/* ==================================================
   HELPERS
================================================== */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );

}


/* ==================================================
   START
================================================== */

renderWorld();

loadEvent();
