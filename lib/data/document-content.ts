// Document content data structure
export type DocumentContent = {
  title: string
  caseNumber: string
  introduction: {
    text: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }
  chronology: Array<{
    date: string
    text: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }>
  conclusion: {
    text: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }
  signature: {
    name: string
    firm: string
    date: string
  }
}

// Export the document content
// Replace the existing documentContent object with the following:

export const documentContent = {
  title: "Donald J. Trump, Sr Deposition Summary",
  subtitle: "Tarla Makaeff, et al., Plaintiffs, vs. Trump University, LLC, et al., Defendants.",
  sections: [
    {
      title: "DEPOSITION ABSTRACT",
      content:
        "Donald J. Trump, Sr. provided his personal details, including his name, birthdate, and address, and agreed to the deposition protocols, such as asking for clarification if needed, providing his best estimates, and answering questions audibly. He acknowledged his understanding of testifying under oath and confirmed that his health and lack of medication would not interfere with his testimony. Represented by three counsel, including David, Trump stated he would not consult his lawyer while a question was pending.\n\nTrump has extensive experience testifying, with over 100 depositions and court hearings. He recognized Plaintiffs' Exhibit 39 related to a lawsuit against Trump University, LLC, and identified it as a deposition notice. Although designated as the person most knowledgeable for a specific topic, he did not prepare for the deposition or review documents beforehand. He mentioned that Rhona Graff searched his office for documents, but he was not involved in the search process.\n\nTrump does not own a personal computer and relies on his corporation's computers. He confirmed a high approval rating for Trump University courses but was unsure of the document retention policies for both Trump University and the Trump Organization. He indicated that document retention varies by deal and is managed by different individuals within the company.",
      source: {
        document: "Deposition Transcript",
        paragraph: "1-20",
        wordCount: 215,
      },
    },
    {
      title: "KEY ADMISSIONS",
      content:
        'Trump acknowledges oath. \nDonald J. Trump, Sr. acknowledges that his testimony is given under oath with the same legal obligations as if he were in a court of law. (Donald J. Trump, Sr Depo. 9:5 - 9:8)\n\nFrequent Court Testifier \nDonald J. Trump, Sr. has participated in more than 100 court hearings. (Donald J. Trump, Sr Depo. 10:12 - 10:16)\n\nTrump University lawsuit title \nDonald J. Trump, Sr. read the title of a legal document involving a class-action lawsuit against Trump University, LLC. (Donald J. Trump, Sr Depo. 12:2 - 12:5)\n\nTrump University Deposition Notice Confirmation \nDonald J. Trump, Sr. acknowledges having seen the title "Notice of Taking a Videotaped Deposition of Trump University, LLC, Pursuant to Federal Rule of Civil Procedure 30(b)(6)". (Donald J. Trump, Sr Depo. 12:6 - 12:15)\n\nDonald J. Trump, Sr. acknowledges receiving a deposition notice for Topic No. 16 related to Trump University, LLC, but is unable to testify on this topic due to a court order. (Donald J. Trump, Sr Depo. 12:16 - 13:24)\n\nDonald J. Trump, Sr. confirmed that "Trump University" refers to both Trump University, LLC and Trump Entrepreneurial Initiative. (Donald J. Trump, Sr Depo. 14:1 - 14:8)\n\nTrump as 30(b)(6) Designee \nDonald J. Trump, Sr. was appointed as the primary knowledgeable representative, or 30(b)(6) designee, for a particular subject outlined in the deposition notice. (Donald J. Trump, Sr Depo. 14:16 - 15:4)\n\nTrump\'s Deposition Confidentiality \nDonald J. Trump, Sr. only discussed his deposition with his counsel, Mr. Schneider. (Donald J. Trump, Sr Depo. 15:5 - 15:7)\n\nMinimal Preparation for Deposition \nDonald J. Trump, Sr. testified that he did not prepare for his deposition. (Donald J. Trump, Sr Depo. 15:8 - 15:9)\n\nDonald J. Trump, Sr. had a 10-minute discussion with his counsel this morning about his deposition. (Donald J. Trump, Sr Depo. 15:10 - 15:18)\n\nDonald J. Trump, Sr. did not review any documents specifically to prepare for the deposition. (Donald J. Trump, Sr Depo. 15:19 - 15:22)\n\nDonald J. Trump, Sr. testified that he believed documents were searched for and provided as requested, with his office being searched by Rhona Graff without his direct involvement or direction. (Donald J. Trump, Sr Depo. 15:23 - 17:5)\n\nDonald J. Trump, Sr. does not own or use a personal computer. \nDonald J. Trump, Sr. stated that he does not personally own a laptop or computer, although the corporation possesses many computers. (Donald J. Trump, Sr Depo. 17:6 - 17:11)\n\nDonald J. Trump, Sr. stated that he does not possess any computers outside of his office. (Donald J. Trump, Sr Depo. 17:12 - 17:14)\n\nDonald J. Trump, Sr. testified that he does not have a computer at home and is unaware of whom Rhona consulted regarding the search for documents. (Donald J. Trump, Sr Depo. 17:15 - 17:19)\n\nDonald J. Trump, Sr. did not consult any materials to refresh his memory prior to the deposition. (Donald J. Trump, Sr Depo. 17:20 - 17:22)\n\nDonald J. Trump, Sr. testified that he confirmed a 95 to 97 percent approval rating for Trump University courses, which he obtained from George Sorial without knowing the source or basis of the rating. (Donald J. Trump, Sr Depo. 17:23 - 19:7)\n\nDonald J. Trump, Sr. is uncertain about the existence of a document retention policy at Trump University. (Donald J. Trump, Sr Depo. 19:8 - 19:10)\n\nDonald J. Trump, Sr. testified that he is unaware of the exact document retention policy of the Trump Organization, noting that it varies by deal and is managed by different individuals within the company. (Donald J. Trump, Sr Depo. 19:11 - 20:4)\n\nDonald J. Trump, Sr. testified that he does not own a personal computer. (Donald J. Trump, Sr Depo. 20:5 - 20:16)',
      source: {
        document: "Deposition Transcript",
        paragraph: "9-20",
        wordCount: 650,
      },
    },
    {
      title: "TABLE OF CONTENTS",
      content:
        "\n\nEXAMINATION\nTrump Greets During Deposition\n\nDonald Trump States Name and DOB\n\nDonald Trump Testifies on Deposition Procedures and Document Handling\n\nTrump Denies Having a Personal Computer\n\nTrump Denies Document Destruction",
      source: {
        document: "Deposition Transcript",
        paragraph: "TOC",
        wordCount: 40,
      },
    },
  ],
  conclusion: {
    text: "Transcript",
    source: {
      document: "Deposition Transcript",
      paragraph: "Final",
      wordCount: 1,
    },
  },
}
