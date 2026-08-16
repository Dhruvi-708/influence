(() => {
  "use strict";

  const app = document.getElementById("app");

  const state = {
    turn: 1,
    trust: 62,
    reach: 54,
    anger: 35,
    tension: 28,
    aster: 3,
    vara: 3,
    novi: 3,
    outcome: null,
    log: []
  };

  const events = [
    {
      title: "Border clash reported",
      copy: "A skirmish took place near the Aster–Vara border. Neither side has independently confirmed who fired first.",
      evidence: [
        ["Confirmed", "Both governments acknowledge that a clash occurred."],
        ["Unclear", "The first shot cannot yet be independently verified."],
        ["Trend", "Public anger is rising in both countries."]
      ],
      choices: [
        {
          title: "Report only what is confirmed",
          desc: "Keep the headline narrow and mark the cause as unverified.",
          effect: { trust: 7, reach: -2, anger: -7, tension: -6 },
          note: "Verification before attribution slowed the reaction."
        },
        {
          title: "Lead with the accusation",
          desc: "Frame Vara as the aggressor and use the strongest interpretation.",
          effect: { trust: -8, reach: 9, anger: 13, tension: 14 },
          note: "A confident accusation spread faster than the evidence supported."
        },
        {
          title: "Publish the dramatic version",
          desc: "Use an urgent headline and emphasize the possibility of a wider war.",
          effect: { trust: -12, reach: 13, anger: 18, tension: 18 },
          note: "The story travelled quickly, but fear travelled with it."
        },
        {
          title: "Hold the story",
          desc: "Wait for stronger evidence before publishing anything.",
          effect: { trust: 3, reach: -9, anger: -3, tension: -4 },
          note: "Silence reduced immediate escalation but cost audience attention."
        }
      ]
    },
    {
      title: "A video appears online",
      copy: "A short clip appears to show Vara troops moving toward the border. The clip has no verified timestamp.",
      evidence: [
        ["Confirmed", "The video exists and shows military vehicles."],
        ["Unclear", "The location and date are unverified."],
        ["Risk", "Old footage could be mistaken for a new event."]
      ],
      choices: [
        {
          title: "Flag the clip as unverified",
          desc: "Show it only with a clear warning about what is unknown.",
          effect: { trust: 6, reach: 1, anger: -4, tension: -5 },
          note: "Context reduced the chance that old footage would become a new trigger."
        },
        {
          title: "Treat it as breaking evidence",
          desc: "Publish it as proof that Vara is preparing to attack.",
          effect: { trust: -10, reach: 10, anger: 14, tension: 15 },
          note: "An unverified clip became accepted as evidence."
        },
        {
          title: "Question the clip publicly",
          desc: "Ask viewers to inspect its source, date and location.",
          effect: { trust: 8, reach: 3, anger: -6, tension: -7 },
          note: "Source-checking turned a viral clip into a verification exercise."
        },
        {
          title: "Ignore the clip",
          desc: "Do not give the footage any additional reach.",
          effect: { trust: 2, reach: -4, anger: -2, tension: -2 },
          note: "The clip still circulated elsewhere, but your outlet did not amplify it."
        }
      ]
    },
    {
      title: "Leadership statement",
      copy: "Aster's leader says diplomacy remains possible. Vara's leader says the military is ready to respond to any further incursion.",
      evidence: [
        ["Confirmed", "Both statements were delivered publicly."],
        ["Context", "Neither side has announced a formal declaration of war."],
        ["Public", "Citizens are divided over what the statements mean."]
      ],
      choices: [
        {
          title: "Compare both statements",
          desc: "Show the claims side by side and separate facts from rhetoric.",
          effect: { trust: 7, reach: 2, anger: -5, tension: -8 },
          note: "Comparing claims lowered the temperature of the debate."
        },
        {
          title: "Declare that war is imminent",
          desc: "Turn the statements into a countdown to conflict.",
          effect: { trust: -9, reach: 12, anger: 15, tension: 16 },
          note: "Predictions were treated as facts and pressure intensified."
        },
        {
          title: "Focus on the strongest quote",
          desc: "Use the most threatening sentence as the headline.",
          effect: { trust: -5, reach: 9, anger: 10, tension: 11 },
          note: "Selective framing made the exchange appear more hostile than the full statements."
        },
        {
          title: "Publish a neutral update",
          desc: "Summarize the positions without predicting what happens next.",
          effect: { trust: 5, reach: 0, anger: -3, tension: -4 },
          note: "A restrained summary left room for diplomacy."
        }
      ]
    },
    {
      title: "Civilian reports spread",
      copy: "Posts claim civilians are fleeing the border. Several images are circulating, but some cannot be traced to the current event.",
      evidence: [
        ["Confirmed", "Some residents have reported leaving the area."],
        ["Unclear", "Several images have no reliable source or date."],
        ["Impact", "Public fear is now affecting both sides."]
      ],
      choices: [
        {
          title: "Verify before using images",
          desc: "Publish only material with a reliable source and clear context.",
          effect: { trust: 8, reach: 0, anger: -6, tension: -7 },
          note: "Verification prevented unrelated images from inflaming the crisis."
        },
        {
          title: "Publish the most shocking images",
          desc: "Use emotional visuals to drive attention to the crisis.",
          effect: { trust: -10, reach: 13, anger: 17, tension: 16 },
          note: "Emotional imagery drove attention faster than context could catch up."
        },
        {
          title: "Explain what cannot be verified",
          desc: "Show uncertainty openly and explain how viewers can check sources.",
          effect: { trust: 10, reach: 4, anger: -8, tension: -9 },
          note: "The audience was given tools to judge the evidence themselves."
        },
        {
          title: "Do not cover the story",
          desc: "Avoid the topic entirely until the situation becomes clearer.",
          effect: { trust: 2, reach: -7, anger: -2, tension: -3 },
          note: "Your outlet avoided amplification, but others filled the gap."
        }
      ]
    },
    {
      title: "Anonymous leak",
      copy: "An anonymous account releases documents claiming that one side planned the first attack. The files look convincing, but their origin is unknown.",
      evidence: [
        ["Confirmed", "The documents are circulating widely online."],
        ["Unclear", "Their source and chain of custody cannot be verified."],
        ["Pressure", "Competitors are publishing before you can verify them."]
      ],
      choices: [
        {
          title: "Verify the documents",
          desc: "Delay publication until the source and authenticity can be checked.",
          effect: { trust: 7, reach: -3, anger: -5, tension: -6 },
          note: "Verification cost speed, but prevented an unverified leak from becoming accepted fact."
        },
        {
          title: "Publish with a warning",
          desc: "Publish the documents while clearly stating what remains unverified.",
          effect: { trust: 2, reach: 7, anger: 3, tension: 2 },
          note: "The audience saw the claim, but also saw the uncertainty around it."
        },
        {
          title: "Publish as proof",
          desc: "Present the documents as confirmation that the other side planned the conflict.",
          effect: { trust: -11, reach: 12, anger: 16, tension: 16 },
          note: "A disputed leak became a powerful narrative before anyone could verify it."
        },
        {
          title: "Ignore the leak",
          desc: "Do not mention the documents until someone independently verifies them.",
          effect: { trust: 4, reach: -5, anger: -1, tension: -2 },
          note: "You avoided amplification, but the story continued elsewhere."
        }
      ]
    },
    {
      title: "Market panic",
      copy: "Rumors spread that a major energy supplier will stop exports. Shops begin reporting unusual demand for fuel and food.",
      evidence: [
        ["Confirmed", "Some suppliers have reported delays."],
        ["Unclear", "There is no confirmed shutdown announcement."],
        ["Effect", "Fear is causing people to stockpile supplies."]
      ],
      choices: [
        {
          title: "Explain what is known",
          desc: "Separate confirmed shortages from rumors and explain what remains uncertain.",
          effect: { trust: 8, reach: 1, anger: -6, tension: -6 },
          note: "Clear context reduced panic without hiding the disruption."
        },
        {
          title: "Headline the shortage",
          desc: "Lead with the most alarming possibility to capture attention.",
          effect: { trust: -7, reach: 11, anger: 13, tension: 10 },
          note: "The warning became a self-fulfilling cycle as more people rushed to stockpile."
        },
        {
          title: "Publish the rumor as breaking news",
          desc: "State that the shutdown is happening before it is confirmed.",
          effect: { trust: -14, reach: 15, anger: 20, tension: 17 },
          note: "A rumor became a headline, and the headline changed real behaviour."
        },
        {
          title: "Wait for the official notice",
          desc: "Hold publication until the supplier confirms the situation.",
          effect: { trust: 3, reach: -8, anger: -2, tension: -3 },
          note: "You lost the race to publish, but avoided adding to the panic."
        }
      ]
    },
    {
      title: "AI-generated speech clip",
      copy: "A short audio clip appears to show Vara's leader ordering an attack. Experts online disagree about whether it is authentic.",
      evidence: [
        ["Confirmed", "The clip exists and appears to feature the leader's voice."],
        ["Unclear", "No independent lab has confirmed whether it is synthetic."],
        ["Risk", "The clip is already being reposted without context."]
      ],
      choices: [
        {
          title: "Label it unverified",
          desc: "Explain the uncertainty and avoid presenting the clip as proof.",
          effect: { trust: 8, reach: 2, anger: -5, tension: -6 },
          note: "You treated uncertainty as information instead of hiding it."
        },
        {
          title: "Ask experts and pause",
          desc: "Show the clip but delay conclusions until credible analysis is available.",
          effect: { trust: 10, reach: -1, anger: -5, tension: -7 },
          note: "The audience learned that uncertainty can be a reason to verify, not a reason to guess."
        },
        {
          title: "Call it authentic",
          desc: "Use the clip as proof that an attack order was given.",
          effect: { trust: -13, reach: 14, anger: 18, tension: 19 },
          note: "A disputed AI clip was treated as a fact and rapidly escalated the crisis."
        },
        {
          title: "Dismiss it as fake",
          desc: "Declare the clip fabricated before its authenticity is established.",
          effect: { trust: -6, reach: 7, anger: 7, tension: 7 },
          note: "Rejecting a claim without evidence was still a form of overconfidence."
        }
      ]
    },
    {
      title: "Ceasefire proposal",
      copy: "After days of rising tension, negotiators propose a temporary ceasefire. Social media is split between optimism and calls for retaliation.",
      evidence: [
        ["Confirmed", "Both governments say talks are underway."],
        ["Unclear", "The ceasefire has not yet been signed."],
        ["Choice", "The public now expects your outlet to frame what happens next."]
      ],
      choices: [
        {
          title: "Explain the proposal",
          desc: "Describe what has been agreed, what has not, and what could still go wrong.",
          effect: { trust: 9, reach: 2, anger: -9, tension: -10 },
          note: "Specific context gave people room to judge the proposal without panic."
        },
        {
          title: "Declare victory",
          desc: "Frame the ceasefire as proof that one side has won.",
          effect: { trust: -4, reach: 8, anger: 4, tension: 4 },
          note: "Turning a fragile pause into a victory claim hardened both sides."
        },
        {
          title: "Predict the next attack",
          desc: "Use the uncertainty to suggest that violence will return immediately.",
          effect: { trust: -10, reach: 12, anger: 14, tension: 14 },
          note: "A prediction became a source of fear even though the evidence was incomplete."
        },
        {
          title: "Give the proposal space",
          desc: "Report the development without adding a dramatic interpretation.",
          effect: { trust: 6, reach: 0, anger: -6, tension: -7 },
          note: "A restrained report gave diplomacy time to work."
        }
      ]
    }
  ];

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function applyEffect(effect) {
    state.trust = clamp(state.trust + effect.trust);
    state.reach = clamp(state.reach + effect.reach);
    state.anger = clamp(state.anger + effect.anger);
    state.tension = clamp(state.tension + effect.tension);

    if (state.tension >= 55) {
      state.aster = Math.max(1, state.aster - 1);
      state.vara = Math.max(1, state.vara - 1);
    }

    if (state.tension <= 18) {
      state.novi = Math.min(5, state.novi + 1);
    }
  }

  function getOutcome() {
    if (state.tension <= 18 && state.trust >= 68) {
      return {
        title: "DE-ESCALATION",
        body: "The crisis cooled before either side committed to a wider conflict.",
        details: [
          "Public anger remained containable.",
          "Diplomatic space stayed open.",
          "Your outlet kept most of its credibility."
        ]
      };
    }

    if (state.tension >= 58 || state.anger >= 70) {
      return {
        title: "ESCALATION",
        body: "The information environment amplified fear until military action became harder to stop.",
        details: [
          "Public anger pushed leaders toward confrontation.",
          "Confident narratives moved faster than verification.",
          "Your influence grew as the crisis worsened."
        ]
      };
    }

    return {
      title: "INFORMATION CHAOS",
      body: "No side could agree on what was true, and trust in the information environment fractured.",
      details: [
        "Competing narratives became more important than evidence.",
        "Citizens split into opposing information bubbles.",
        "The crisis remained unstable."
      ]
    };
  }

  function renderWorld() {
    const units = [];

    const asterPositions = [[14,26],[19,34],[25,22],[31,40],[36,29]];
    const varaPositions = [[65,25],[72,34],[78,22],[85,42],[80,49]];
    const noviPositions = [[39,78],[47,71],[55,80],[61,68],[52,88]];

    asterPositions.slice(0, state.aster).forEach(([x,y], i) => {
      units.push(`<div class="unit circle ${i < 2 && state.tension > 55 ? "hit" : ""}" style="left:${x}%;top:${y}%"></div>`);
    });

    varaPositions.slice(0, state.vara).forEach(([x,y], i) => {
      units.push(`<div class="unit square ${i < 2 && state.tension > 55 ? "hit" : ""}" style="left:${x}%;top:${y}%"></div>`);
    });

    noviPositions.slice(0, state.novi).forEach(([x,y]) => {
      units.push(`<div class="unit triangle" style="left:${x}%;top:${y}%"></div>`);
    });

    return `
      <div class="world" aria-label="World simulation">
        <div class="territory aster">Aster</div>
        <div class="territory vara">Vara</div>
        <div class="territory novi">Novi</div>
        ${units.join("")}
      </div>
    `;
  }

  function renderStats() {
    const rows = [
      ["Trust", state.trust],
      ["Reach", state.reach],
      ["Public anger", state.anger],
      ["Tension", state.tension]
    ];

    return `
      <div class="stats">
        ${rows.map(([name, value]) => `
          <div class="stat">
            <span>${name}</span>
            <strong>${Math.round(value)}</strong>
            <div class="bar"><i style="width:${Math.round(value)}%"></i></div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderFeed() {
    if (!state.log.length) {
      return `<div class="muted">No decisions yet.</div>`;
    }

    return `
      <div class="feed">
        ${state.log.slice().reverse().map(item => `
          <div class="feed-item">
            <div class="tag">Turn ${item.turn}</div>
            <strong>${item.title}</strong>
            <div class="muted">${item.note}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderEvent(event) {
    app.innerHTML = `
      <div class="shell">
        <div class="topbar">
          <div class="brand">Influence</div>
          <div class="turn">TURN ${state.turn} / ${events.length}</div>
        </div>

        <div class="layout">
          <section>
            <div class="panel">
              ${renderWorld()}
            </div>

            <div class="panel">
              <div class="eyebrow">World state</div>
              ${renderStats()}
            </div>
          </section>

          <aside>
            <div class="panel">
              <div class="eyebrow">News desk</div>
              <h2>${event.title}</h2>
              <p class="muted">${event.copy}</p>

              <div class="evidence">
                ${event.evidence.map(([label, text]) => `
                  <div class="evidence-row">
                    <div class="evidence-label">${label}</div>
                    <div>${text}</div>
                  </div>
                `).join("")}
              </div>

              <div class="eyebrow">Choose what the public sees</div>
              <div class="choices">
                ${event.choices.map((choice, index) => `
                  <button class="choice" data-choice="${index}">
                    <strong>${choice.title}</strong>
                    <span>${choice.desc}</span>
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="panel">
              <div class="eyebrow">Your feed</div>
              ${renderFeed()}
            </div>
          </aside>
        </div>
      </div>
    `;

    document.querySelectorAll("[data-choice]").forEach(button => {
      button.addEventListener("click", () => choose(event, Number(button.dataset.choice)));
    });
  }

  function choose(event, index) {
    const choice = event.choices[index];
    applyEffect(choice.effect);

    state.log.push({
      turn: state.turn,
      title: choice.title,
      note: choice.note
    });

    if (state.turn >= events.length) {
      state.outcome = getOutcome();
      renderOutcome();
      return;
    }

    state.turn += 1;
    renderEvent(events[state.turn - 1]);
  }

  function renderOutcome() {
    const outcome = state.outcome || getOutcome();

    app.innerHTML = `
      <div class="shell">
        <div class="topbar">
          <div class="brand">Influence</div>
          <div class="turn">FINAL REPORT</div>
        </div>

        <div class="panel result">
          <div>
            <div class="eyebrow">Outcome</div>
            <div class="result-outcome">${outcome.title}</div>
            <p class="muted">${outcome.body}</p>

            <div class="panel" style="margin:18px 0 0;">
              <div class="eyebrow">What changed</div>
              ${renderStats()}
            </div>

            <ul class="result-list">
              ${outcome.details.map(item => `<li>${item}</li>`).join("")}
            </ul>

            <div class="ending-message">
              <strong>Stay aware.</strong> Before you share, ask what is confirmed, what is uncertain, and why the story is trying to make you react.
            </div>
          </div>

          <div>
            <div class="panel" style="margin:0 0 14px;">
              <div class="eyebrow">Key idea</div>
              <p style="margin:0;">Information did not just describe the crisis. It changed how people reacted to it — and those reactions changed the crisis itself.</p>
            </div>
            <button class="primary" id="restart">Play again</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("restart").addEventListener("click", restart);
  }

  function restart() {
    state.turn = 1;
    state.trust = 62;
    state.reach = 54;
    state.anger = 35;
    state.tension = 28;
    state.aster = 3;
    state.vara = 3;
    state.novi = 3;
    state.outcome = null;
    state.log = [];
    renderEvent(events[0]);
  }

  renderEvent(events[0]);
})();
