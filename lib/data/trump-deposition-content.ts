// Trump deposition content data structure
export type DepositionContent = {
  title: string
  subtitle: string
  disclaimer?: string
  introduction?: {
    text: string
    source: any
  }
  sections: Array<{
    title: string
    content?: string
    bulletPoints?: Array<{
      title?: string
      content: string
      citation?: string
    }>
    tableRows?: Array<{
      time: string
      description: string
    }>
    examSections?: Array<{
      title: string
      content: string
    }>
    topicSummaries?: Array<{
      topic: string
      summary: string
      citation: string
    }>
    transcriptItems?: Array<{
      citation: string
      text: string
      summary: string
    }>
    subsections?: Array<{
      title?: string
      content: string
      source?: {
        document: string
        paragraph: string
        page?: string
        lines?: string
      }
    }>
  }>
  chronology: any[]
  conclusion: {
    text: string
    source: any
  }
}

// Updated document content for the Trump deposition summary with the complete content from the PDF
export const trumpDepositionContent: DepositionContent = {
  title: "Donald J. Trump, Sr Deposition Summary",
  subtitle: "Tarla Makaeff, et al., Plaintiffs, vs. Trump University, LLC, et al., Defendants.",
  disclaimer: "DISCLAIMER: AI-GENERATED SUMMARY. VERIFY BEFORE OFFICIAL USE.",
  sections: [
    {
      title: "DEPOSITION ABSTRACT",
      content:
        "Donald J. Trump, Sr. provided his personal details, including his name, birthdate, and address, and agreed to the deposition protocols, such as asking for clarification if needed, providing his best estimates, and answering questions audibly. He acknowledged his understanding of testifying under oath and confirmed that his health and lack of medication would not interfere with his testimony. Represented by three counsel, including David, Trump stated he would not consult his lawyer while a question was pending.\n\nTrump has extensive experience testifying, with over 100 depositions and court hearings. He recognized Plaintiffs' Exhibit 39 related to a lawsuit against Trump University, LLC, and identified it as a deposition notice. Although designated as the person most knowledgeable for a specific topic, he did not prepare for the deposition or review documents beforehand. He mentioned that Rhona Graff searched his office for documents, but he was not involved in the search process.\n\nTrump does not own a personal computer and relies on his corporation's computers. He confirmed a high approval rating for Trump University courses but was unsure of the document retention policies for both Trump University and the Trump Organization. He indicated that document retention varies by deal and is managed by different individuals within the company.",
    },
    {
      title: "KEY ADMISSIONS",
      content: "",
      bulletPoints: [
        {
          title: "Trump acknowledges oath.",
          content:
            "Donald J. Trump, Sr. acknowledges that his testimony is given under oath with the same legal obligations as if he were in a court of law.",
          citation: "Donald J. Trump, Sr Depo. 9:5 - 9:8",
        },
        {
          title: "Frequent Court Testifier",
          content: "Donald J. Trump, Sr. has participated in more than 100 court hearings.",
          citation: "Donald J. Trump, Sr Depo. 10:12 - 10:16",
        },
        {
          title: "Trump University lawsuit title",
          content:
            "Donald J. Trump, Sr. read the title of a legal document involving a class-action lawsuit against Trump University, LLC.",
          citation: "Donald J. Trump, Sr Depo. 12:2 - 12:5",
        },
        {
          title: "Trump University Deposition Notice Confirmation",
          content:
            'Donald J. Trump, Sr. acknowledges having seen the title "Notice of Taking a Videotaped Deposition of Trump University, LLC, Pursuant to Federal Rule of Civil Procedure 30(b)(6)".',
          citation: "Donald J. Trump, Sr Depo. 12:6 - 12:15",
        },
        {
          content:
            "Donald J. Trump, Sr. acknowledges receiving a deposition notice for Topic No. 16 related to Trump University, LLC, but is unable to testify on this topic due to a court order.",
          citation: "Donald J. Trump, Sr Depo. 12:16 - 13:24",
        },
        {
          content:
            'Donald J. Trump, Sr. confirmed that "Trump University" refers to both Trump University, LLC and Trump Entrepreneurial Initiative.',
          citation: "Donald J. Trump, Sr Depo. 14:1 - 14:8",
        },
        {
          title: "Trump as 30(b)(6) Designee",
          content:
            "Donald J. Trump, Sr. was appointed as the primary knowledgeable representative, or 30(b)(6) designee, for a particular subject outlined in the deposition notice.",
          citation: "Donald J. Trump, Sr Depo. 14:16 - 15:4",
        },
        {
          title: "Trump's Deposition Confidentiality",
          content: "Donald J. Trump, Sr. only discussed his deposition with his counsel, Mr. Schneider.",
          citation: "Donald J. Trump, Sr Depo. 15:5 - 15:7",
        },
        {
          title: "Minimal Preparation for Deposition",
          content: "Donald J. Trump, Sr. testified that he did not prepare for his deposition.",
          citation: "Donald J. Trump, Sr Depo. 15:8 - 15:9",
        },
        {
          content:
            "Donald J. Trump, Sr. had a 10-minute discussion with his counsel this morning about his deposition.",
          citation: "Donald J. Trump, Sr Depo. 15:10 - 15:18",
        },
        {
          content: "Donald J. Trump, Sr. did not review any documents specifically to prepare for the deposition.",
          citation: "Donald J. Trump, Sr Depo. 15:19 - 15:22",
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he believed documents were searched for and provided as requested, with his office being searched by Rhona Graff without his direct involvement or direction.",
          citation: "Donald J. Trump, Sr Depo. 15:23 - 17:5",
        },
        {
          title: "Donald J. Trump, Sr. does not own or use a personal computer.",
          content:
            "Donald J. Trump, Sr. stated that he does not personally own a laptop or computer, although the corporation possesses many computers.",
          citation: "Donald J. Trump, Sr Depo. 17:6 - 17:11",
        },
        {
          content: "Donald J. Trump, Sr. stated that he does not possess any computers outside of his office.",
          citation: "Donald J. Trump, Sr Depo. 17:12 - 17:14",
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he does not have a computer at home and is unaware of whom Rhona consulted regarding the search for documents.",
          citation: "Donald J. Trump, Sr Depo. 17:15 - 17:19",
        },
        {
          content: "Donald J. Trump, Sr. did not consult any materials to refresh his memory prior to the deposition.",
          citation: "Donald J. Trump, Sr Depo. 17:20 - 17:22",
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he confirmed a 95 to 97 percent approval rating for Trump University courses, which he obtained from George Sorial without knowing the source or basis of the rating.",
          citation: "Donald J. Trump, Sr Depo. 17:23 - 19:7",
        },
        {
          content:
            "Donald J. Trump, Sr. is uncertain about the existence of a document retention policy at Trump University.",
          citation: "Donald J. Trump, Sr Depo. 19:8 - 19:10",
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he is unaware of the exact document retention policy of the Trump Organization, noting that it varies by deal and is managed by different individuals within the company.",
          citation: "Donald J. Trump, Sr Depo. 19:11 - 20:4",
        },
        {
          content: "Donald J. Trump, Sr. testified that he does not own a personal computer.",
          citation: "Donald J. Trump, Sr Depo. 20:5 - 20:16",
        },
      ],
    },
    {
      title: "TABLE OF CONTENTS",
      content: "",
      tableRows: [
        { time: "7:16 - 7:17", description: "Trump Greets During Deposition" },
        { time: "7:18 - 7:23", description: "Donald Trump States Name and DOB" },
        { time: "7:24 - 20:4", description: "Donald Trump Testifies on Deposition Procedures and Document Handling" },
        { time: "20:5 - 20:16", description: "Trump Denies Having a Personal Computer" },
        { time: "20:17 - 20:22", description: "Trump Denies Document Destruction" },
      ],
    },
    {
      title: "EXAMINATION",
      content: "",
      examSections: [
        { title: "Trump Greets During Deposition", content: "" },
        { title: "Donald Trump States Name and DOB", content: "" },
        { title: "Donald Trump Testifies on Deposition Procedures and Document Handling", content: "" },
      ],
      topicSummaries: [
        {
          topic: "Greeting The Questioner",
          summary: 'Donald J. Trump, Sr. greeted the questioner with "Good morning."',
          citation: "7:16 - 7:17",
        },
        {
          topic: "Birthdate: June 14, 1946",
          summary: "Donald John Trump, T-R-U-M-P. June 14th, 1946.",
          citation: "7:18 - 7:23",
        },
        {
          topic: "725 Fifth Avenue",
          summary: "Donald J. Trump, Sr's address is 725 Fifth Avenue, New York.",
          citation: "7:24 - 8:1",
        },
        {
          topic: "Agrees To Clarify Questions",
          summary: "Donald J. Trump, Sr. agrees to ask for clarification if he does not understand a question.",
          citation: "8:2 - 8:8",
        },
        {
          topic: "Best Estimate If Unsure",
          summary: "Donald J. Trump, Sr. agrees to provide his best estimate if he does not know the exact answer.",
          citation: "8:9 - 8:13",
        },
        {
          topic: "Agrees To Answer Questions",
          summary:
            "Donald J. Trump, Sr. agrees to answer questions unless explicitly instructed by his attorney not to do so.",
          citation: "8:14 - 8:18",
        },
        {
          topic: "Agrees To Audible Answers",
          summary: "Donald J. Trump, Sr. agrees to audibly give answers instead of nodding or shaking his head.",
          citation: "8:19 - 8:23",
        },
        {
          topic: "Breaks Only Between Questions",
          summary: "Donald J. Trump, Sr. agrees to take breaks only when no question is pending.",
          citation: "8:24 - 9:4",
        },
        {
          topic: "Testifying Under Oath",
          summary: "Donald J. Trump, Sr. understands that he is testifying under oath as if he were in a court of law.",
          citation: "9:5 - 9:8",
        },
        {
          topic: "Represented By Three",
          summary: "Donald J. Trump, Sr. is represented by three counsel.",
          citation: "9:9 - 9:11",
        },
        {
          topic: "Counsel Identification",
          summary: "Donald J. Trump, Sr. identified David as his counsel.",
          citation: "9:12 - 9:13",
        },
        {
          topic: "Agreed Not To Ask",
          summary: "Donald J. Trump, Sr. agreed not to ask his lawyer questions while a question is pending.",
          citation: "9:14 - 9:18",
        },
        {
          topic: "Health Won't Interfere",
          summary:
            "Donald J. Trump, Sr. states that there is nothing about his health that would interfere with his ability to give his best testimony.",
          citation: "9:19 - 9:22",
        },
        {
          topic: "No Memory-interfering Medications",
          summary: "Donald J. Trump, Sr. is not on any medications that would interfere with his memory.",
          citation: "9:23 - 10:1",
        },
        {
          topic: "Testified Over 100 Times",
          summary: "Donald J. Trump, Sr. has testified many times, estimating over 100, including at depositions.",
          citation: "10:2 - 10:11",
        },
        {
          topic: "Testified 100+ Times",
          summary: "Donald J. Trump, Sr. has testified at over 100 court hearings.",
          citation: "10:12 - 10:16",
        },
        {
          topic: "Testified At Hearings",
          summary:
            "Donald J. Trump, Sr. has testified at regulatory hearings, including environmental ones, but does not know the exact number, possibly hundreds.",
          citation: "10:17 - 10:23",
        },
        {
          topic: "Uncertain Lawsuit Count",
          summary:
            "Donald J. Trump, Sr. does not know how many lawsuits he has been a party to and cannot confirm if it is under a thousand.",
          citation: "10:24 - 11:15",
        },
        {
          topic: "Seen Exhibit 39",
          summary: "Donald J. Trump, Sr. has seen Plaintiffs' Exhibit 39 before.",
          citation: "11:16 - 11:18",
        },
        {
          topic: "Viewed Exhibit 39",
          summary:
            "Donald J. Trump, Sr. stated that he viewed Plaintiffs' Exhibit 39 in relation to the lawsuit against him.",
          citation: "11:19 - 12:1",
        },
        {
          topic: "Document Title Reading",
          summary:
            'Donald J. Trump, Sr. read the title of the document as "Tarla Makaeff, et al., on Behalf of Themselves and all Others Similarly Situated, as the Plaintiff, vs. Trump University, LLC, Defendant."',
          citation: "12:2 - 12:5",
        },
        {
          topic: "Deposition Notice Seen",
          summary:
            'Donald J. Trump, Sr. confirms seeing the title "Notice of Taking a Videotaped Deposition of Trump University, LLC, Pursuant to Federal Rule of Civil Procedure 30(b)(6)".',
          citation: "12:6 - 12:15",
        },
        {
          topic: "Deposition Notice, Court Order",
          summary:
            "Donald J. Trump, Sr. believes the document is a deposition notice. He is designated for Topic No. 16 regarding Trump University, LLC, but will not testify on this topic due to a court order.",
          citation: "12:16 - 13:24",
        },
        {
          topic: "Trump University Entities",
          summary:
            'Donald J. Trump, Sr. agrees that "Trump University" refers to both Trump University, LLC and Trump Entrepreneurial Initiative.',
          citation: "14:1 - 14:8",
        },
        {
          topic: "Unfamiliar With 30(b)(6)",
          summary: "Donald J. Trump, Sr. does not know what a 30(b)(6) is.",
          citation: "14:9 - 14:15",
        },
        {
          topic: "30(b)(6) Designee",
          summary:
            "Donald J. Trump, Sr. was designated as the person most knowledgeable, or a 30(b)(6) designee, for a specific topic in the deposition notice.",
          citation: "14:16 - 15:4",
        },
        {
          topic: "Discussed Only With Counsel",
          summary:
            "Donald J. Trump, Sr. did not discuss his deposition with anyone other than his counsel, Mr. Schneider.",
          citation: "15:5 - 15:7",
        },
        {
          topic: "Unprepared For Deposition",
          summary: "Donald J. Trump, Sr. stated he did not prepare for his deposition.",
          citation: "15:8 - 15:9",
        },
        {
          topic: "Spoke To Counsel",
          summary: "Donald J. Trump, Sr. spoke to his counsel for 10 minutes this morning regarding his deposition.",
          citation: "15:10 - 15:18",
        },
        {
          topic: "No Document Review",
          summary: "Donald J. Trump, Sr. did not review any documents specifically in preparation for the deposition.",
          citation: "15:19 - 15:22",
        },
        {
          topic: "Office Search Details",
          summary:
            "Donald J. Trump, Sr. stated that he believed they were asked to search for documents and provided whatever they had. He confirmed that his office was searched by Rhona Graff, but he did not direct her where to search or discuss the search with her. He was not involved in any discussions directly.",
          citation: "15:23 - 17:5",
        },
        {
          topic: "No Personal Computer",
          summary:
            "Donald J. Trump, Sr. does not have a laptop or a personal computer. He acknowledges that the corporation has many computers, but he does not personally own one.",
          citation: "17:6 - 17:11",
        },
        {
          topic: "No Home Computers",
          summary: "Donald J. Trump, Sr. does not have any computers outside of the office.",
          citation: "17:12 - 17:14",
        },
        {
          topic: "No Home Computer",
          summary:
            "Donald J. Trump, Sr. does not have a computer at home and does not know who Rhona spoke to about the search for documents.",
          citation: "17:15 - 17:19",
        },
        {
          topic: "No Review Conducted",
          summary:
            "Donald J. Trump, Sr. did not review any information to refresh his recollection for the deposition.",
          citation: "17:20 - 17:22",
        },
        {
          topic: "Approval Rating Review",
          summary:
            "Donald J. Trump, Sr. stated that he reviewed and confirmed a 95 to 97 percent approval rating for Trump University courses. He asked George Sorial for this information but does not know how Sorial obtained it or what the approval rating was based on.",
          citation: "17:23 - 19:7",
        },
        {
          topic: "Unaware Of Document Policy",
          summary: "Donald J. Trump, Sr. does not know if Trump University has a document retention policy.",
          citation: "19:8 - 19:10",
        },
        {
          topic: "Uncertain Document Retention",
          summary:
            "Donald J. Trump, Sr. does not know the exact document retention policy of the Trump Organization. He states that document retention depends on the specific deal or transaction. He indicates that many different people are in charge of various deals within the company, and each may have different policies.",
          citation: "19:11 - 20:4",
        },
      ],
    },
    {
      title: "Trump Denies Having a Personal Computer",
      content: "",
      topicSummaries: [
        {
          topic: "No Personal Computer",
          summary: "Donald J. Trump, Sr. states that he does not have a personal computer.",
          citation: "20:5 - 20:16",
        },
      ],
    },
    {
      title: "Trump Denies Document Destruction",
      content: "",
      topicSummaries: [
        {
          topic: "Document Destruction Inquiry",
          summary: "Donald J. Trump, Sr. is asked if anyone goes into his paper files to delete or destroy documents.",
          citation: "20:17 - 20:22",
        },
      ],
    },
    {
      title: "Transcript",
      content: "",
      transcriptItems: [
        {
          citation: "7:16 - 7:17",
          text: "Q  Good morning, Mr. Trump.\nA  Good morning.",
          summary: "",
        },
        {
          citation: "7:18 - 7:23",
          text: "Q  My name is Rachel Jensen. I'm here on behalf of the plaintiffs. If you could please first state and spell your name and your date of birth for the record.\nA  Donald John Trump, T-R-U-M-P. June 14th, 1946.",
          summary: "",
        },
        {
          citation: "7:24 - 8:1",
          text: "Q  And what is your address?\nA  725 Fifth Avenue, New York.",
          summary: "",
        },
        {
          citation: "8:2 - 8:8",
          text: "Q  Now, before we get started, I'd like to go over a couple of ground rules today. Now, when I ask you a question, I'm going to assume that you understand the question unless you ask me to clarify. Is that fair?\nA  Yes.",
          summary: "",
        },
        {
          citation: "8:9 - 8:13",
          text: "Q  And when I'm asking you a question, I'm entitled to your best guesstimate. Is that fair? If you don't know the exact answer.\nA  Yeah.",
          summary: "",
        },
        {
          citation: "8:14 - 8:18",
          text: "Q  Your attorney may be making some objections throughout the day. Unless he explicitly instructs you not to answer, you are to answer. Is that fair?\nA  Yes.",
          summary: "",
        },
        {
          citation: "8:19 - 8:23",
          text: "Q  And then also, just so we have a clear record today, you must audibly give an answer, not nod or shake your head. Is that fair?\nA  Yes.",
          summary: "",
        },
        {
          citation: "8:24 - 9:4",
          text: "Q  And also, you can take a break at any time, but please not while there's a question pending. Is that fair?\nA  Yes.",
          summary: "",
        },
        {
          citation: "9:5 - 9:8",
          text: "Q  Now, the court reporter has administered an oath to you today. Do you understand that you are here just as though you were in a court of law?\nA  Yes.",
          summary: "",
        },
        {
          citation: "9:9 - 9:11",
          text: "Q  Are you represented by counsel here today?\nA  Yes. Three.",
          summary: "",
        },
        {
          citation: "9:12 - 9:13",
          text: "Q  And who is your counsel?\nA  Right here, David.",
          summary: "",
        },
        {
          citation: "9:14 - 9:18",
          text: "Q  And also, you may ask your lawyer questions throughout the day, but, please, not while there is a question pending. Is that fair?\nA  Yes.",
          summary: "",
        },
        {
          citation: "9:19 - 9:22",
          text: "Q  Is there anything about your health that would interfere with your ability to give your best testimony today?\nA  No.",
          summary: "",
        },
        {
          citation: "9:23 - 10:1",
          text: "Q  Are you on any medications that would interfere with your memory?\nA  No.",
          summary: "",
        },
        {
          citation: "10:2 - 10:11",
          text: "Q  Have you ever testified before?\nA  Yes.\nQ  And how many times?\nA  I don't know. Many times.\nQ  Your best estimate?\nA  I have no idea.\nQ  Hundreds?\nA  Over 100.\nQ  Okay. At depositions?\nA  Yes.",
          summary: "",
        },
        {
          citation: "10:12 - 10:16",
          text: "Q  And court hearings, have you ever testified at a court hearing?\nA  Yes.\nQ  How many?\nA  Over 100.",
          summary: "",
        },
        {
          citation: "10:17 - 10:23",
          text: "Q  And how about a regulatory hearing?\nA  Yes.\nQ  How many?\nA  Just -- we have environmental hearings. We have so many different types, I have no idea.\nQ  Hundreds?\nA  I don't know.",
          summary: "",
        },
        {
          citation: "10:24 - 11:15",
          text: "Q  How many lawsuits have you been a party to?\nA  I don't know.\nQ  Would you say hundreds?\nA  I just don't know. Normal course of business, unfortunately. But I just don't know.\nQ  Under a thousand?\nA  I don't know. MS. JENSEN: I'm going to ask the court reporter to mark the first exhibit for the day, which was also the Exhibit 1 to the Sexton deposition. (Plaintiffs' Exhibit 39 was marked for identification.) MS. JENSEN: David, here's a courtesy copy. BY MS. JENSEN:",
          summary: "",
        },
        {
          citation: "11:16 - 11:18",
          text: "Q  Mr. Trump, have you seen this document before?\nA  Yes.",
          summary: "",
        },
        {
          citation: "11:19 - 12:1",
          text: "Q  And what occasioned your viewing this document previously? MR. SCHNEIDER: I don't want you to talk about anything that we discussed. THE WITNESS: This was your, as I understand it, lawsuit against us. BY MS. JENSEN:",
          summary: "",
        },
        {
          citation: "12:2 - 12:5",
          text: 'Q  Could you read the title of the document.\nA  "Tarla Makaeff, et al., on Behalf of Themselves and all Others Similarly Situated, as the Plaintiff, vs. Trump University, LLC, Defendant."',
          summary: "",
        },
        {
          citation: "12:6 - 12:15",
          text: "Q  And to the right, there's a title of the document. If you could please read that.\nA  Where is the title?\nQ  The notice of taking -- how about this. We'll go at it this way. Do you see the title to the right is \"Notice of Taking a Videotaped Deposition of Trump University, LLC, Pursuant to Federal Rule of Civil Procedure 30(b)(6)\"?\nA  Yes.",
          summary: "",
        },
        {
          citation: "12:16 - 13:24",
          text: "Q  And is your understanding of this document that it's a deposition notice?\nA  I believe that's what it is.\nQ  And do you understand that you are designated as the person most knowledgeable as to Trump University, LLC, according to some of these topics in this document? MR. SCHNEIDER: No; he's here for item No. 16 only. We've already told you that. He's not going to be testifying about that because the Court has already ruled on that issue. So he won't be addressing any of the other issues of the 30(b)(6) representative. Mr. Sexton and Mr. Highbloom have already done that. MS. JENSEN: So you've designated him for Topic No. 16? MS. ECK: Right. MS. JENSEN: But you will not let him testify as to that topic? MR. SCHNEIDER: Pursuant to the Court order. The Court has already told you twice that he's not going to respond to questions on compensation that he received from Trump University. MS. JENSEN: For the record, I want the record to reflect that the defendants have designated Mr. Donald Trump for Topic No. 16 of this deposition notice; however, they are not allowing him to speak as to the topic that they have designated him on. So in the event that the Court does order the defendants to produce a witness as to this topic, the plaintiffs will then proceed to resume this deposition at a later time. BY MS. JENSEN:",
          summary: "",
        },
        {
          citation: "14:1 - 14:8",
          text: 'Q  Throughout the deposition I\'m going to be referring to "Trump University"; however, at some point I do know that the name was changed to Trump Entrepreneurial Initiative. So when I refer to "Trump University," I\'m actually referring to both entities. Is that fair?\nA  Yeah.',
          summary: "",
        },
        {
          citation: "14:9 - 14:15",
          text: "Q  How did you come to be designated as a 30(b)(6) witness for this deposition? MR. SCHNEIDER: I don't want you to talk about anything that we discussed. THE WITNESS: I don't know what a 30(b)(6) is. BY MS. JENSEN:",
          summary: "",
        },
        {
          citation: "14:16 - 15:4",
          text: "Q  So, as your counsel and I have just discussed on the record, you were designated for one of the topics as the person most knowledgeable, otherwise a 30(b)(6) designee, essentially, for a topic. And so my question is how did you come to be designated as a witness for this deposition notice? MR. SCHNEIDER: So only if you have information other than what you discussed with counsel. THE WITNESS: I really don't know. BY MS. JENSEN:",
          summary: "",
        },
        {
          citation: "15:5 - 15:7",
          text: "Q  Did you discuss your deposition today with anyone other than counsel?\nA  No.",
          summary: "",
        },
        {
          citation: "15:8 - 15:9",
          text: "Q  How did you prepare for your deposition?\nA  I didn't prepare.",
          summary: "",
        },
        {
          citation: "15:10 - 15:18",
          text: "Q  Did you talk to anyone regarding your deposition, including counsel? MR. SCHNEIDER: Just counsel for a few minutes prior to deposition. BY MS. JENSEN:\nQ  So this morning?\nA  Yes.\nQ  Approximately -- was it an hour?\nA  No. 10 minutes.",
          summary: "",
        },
        {
          citation: "15:19 - 15:22",
          text: "Q  10 minutes? Okay. Did you review any documents specifically in preparation for this deposition?\nA  No.",
          summary: "",
        },
        {
          citation: "15:23 - 17:5",
          text: "Q  Mr. Trump, were you asked to search for any documents for this case? MR. SCHNEIDER: I don't want you to talk about anything that was discussed between you and counsel, whether it was me or any of your other attorneys. THE WITNESS: I believe we might have been, and we gave you whatever we have. BY MS. JENSEN:\nQ  Did you personally search for any documents?\nA  I had my office searched, yes. But we gave you whatever we had.\nQ  Who at your office searched?\nA  It would have been Rhona Graff.\nQ  And do you have an understanding where Rhona searched for documents?\nA  No, I don't.\nQ  Did you indicate to her where she should search for documents?\nA  No, no.\nQ  And what specifically did you say to Rhona about searching for documents?\nA  I said nothing to her. She was asked, I think, by the lawyers to see if she has any documents. And whatever we had, if there was anything -- I don't know what she gave, but whatever we have, we would have given.\nQ  Okay. So you weren't involved in any of the discussions directly?\nA  No. No.",
          summary: "",
        },
        {
          citation: "17:6 - 17:11",
          text: "Q  Do you have a laptop?\nA  No, I don't.",
          summary: "",
        },
      ],
    },
  ],
  chronology: [],
  conclusion: {
    text: "",
    source: null,
  },
}

