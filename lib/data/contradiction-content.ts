export interface ContradictionContent {
  title: string
  contradictions: Array<{
    id: string
    title: string
    description: string
    evidence: Array<{
      party: string
      claim: string
      source?: {
        document: string
        paragraph: string
        wordCount: number
      }
    }>
  }>
}

export const contradictionContent: ContradictionContent = {
  title: "Key Contradictions in Evidence",
  contradictions: [
    {
      id: "timeline-contradiction",
      title: "Timeline of Technology Development",
      description:
        "There are significant discrepancies in the timeline of when key technologies were developed and by whom.",
      evidence: [
        {
          party: "Plaintiff's Claim",
          claim:
            "Our team began development of the proprietary algorithm in January 2022, with documented proof in our internal records and git commits. The defendant only started similar work in June 2022, after our initial patent filing.",
          source: {
            document: "Plaintiff Exhibit A",
            paragraph: "development_timeline",
            wordCount: 120,
          },
        },
        {
          party: "Defendant's Claim",
          claim:
            "We have evidence of conceptual work dating back to November 2021, predating the plaintiff's claims. Our research team had already completed a working prototype by March 2022, which was demonstrated to investors.",
          source: {
            document: "Defendant Exhibit C",
            paragraph: "research_timeline",
            wordCount: 150,
          },
        },
      ],
    },
    {
      id: "partnership-termination",
      title: "Reason for Partnership Termination",
      description: "The parties provide conflicting accounts of why their initial partnership ended.",
      evidence: [
        {
          party: "Plaintiff's Position",
          claim:
            "The partnership was terminated after we discovered unauthorized use of our proprietary code in the defendant's separate commercial product, violating our explicit agreement.",
          source: {
            document: "Plaintiff Exhibit B",
            paragraph: "partnership_agreement",
            wordCount: 85,
          },
        },
        {
          party: "Defendant's Position",
          claim:
            "The partnership ended due to irreconcilable differences in product vision and the plaintiff's failure to meet agreed-upon development milestones. No proprietary code was used in our products, as confirmed by independent code review.",
          source: {
            document: "Defendant Exhibit D",
            paragraph: "termination_letter",
            wordCount: 110,
          },
        },
      ],
    },
    {
      id: "technical-specifications",
      title: "Technical Specifications Similarity",
      description:
        "There is disagreement about whether the technical specifications of both products indicate copying.",
      evidence: [
        {
          party: "Expert Witness for Plaintiff",
          claim:
            "The statistical analysis shows a 94% similarity in core algorithm structure between the plaintiff's original work and the defendant's implementation, far exceeding what would occur by coincidence.",
          source: {
            document: "Expert Report 1",
            paragraph: "statistical_analysis",
            wordCount: 200,
          },
        },
        {
          party: "Expert Witness for Defendant",
          claim:
            "The similarities in implementation are due to industry-standard approaches to solving this class of problem. When accounting for these standard practices, the unique elements show only 15% similarity, which is consistent with independent development.",
          source: {
            document: "Expert Report 2",
            paragraph: "industry_standards",
            wordCount: 180,
          },
        },
      ],
    },
  ],
}
