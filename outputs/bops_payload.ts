interface BOPSPayload {
  proposal_details: Array<QuestionAndResponses>;
}

interface QuestionAndResponses {
  question: string;
  metadata?: {
    notes?: string;
    auto_answered?: boolean;
    policy_refs?: Array<{
      url?: string;
      text?: string;
    }>;
  };
  responses: Array<{
    value: string;
    metadata?: {
      flags?: Array<string>;
    };
  }>;
}

const payload: BOPSPayload = {
  proposal_details: [
    {
      question: "what are you planning to do?",
      metadata: {
        notes: "this will be done before rebuilding",
      },
      responses: [
        {
          value: "demolish",
        },
        {
          value: "build new",
        },
      ],
    },
    {
      question: "is the property in this specific region?",
      metadata: {
        auto_answered: true,
      },
      responses: [
        {
          value: "no",
        },
      ],
    },
    {
      question:
        "will the new build's footprint occupy more than 50% available land?",
      metadata: {
        policy_refs: [
          { url: "http://example.com/planning/policy/1/234/a.html" },
          { text: "GPDO 32.2342.223", url: "http://example.com/gpdo.pdf" },
          { text: "Southwark SPD figure 123.31" },
        ],
      },
      responses: [
        {
          value: "yes",
        },
      ],
    },
    {
      question: "when was the original property built?",
      responses: [
        {
          value: "don't know",
          metadata: {
            flags: ["Missing information"],
          },
        },
      ],
    },
    {
      question: "please describe the project",
      responses: [
        {
          value: "extension demolition followed by a rebuild",
        },
      ],
    },
  ],
};