// Alternative format for the chronology document with the exact formatting requested
export const chronologyDocumentContent = {
  title: "Donald J. Trump, Sr Deposition Summary",
  subtitle: "Tarla Makaeff, et al., Plaintiffs, vs. Trump University, LLC, et al., Defendants.",
  introduction: {
    text: "",
    source: null,
  },
  sections: [
    {
      title: "DEPOSITION ABSTRACT",
      content:
        "Donald J. Trump, Sr. provided his personal details, including his name, birthdate, and address, and agreed to the deposition protocols, such as asking for clarification if needed, providing his best estimates, and answering questions audibly. He acknowledged his understanding of testifying under oath and confirmed that his health and lack of medication would not interfere with his testimony. Represented by three counsel, including David, Trump stated he would not consult his lawyer while a question was pending.  Trump has extensive experience testifying, with over 100 depositions and court hearings. He recognized Plaintiffs' Exhibit 39 related to a lawsuit against Trump University, LLC, and identified it as a deposition notice. Although designated as the person most knowledgeable for a specific topic, he did not prepare for the deposition or review documents beforehand. He mentioned that Rhona Graff searched his office for documents, but he was not involved in the search process.  Trump does not own a personal computer and relies on his corporation's computers. He confirmed a high approval rating for Trump University courses but was unsure of the document retention policies for both Trump University and the Trump Organization. He indicated that document retention varies by deal and is managed by different individuals within the company.",
    },
    {
      title: "KEY ADMISSIONS",
      content: "",
      subsections: [
        {
          title: "Trump acknowledges oath",
          content:
            "Donald J. Trump, Sr. acknowledges that his testimony is given under oath with the same legal obligations as if he were in a court of law.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "9",
            lines: "5 - 9:8",
          },
        },
        {
          title: "Frequent Court Testifier",
          content: "Donald J. Trump, Sr. has participated in more than 100 court hearings.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "10",
            lines: "12 - 10:16",
          },
        },
        {
          title: "Trump University lawsuit title",
          content:
            "Donald J. Trump, Sr. read the title of a legal document involving a class-action lawsuit against Trump University, LLC.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "12",
            lines: "2 - 12:5",
          },
        },
        {
          title: "Trump University Deposition Notice Confirmation",
          content:
            'Donald J. Trump, Sr. acknowledges having seen the title "Notice of Taking a Videotaped Deposition of Trump University, LLC, Pursuant to Federal Rule of Civil Procedure 30(b)(6)".',
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "12",
            lines: "6 - 12:15",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. acknowledges receiving a deposition notice for Topic No. 16 related to Trump University, LLC, but is unable to testify on this topic due to a court order.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "12",
            lines: "16 - 13:24",
          },
        },
        {
          content:
            'Donald J. Trump, Sr. confirmed that "Trump University" refers to both Trump University, LLC and Trump Entrepreneurial Initiative.',
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "14",
            lines: "1 - 14:8",
          },
        },
        {
          title: "Trump as 30(b)(6) Designee",
          content:
            "Donald J. Trump, Sr. was appointed as the primary knowledgeable representative, or 30(b)(6) designee, for a particular subject outlined in the deposition notice.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "14",
            lines: "16 - 15:4",
          },
        },
        {
          title: "Trump's Deposition Confidentiality",
          content: "Donald J. Trump, Sr. only discussed his deposition with his counsel, Mr. Schneider.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "15",
            lines: "5 - 15:7",
          },
        },
        {
          title: "Minimal Preparation for Deposition",
          content: "Donald J. Trump, Sr. testified that he did not prepare for his deposition.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "15",
            lines: "8 - 15:9",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. had a 10-minute discussion with his counsel this morning about his deposition.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "15",
            lines: "10 - 15:18",
          },
        },
        {
          content: "Donald J. Trump, Sr. did not review any documents specifically to prepare for the deposition.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "15",
            lines: "19 - 15:22",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he believed documents were searched for and provided as requested, with his office being searched by Rhona Graff without his direct involvement or direction.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "15",
            lines: "23 - 17:5",
          },
        },
        {
          title: "Donald J. Trump, Sr. does not own or use a personal computer.",
          content:
            "Donald J. Trump, Sr. stated that he does not personally own a laptop or computer, although the corporation possesses many computers.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "17",
            lines: "6 - 17:11",
          },
        },
        {
          content: "Donald J. Trump, Sr. stated that he does not possess any computers outside of his office.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "17",
            lines: "12 - 17:14",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he does not have a computer at home and is unaware of whom Rhona consulted regarding the search for documents.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "17",
            lines: "15 - 17:19",
          },
        },
        {
          content: "Donald J. Trump, Sr. did not consult any materials to refresh his memory prior to the deposition.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "17",
            lines: "20 - 17:22",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he confirmed a 95 to 97 percent approval rating for Trump University courses, which he obtained from George Sorial without knowing the source or basis of the rating.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "17",
            lines: "23 - 19:7",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. is uncertain about the existence of a document retention policy at Trump University.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "19",
            lines: "8 - 19:10",
          },
        },
        {
          content:
            "Donald J. Trump, Sr. testified that he is unaware of the exact document retention policy of the Trump Organization, noting that it varies by deal and is managed by different individuals within the company.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "19",
            lines: "11 - 20:4",
          },
        },
        {
          content: "Donald J. Trump, Sr. testified that he does not own a personal computer.",
          source: {
            document: "Donald J. Trump, Sr Depo.",
            paragraph: "",
            page: "20",
            lines: "5 - 20:16",
          },
        },
      ],
    },
    {
      title: "TABLE OF CONTENTS",
      content: "",
    },
    {
      title: "EXAMINATION",
      content: "",
      subsections: [
        {
          title: "Trump Greets During Deposition",
          content: "",
        },
        {
          title: "Donald Trump States Name and DOB",
          content: "",
        },
        {
          title: "Donald Trump Testifies on Deposition Procedures and Document Handling",
          content: "",
        },
        {
          title: "Trump Denies Having a Personal Computer",
          content: "",
        },
        {
          title: "Trump Denies Document Destruction",
          content: "",
        },
      ],
    },
    {
      title: "Transcript",
      content: "",
    },
  ],
  chronology: [],
  conclusion: {
    text: "",
    source: null,
  },
}
