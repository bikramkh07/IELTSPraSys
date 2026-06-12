export type ReadingQType = 'tfng' | 'ynng' | 'mcq' | 'fill' | 'heading';

export interface TfngQuestion { type: 'tfng'; id: string; num: number; text: string; answer: 'TRUE' | 'FALSE' | 'NOT GIVEN'; }
export interface YnngQuestion { type: 'ynng'; id: string; num: number; text: string; answer: 'YES' | 'NO' | 'NOT GIVEN'; }
export interface McqReadingQuestion { type: 'mcq'; id: string; num: number; text: string; options: string[]; answer: string; }
export interface FillReadingQuestion { type: 'fill'; id: string; num: number; label: string; hint: string; answer: string; }
export interface HeadingQuestion { type: 'heading'; id: string; num: number; paragraph: string; options: string[]; answer: string; }

export type ReadingQuestion = TfngQuestion | YnngQuestion | McqReadingQuestion | FillReadingQuestion | HeadingQuestion;

export interface ReadingPassage {
  passageNum: number;
  title: string;
  topic: string;
  questionRange: string;
  wordCount: number;
  paragraphs: { label?: string; text: string }[];
  questions: ReadingQuestion[];
}

export interface ReadingTest {
  id: string;
  name: string;
  passages: ReadingPassage[];
}

