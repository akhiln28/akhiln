create a basic grammar for english paragraph and sentences if it were to be a formal language and to be parsed by a program.  

```bnf
sentence := declarative | interrogative | imperative | exclamatory
declarative := np vp | np vp punct
interrogative := aux np vp qmark | wh-word aux np vp qmark | wh-word be np qmark
imperative := vp exmark | vp punct
exclamatory := interjection exmark | wh-word adj np be exmark

np := det nominal | proper-noun | pronoun | np pp
nominal := noun | adj nominal | nominal pp | nominal rel-clause
pp := prep np
vp := verb | verb np | verb np np | verb pp | aux verb | vp adv

rel-clause := rel-pronoun vp
conjunction := "and" | "or" | "but" | "yet" | "so" | "for"
det := "a" | "an" | "the" | "this" | "that" | "these" | "those" | "my" | "your" | "his" | "her"
proper-noun := [Names, Places, etc.]
pronoun := "I" | "you" | "he" | "she" | "it" | "we" | "they" | "me" | "him" | "her" | "us" | "them"
noun := [Any English noun]
verb := [Any English verb in various forms]
adj := [Any English adjective]
adv := [Any English adverb]
prep := "in" | "on" | "at" | "by" | "with" | "to" | "from" | "of" | "for"
wh-word := "what" | "who" | "where" | "when" | "why" | "how"
aux := "do" | "does" | "did" | "will" | "would" | "can" | "could" | "shall" | "should"
be := "am" | "is" | "are" | "was" | "were"
rel-pronoun := "that" | "which" | "who" | "whom" | "whose"
interjection := "wow" | "oh" | "ah" | "hey" | "alas"
punct := "." | "," | ";" | ":"
qmark := "?"
exmark := "!"
```
