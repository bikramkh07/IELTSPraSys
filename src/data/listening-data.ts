export type QuestionType = 'fill' | 'mcq' | 'matching';

export interface FillQuestion {
  type: 'fill';
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  answer: string;
}

export interface McqQuestion {
  type: 'mcq';
  id: string;
  text: string;
  options: string[];
  answer: string;
}

export interface MatchingQuestion {
  type: 'matching';
  id: string;
  text: string;
  options: string[];
  answer: string;
}

export type ListeningQuestion = FillQuestion | McqQuestion | MatchingQuestion;

export interface ListeningSection {
  section: number;
  title: string;
  topic: string;
  badge: string;
  difficulty: string;
  questionRange: string;
  passage: string;
  estimatedDuration: number;
  questions: ListeningQuestion[];
}

export interface ListeningTest {
  id: string;
  name: string;
  sections: ListeningSection[];
}

export const LISTENING_TESTS: ListeningTest[] = [
  {
    id: 'lt-1',
    name: 'Practice Test 1',
    sections: [
      {
        section: 1,
        title: 'Listening — Section 1',
        topic: 'Riverside Health Club Inquiry',
        badge: 'Conversation · Beginner',
        difficulty: 'Beginner',
        questionRange: 'Questions 1–10',
        estimatedDuration: 65,
        passage: `Good morning, Riverside Health Club. My name is Jenny. How can I help you?\n\nHi, Jenny. I'm interested in joining the club. Could you give me some information about the membership options?\n\nOf course. We have three types of membership. The basic plan costs 35 pounds per month, and that gives you access to the gym and the swimming pool. The standard plan is 52 pounds per month and includes all the basic facilities plus group fitness classes. And finally, the premium plan is 78 pounds per month, which gives you unlimited access to everything, including personal training sessions.\n\nThat sounds good. I think the standard plan would suit me best. What are your opening hours?\n\nWe're open from 6 in the morning until 10 at night on weekdays. On Saturdays we open at 8 and close at 8. And on Sundays we're open from 9 until 6 in the evening.\n\nGreat. And is there a car park available?\n\nYes, we have a free car park at the back of the building with space for 120 cars. We also have bicycle racks near the main entrance if you prefer to cycle.\n\nPerfect. I'd also like to know about the swimming pool. What are the pool dimensions?\n\nThe main pool is 25 metres long. We also have a smaller children's pool which is heated to 30 degrees. The main pool temperature is kept at 27 degrees throughout the year.\n\nAnd are there any joining fees?\n\nYes, there's a one-off registration fee of 45 pounds, which covers your membership card and initial fitness assessment.`,
        questions: [
          { type: 'fill', id: 'lq1', label: '1. The basic membership costs', hint: 'per month', placeholder: 'e.g. 25 pounds', answer: '35 pounds' },
          { type: 'fill', id: 'lq2', label: '2. The standard plan costs', hint: 'per month', placeholder: 'e.g. 40 pounds', answer: '52 pounds' },
          { type: 'fill', id: 'lq3', label: '3. The premium plan includes', hint: 'special feature', placeholder: 'e.g. yoga classes', answer: 'personal training' },
          { type: 'fill', id: 'lq4', label: '4. On weekdays the club opens at', hint: 'time', placeholder: 'e.g. 7 am', answer: '6' },
          { type: 'fill', id: 'lq5', label: '5. On Sundays the club closes at', hint: 'time', placeholder: 'e.g. 5 pm', answer: '6' },
          { type: 'fill', id: 'lq6', label: '6. The car park has space for', hint: 'number', placeholder: 'e.g. 80', answer: '120' },
          { type: 'fill', id: 'lq7', label: '7. The main pool is', hint: 'length', placeholder: 'e.g. 50 metres', answer: '25 metres' },
          { type: 'fill', id: 'lq8', label: '8. The children\'s pool is heated to', hint: 'temperature', placeholder: 'e.g. 28 degrees', answer: '30 degrees' },
          { type: 'fill', id: 'lq9', label: '9. The main pool temperature is', hint: 'degrees', placeholder: 'e.g. 25 degrees', answer: '27 degrees' },
          { type: 'fill', id: 'lq10', label: '10. The registration fee is', hint: 'amount', placeholder: 'e.g. 30 pounds', answer: '45 pounds' },
        ],
      },
      {
        section: 2,
        title: 'Listening — Section 2',
        topic: 'Community Radio Station Tour',
        badge: 'Monologue · Intermediate',
        difficulty: 'Intermediate',
        questionRange: 'Questions 11–20',
        estimatedDuration: 70,
        passage: `Welcome to the Community Radio Station tour. My name is Sarah, and I'll be showing you around our facilities today. Our station was founded in 1998 by a group of local volunteers who wanted to give a voice to the community. Since then, we've grown considerably, and now we cover a radius of 30 kilometres, reaching over 50,000 listeners each week.\n\nIf you're interested in volunteering with us, you'll need to commit to a minimum of 6 hours per week. Don't worry if you have no experience — we offer a comprehensive training course that lasts three weeks, covering everything from basic broadcasting techniques to interview skills.\n\nOur main studio is located on the second floor of this building. It was recently refurbished with state-of-the-art equipment, including a professional mixing desk and sound-proof recording booths. Before you can start your first shift, all new volunteers must complete a security check — this is standard procedure for all broadcasting organisations.\n\nWe broadcast 18 hours a day, from 6 in the morning until midnight. Our most popular programme is the morning show, which attracts approximately 12,000 listeners. The afternoon music slot comes in second with about 8,500 regular listeners.\n\nThe station is funded primarily through local business sponsorships, which account for about 60 percent of our income. Community fundraising events make up another 25 percent, and the remaining 15 percent comes from a government arts grant that we receive annually.`,
        questions: [
          { type: 'fill', id: 'lq11', label: '11. The station was founded in', hint: 'year', placeholder: 'e.g. 1994', answer: '1998' },
          { type: 'fill', id: 'lq12', label: '12. The station covers a radius of', hint: 'km', placeholder: 'e.g. 50', answer: '30' },
          { type: 'fill', id: 'lq13', label: '13. Weekly listeners number over', hint: 'number', placeholder: 'e.g. 20,000', answer: '50,000' },
          { type: 'fill', id: 'lq14', label: '14. Volunteers must commit to', hint: 'hours per week', placeholder: 'e.g. 4', answer: '6' },
          { type: 'fill', id: 'lq15', label: '15. The training course lasts', hint: 'duration', placeholder: 'e.g. two days', answer: 'three weeks' },
          { type: 'mcq', id: 'lq16', text: '16. Where is the main studio located?', options: ['Ground floor', 'Second floor', 'Third floor', 'Basement'], answer: 'Second floor' },
          { type: 'mcq', id: 'lq17', text: '17. What must new volunteers complete before starting?', options: ['A written exam', 'A security check', 'A health assessment', 'An interview'], answer: 'A security check' },
          { type: 'fill', id: 'lq18', label: '18. The morning show attracts approximately', hint: 'listeners', placeholder: 'e.g. 5,000', answer: '12,000' },
          { type: 'mcq', id: 'lq19', text: '19. What percentage of income comes from sponsorships?', options: ['25%', '45%', '60%', '75%'], answer: '60%' },
          { type: 'fill', id: 'lq20', label: '20. Government arts grant provides', hint: 'percentage', placeholder: 'e.g. 10%', answer: '15' },
        ],
      },
      {
        section: 3,
        title: 'Listening — Section 3',
        topic: 'University Research Project Discussion',
        badge: 'Discussion · Upper-Intermediate',
        difficulty: 'Upper-Intermediate',
        questionRange: 'Questions 21–30',
        estimatedDuration: 75,
        passage: `Professor, I wanted to discuss our research project on urban green spaces. We've collected data from 14 parks across the city over the past semester.\n\nExcellent work, Sarah. And what methodology did you use for the surveys?\n\nWe used a combination of structured questionnaires and observational studies. We surveyed a total of 840 park visitors across all sites. The response rate was quite good — about 72 percent.\n\nThat's above average for this kind of fieldwork. What were your initial findings?\n\nWell, the most significant finding was that parks with water features attracted 45 percent more visitors than those without. Also, parks near public transport hubs had consistently higher usage — on average 3 times more visitors per day.\n\nDid you look at demographic patterns?\n\nYes. The 25-to-34 age group was the most frequent user group, making up 38 percent of all visitors. Interestingly, the over-65 group was the second largest at 24 percent. Families with children under 12 accounted for about 19 percent.\n\nAnd what about the time-of-day patterns?\n\nPeak usage was between 10 AM and 2 PM on weekdays, but shifted to 3 PM to 7 PM on weekends. Saturday was by far the busiest day, with visitor numbers roughly double those of any weekday.\n\nFor your final report, I'd recommend focusing on the policy implications. The deadline for submission is March 15th, and it should be between 8,000 and 10,000 words.`,
        questions: [
          { type: 'fill', id: 'lq21', label: '21. Data was collected from', hint: 'number of parks', placeholder: 'e.g. 10', answer: '14' },
          { type: 'fill', id: 'lq22', label: '22. Total park visitors surveyed', hint: 'number', placeholder: 'e.g. 500', answer: '840' },
          { type: 'fill', id: 'lq23', label: '23. The survey response rate was', hint: 'percentage', placeholder: 'e.g. 65%', answer: '72' },
          { type: 'mcq', id: 'lq24', text: '24. Parks with water features attracted how much more visitors?', options: ['25%', '35%', '45%', '55%'], answer: '45%' },
          { type: 'fill', id: 'lq25', label: '25. Parks near transport hubs had', hint: 'times more visitors', placeholder: 'e.g. 2 times', answer: '3' },
          { type: 'fill', id: 'lq26', label: '26. The 25-to-34 age group made up', hint: 'percentage', placeholder: 'e.g. 30%', answer: '38' },
          { type: 'fill', id: 'lq27', label: '27. The over-65 group accounted for', hint: 'percentage', placeholder: 'e.g. 20%', answer: '24' },
          { type: 'mcq', id: 'lq28', text: '28. What was the peak usage time on weekdays?', options: ['8 AM – 12 PM', '10 AM – 2 PM', '12 PM – 4 PM', '2 PM – 6 PM'], answer: '10 AM – 2 PM' },
          { type: 'mcq', id: 'lq29', text: '29. Which was the busiest day?', options: ['Sunday', 'Friday', 'Saturday', 'Monday'], answer: 'Saturday' },
          { type: 'fill', id: 'lq30', label: '30. The report deadline is', hint: 'date', placeholder: 'e.g. April 1st', answer: 'March 15th' },
        ],
      },
      {
        section: 4,
        title: 'Listening — Section 4',
        topic: 'Lecture: Ocean Plastic Pollution',
        badge: 'Lecture · Advanced',
        difficulty: 'Advanced',
        questionRange: 'Questions 31–40',
        estimatedDuration: 80,
        passage: `Today's lecture focuses on the growing crisis of ocean plastic pollution. According to the latest research published in the journal Science, approximately 8 million metric tons of plastic enters the world's oceans every year. To put that in perspective, that's equivalent to dumping one rubbish truck of plastic into the ocean every single minute.\n\nThe five largest contributors to ocean plastic are China, Indonesia, the Philippines, Vietnam, and Sri Lanka — together accounting for roughly 56 percent of the global total. However, it's important to note that per capita, several Western nations produce significantly more plastic waste.\n\nMicroplastics — defined as plastic fragments smaller than 5 millimetres — pose perhaps the greatest threat. Research conducted by the University of Plymouth found that microplastics were present in one-third of all fish caught in the English Channel. These particles enter the food chain and have been detected in human blood samples in a study involving 22 volunteers.\n\nThe Great Pacific Garbage Patch, discovered in 1997 by Captain Charles Moore, now covers an area approximately 1.6 million square kilometres — roughly three times the size of France. Despite its name, it's not a solid island of waste but rather a diffuse soup of microplastic particles suspended in the upper water column.\n\nSeveral solutions are being implemented globally. The European Union banned single-use plastics in 2021, targeting the ten most commonly found items on European beaches. Kenya introduced one of the strictest plastic bag bans in the world, with penalties of up to 4 years in prison. On the technological front, a Dutch non-profit called The Ocean Cleanup has deployed a system that uses natural ocean currents to collect floating debris, aiming to remove 90 percent of ocean surface plastic by 2040.`,
        questions: [
          { type: 'fill', id: 'lq31', label: '31. Annual plastic entering oceans is', hint: 'amount', placeholder: 'e.g. 5 million', answer: '8 million' },
          { type: 'mcq', id: 'lq32', text: '32. How often is a truck-load of plastic dumped into the ocean?', options: ['Every hour', 'Every 30 minutes', 'Every minute', 'Every 5 minutes'], answer: 'Every minute' },
          { type: 'fill', id: 'lq33', label: '33. The top 5 countries account for', hint: 'percentage', placeholder: 'e.g. 40%', answer: '56' },
          { type: 'fill', id: 'lq34', label: '34. Microplastics are smaller than', hint: 'size', placeholder: 'e.g. 10 mm', answer: '5 millimetres' },
          { type: 'fill', id: 'lq35', label: '35. Microplastics were found in', hint: 'fraction of fish', placeholder: 'e.g. half', answer: 'one-third' },
          { type: 'fill', id: 'lq36', label: '36. The blood study involved', hint: 'number', placeholder: 'e.g. 15', answer: '22' },
          { type: 'fill', id: 'lq37', label: '37. The Garbage Patch was discovered in', hint: 'year', placeholder: 'e.g. 2001', answer: '1997' },
          { type: 'fill', id: 'lq38', label: '38. The Garbage Patch covers', hint: 'area', placeholder: 'e.g. 1 million km²', answer: '1.6 million' },
          { type: 'mcq', id: 'lq39', text: '39. When did the EU ban single-use plastics?', options: ['2019', '2020', '2021', '2022'], answer: '2021' },
          { type: 'mcq', id: 'lq40', text: '40. The Ocean Cleanup aims to remove 90% of surface plastic by which year?', options: ['2030', '2035', '2040', '2050'], answer: '2040' },
        ],
      },
    ],
  },
];