export const READING_ACADEMIC_TESTS: ReadingTest[] = [
  {
    id: 'ra-1',
    name: 'Academic Practice Test 1',
    passages: [
      {
        passageNum: 1,
        title: 'The Reconstructive Nature of Memory',
        topic: 'Psychology',
        questionRange: 'Questions 1–13',
        wordCount: 720,
        paragraphs: [
          { label: 'A', text: 'Memory is not a perfect recording device. Unlike a video camera that passively captures events, human memory is an active process of reconstruction. Every time we recall an event, we do not simply play back a stored file; instead, we rebuild the memory from fragments, influenced by our subsequent experiences, knowledge, and even the questions we are asked.' },
          { label: 'B', text: 'This reconstructive quality was demonstrated powerfully by psychologist Elizabeth Loftus in her landmark studies on eyewitness testimony. In one famous experiment, participants who watched a film of a car accident were asked about the speed of the vehicles. Those asked "How fast were the cars going when they smashed?" gave significantly higher speed estimates than those asked "How fast were the cars going when they contacted?" — despite watching the same footage.' },
          { label: 'C', text: 'The implications of this research are profound. If memory is so easily influenced by the phrasing of a question, then eyewitness testimony — long considered the gold standard of courtroom evidence — must be viewed with considerable scepticism. In fact, memory researchers have consistently found that people can be made to remember events that never happened at all, simply by being exposed to misleading post-event information.' },
          { label: 'D', text: 'Schema theory provides one explanation for this malleability. A schema is a mental framework — a set of expectations and assumptions about how the world works. When we encounter new information, we do not store it in isolation; rather, we interpret it through the lens of our existing schemas. This can lead to systematic distortions: details that do not fit our expectations may be unconsciously altered or forgotten entirely.' },
          { label: 'E', text: 'Bartlett\'s classic 1932 study "Remembering" illustrated this beautifully. British participants who read a Native American folk tale called "The War of the Ghosts" systematically altered details to fit their own cultural expectations when recalling the story. Supernatural elements were removed, unfamiliar names were changed, and the narrative was restructured to follow a more conventional Western storyline.' },
          { label: 'F', text: 'More recent neuroscience research has revealed the biological basis for memory reconstruction. Each time a memory is retrieved, it enters a labile state where it can be modified before being reconsolidated. This process, known as reconsolidation, means that the very act of remembering can change a memory. Therapeutic techniques such as memory reconsolidation therapy now exploit this mechanism to treat conditions like post-traumatic stress disorder.' },
        ],
        questions: [
          { type: 'tfng', id: 'rq1', num: 1, text: 'Human memory functions like a recording device that stores exact copies of experiences.', answer: 'FALSE' },
          { type: 'tfng', id: 'rq2', num: 2, text: 'Elizabeth Loftus conducted research on how the language of questions affects memory recall.', answer: 'TRUE' },
          { type: 'tfng', id: 'rq3', num: 3, text: 'Eyewitness testimony is considered completely reliable in modern court cases.', answer: 'FALSE' },
          { type: 'tfng', id: 'rq4', num: 4, text: 'A schema is a type of long-term memory storage system in the brain.', answer: 'NOT GIVEN' },
          { type: 'tfng', id: 'rq5', num: 5, text: 'People can be convinced to remember events that never actually occurred.', answer: 'TRUE' },
          { type: 'heading', id: 'rq6', num: 6, paragraph: 'A', options: ['The fallibility of human recall', 'Modern therapy techniques', 'Cultural influences on memory', 'The biology of forgetting', 'Loftus and the courtroom'], answer: 'The fallibility of human recall' },
          { type: 'heading', id: 'rq7', num: 7, paragraph: 'B', options: ['The fallibility of human recall', 'Modern therapy techniques', 'Cultural influences on memory', 'The biology of forgetting', 'Loftus and the courtroom'], answer: 'Loftus and the courtroom' },
          { type: 'heading', id: 'rq8', num: 8, paragraph: 'E', options: ['The fallibility of human recall', 'Modern therapy techniques', 'Cultural influences on memory', 'The biology of forgetting', 'Loftus and the courtroom'], answer: 'Cultural influences on memory' },
          { type: 'heading', id: 'rq9', num: 9, paragraph: 'F', options: ['The fallibility of human recall', 'Modern therapy techniques', 'Cultural influences on memory', 'The biology of forgetting', 'Loftus and the courtroom'], answer: 'Modern therapy techniques' },
          { type: 'mcq', id: 'rq10', num: 10, text: 'In Loftus\'s experiment, what variable was changed between groups?', options: ['The film shown', 'The verb used in the question', 'The number of participants', 'The time of the test'], answer: 'The verb used in the question' },
          { type: 'mcq', id: 'rq11', num: 11, text: 'In Bartlett\'s study, what did British participants do to the folk tale?', options: ['Memorised it perfectly', 'Altered it to fit Western norms', 'Refused to read it', 'Translated it accurately'], answer: 'Altered it to fit Western norms' },
          { type: 'fill', id: 'rq12', num: 12, label: '12. The process where retrieved memories can be modified is called', hint: 'term', answer: 'reconsolidation' },
          { type: 'fill', id: 'rq13', num: 13, label: '13. Memory reconsolidation therapy is used to treat', hint: 'condition', answer: 'post-traumatic stress disorder' },
        ],
      },
      {
        passageNum: 2,
        title: 'The Economics of Renewable Energy',
        topic: 'Energy & Environment',
        questionRange: 'Questions 14–26',
        wordCount: 880,
        paragraphs: [
          { label: 'A', text: 'The cost of renewable energy has undergone a dramatic transformation over the past decade. Solar photovoltaic electricity, which cost approximately $0.36 per kilowatt-hour in 2010, had fallen to just $0.048 by 2021 — a reduction of 87 percent. Onshore wind energy experienced a similar decline of 68 percent over the same period, reaching $0.033 per kilowatt-hour and making it the cheapest source of new electricity generation in many parts of the world.' },
          { label: 'B', text: 'This cost revolution has been driven by several factors. Manufacturing scale has increased enormously: global solar panel production capacity exceeded 400 gigawatts per year by 2022. Technological improvements have boosted the efficiency of standard commercial solar panels from around 15 percent to over 22 percent. Learning rates — the percentage cost reduction for each doubling of cumulative production — have averaged 28 percent for solar and 23 percent for wind.' },
          { label: 'C', text: 'However, the intermittent nature of renewable energy presents significant challenges. Solar panels produce no electricity at night, and wind turbines are idle during calm periods. Grid-scale energy storage is therefore essential for a fully renewable electricity system. Lithium-ion battery costs have fallen by 97 percent since 1991, from $7,500 per kilowatt-hour to approximately $132 in 2021, but further reductions are needed to make 24-hour renewable power economically competitive.' },
          { label: 'D', text: 'Several countries have made remarkable progress in renewable energy adoption. Denmark generated 80 percent of its electricity from wind and solar in 2022. Costa Rica has run on nearly 100 percent renewable electricity for seven consecutive years, primarily from hydroelectric power. Uruguay transformed its electricity grid in under a decade, moving from near-total fossil fuel dependence to 98 percent renewables by 2020.' },
          { label: 'E', text: 'The employment implications are substantial. The International Renewable Energy Agency reported that the global renewable energy sector employed 12.7 million people in 2021, up from 7.3 million in 2012. Solar photovoltaics was the largest employer with 4.3 million jobs, followed by bioenergy with 3.4 million and hydropower with 2.4 million. The sector is projected to employ 38 million people by 2030.' },
          { label: 'F', text: 'Critics point to the environmental costs of renewable energy infrastructure. The mining of rare earth elements for wind turbines and solar panels has significant ecological impacts, particularly in countries like the Democratic Republic of Congo and China. Decommissioning presents another challenge: wind turbine blades, made from composite materials, are difficult to recycle. Nevertheless, lifecycle analyses consistently show that renewable energy produces 10 to 50 times less carbon dioxide per unit of electricity than fossil fuels.' },
        ],
        questions: [
          { type: 'fill', id: 'rq14', num: 14, label: '14. Solar PV cost in 2010 was approximately', hint: 'per kWh', answer: '$0.36' },
          { type: 'fill', id: 'rq15', num: 15, label: '15. Solar PV costs fell by', hint: 'percentage', answer: '87' },
          { type: 'fill', id: 'rq16', num: 16, label: '16. Commercial solar panel efficiency rose to over', hint: 'percentage', answer: '22' },
          { type: 'tfng', id: 'rq17', num: 17, text: 'Solar panels can generate electricity at night using stored energy.', answer: 'FALSE' },
          { type: 'tfng', id: 'rq18', num: 18, text: 'Lithium-ion battery costs have fallen by 97 percent since 1991.', answer: 'TRUE' },
          { type: 'tfng', id: 'rq19', num: 19, text: 'Denmark generates all of its electricity from renewable sources.', answer: 'FALSE' },
          { type: 'tfng', id: 'rq20', num: 20, text: 'Uruguay achieved 98 percent renewables within approximately ten years.', answer: 'TRUE' },
          { type: 'mcq', id: 'rq21', num: 21, text: 'How many people did the renewable energy sector employ in 2021?', options: ['7.3 million', '10.5 million', '12.7 million', '38 million'], answer: '12.7 million' },
          { type: 'mcq', id: 'rq22', num: 22, text: 'Which renewable sub-sector was the largest employer?', options: ['Wind power', 'Solar photovoltaics', 'Hydropower', 'Bioenergy'], answer: 'Solar photovoltaics' },
          { type: 'fill', id: 'rq23', num: 23, label: '23. Solar PV employed', hint: 'number of jobs', answer: '4.3 million' },
          { type: 'mcq', id: 'rq24', num: 24, text: 'What is a problem with decommissioning wind turbines?', options: ['They are too expensive', 'Blades are hard to recycle', 'They produce toxic gases', 'Noise pollution'], answer: 'Blades are hard to recycle' },
          { type: 'tfng', id: 'rq25', num: 25, text: 'Renewable energy produces more carbon dioxide than fossil fuels over its lifecycle.', answer: 'FALSE' },
          { type: 'fill', id: 'rq26', num: 26, label: '26. The sector is projected to employ how many by 2030?', hint: 'number', answer: '38 million' },
        ],
      },
      {
        passageNum: 3,
        title: 'The Evolution of Human Language',
        topic: 'Linguistics & Anthropology',
        questionRange: 'Questions 27–40',
        wordCount: 980,
        paragraphs: [
          { label: 'A', text: 'The origin of human language remains one of the most enduring mysteries in science. Unlike other human traits, language leaves no direct fossil evidence. We cannot excavate ancient conversations or unearth prehistoric grammars. Instead, researchers must piece together the puzzle from indirect clues: the shape of ancestral vocal tracts, the genetic mutations associated with speech, and the cognitive capabilities implied by archaeological artefacts.' },
          { label: 'B', text: 'The FOXP2 gene, identified in 2001, was the first gene directly linked to human language ability. Mutations in FOXP2 cause severe speech and language disorders. Intriguingly, the human version of FOXP2 differs from the chimpanzee version by just two amino acids — changes that occurred approximately 200,000 years ago, coinciding with the emergence of anatomically modern humans.' },
          { label: 'C', text: 'Some linguists believe that all human languages descend from a single ancestral language, sometimes called "Proto-World." This hypothesis, championed by researchers like Merritt Ruhlen, suggests that language originated once in Africa before spreading with human migration. However, this remains highly controversial, and most historical linguists argue that reliable reconstruction of language relationships is impossible beyond approximately 10,000 years.' },
          { label: 'D', text: 'An alternative perspective is offered by the gestural theory of language origin. This theory, supported by neuroscientists such as Michael Corballis, proposes that language began not as speech but as manual gestures. Evidence for this comes from the observation that the brain regions controlling hand movements and speech production overlap significantly, and that great apes naturally use gestures to communicate while their vocal repertoire remains limited.' },
          { label: 'E', text: 'Today, approximately 7,000 languages are spoken worldwide, but this number is declining rapidly. Linguists estimate that one language dies every two weeks. By the end of this century, between 50 and 90 percent of currently spoken languages may be extinct. The six most widely spoken languages — English, Mandarin Chinese, Hindi, Spanish, French, and Arabic — are now used by roughly half the world\'s population.' },
          { label: 'F', text: 'Language preservation efforts have taken on new urgency. UNESCO\'s Atlas of the World\'s Languages in Danger identifies 2,500 endangered languages. Technology is playing an increasingly important role: machine learning algorithms can now help analyse undocumented languages, and smartphone apps allow communities to create digital dictionaries and audio archives. The Endangered Languages Project, a collaboration between Google and the University of Hawaii, has catalogued resources for over 3,400 languages.' },
          { label: 'G', text: 'The cognitive benefits of multilingualism are now well documented. Research by Ellen Bialystok at York University has shown that bilingual individuals develop dementia an average of 4.5 years later than monolinguals. Multilingualism has also been linked to enhanced executive function, greater cognitive flexibility, and improved performance in tasks requiring attention switching. These findings have led some researchers to describe bilingualism as a form of "cognitive reserve" that helps protect the brain against age-related decline.' },
        ],
        questions: [
          { type: 'ynng', id: 'rq27', num: 27, text: 'The origin of language can be determined from fossil records.', answer: 'NO' },
          { type: 'ynng', id: 'rq28', num: 28, text: 'FOXP2 was discovered in the early 2000s.', answer: 'YES' },
          { type: 'ynng', id: 'rq29', num: 29, text: 'The Proto-World hypothesis is universally accepted by linguists.', answer: 'NO' },
          { type: 'ynng', id: 'rq30', num: 30, text: 'Great apes have a more advanced vocal range than gestural range.', answer: 'NO' },
          { type: 'ynng', id: 'rq31', num: 31, text: 'There are more than 8,000 languages spoken today.', answer: 'NO' },
          { type: 'fill', id: 'rq32', num: 32, label: '32. The human FOXP2 differs from chimpanzee by', hint: 'number', answer: 'two' },
          { type: 'fill', id: 'rq33', num: 33, label: '33. Language reconstruction is impossible beyond approximately', hint: 'years', answer: '10,000' },
          { type: 'fill', id: 'rq34', num: 34, label: '34. A language dies every', hint: 'frequency', answer: 'two weeks' },
          { type: 'mcq', id: 'rq35', num: 35, text: 'What percentage of languages may be extinct by century\'s end?', options: ['10–30%', '30–50%', '50–90%', 'Over 95%'], answer: '50–90%' },
          { type: 'mcq', id: 'rq36', num: 36, text: 'How many endangered languages does UNESCO identify?', options: ['500', '1,200', '2,500', '5,000'], answer: '2,500' },
          { type: 'fill', id: 'rq37', num: 37, label: '37. The Endangered Languages Project catalogued resources for over', hint: 'number of languages', answer: '3,400' },
          { type: 'fill', id: 'rq38', num: 38, label: '38. Bilinguals develop dementia an average of', hint: 'years later', answer: '4.5' },
          { type: 'mcq', id: 'rq39', num: 39, text: 'Which researcher studied bilingualism and dementia?', options: ['Merritt Ruhlen', 'Michael Corballis', 'Elizabeth Loftus', 'Ellen Bialystok'], answer: 'Ellen Bialystok' },
          { type: 'mcq', id: 'rq40', num: 40, text: 'Bilingualism is described as a form of:', options: ['Language evolution', 'Cognitive reserve', 'Gestural communication', 'Neural plasticity'], answer: 'Cognitive reserve' },
        ],
      },
    ],
  },
];
