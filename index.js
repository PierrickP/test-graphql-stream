import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLStreamDirective } from "graphql";

const typeDefs = `
  directive @stream on FIELD | FRAGMENT_DEFINITION | FRAGMENT_SPREAD | INLINE_FRAGMENT

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
  },
  {
    author: "Hans Christian Andersen",
    title: "Fairy tales",
  },
  {
    author: "Dante Alighieri",
    title: "The Divine Comedy",
  },
  {
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
  },
  {
    author: "Unknown",
    title: "The Book Of Job",
  },
  {
    author: "Unknown",
    title: "One Thousand and One Nights",
  },
  {
    author: "Unknown",
    title: "Njál's Saga",
  },
  {
    author: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
  },
  {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
  },
  {
    author: "Giovanni Boccaccio",
    title: "The Decameron",
  },
  {
    author: "Jorge Luis Borges",
    title: "Ficciones",
  },
  {
    author: "Emily Brontë",
    title: "Wuthering Heights",
  },
  {
    author: "Albert Camus",
    title: "The Stranger",
  },
  {
    author: "Paul Celan",
    title: "Poems",
  },
  {
    author: "Louis-Ferdinand Céline",
    title: "Journey to the End of the Night",
  },
  {
    author: "Miguel de Cervantes",
    title: "Don Quijote De La Mancha",
  },
  {
    author: "Geoffrey Chaucer",
    title: "The Canterbury Tales",
  },
  {
    author: "Anton Chekhov",
    title: "Stories",
  },
  {
    author: "Joseph Conrad",
    title: "Nostromo",
  },
  {
    author: "Charles Dickens",
    title: "Great Expectations",
  },
  {
    author: "Denis Diderot",
    title: "Jacques the Fatalist",
  },
  {
    author: "Alfred Döblin",
    title: "Berlin Alexanderplatz",
  },
  {
    author: "Fyodor Dostoevsky",
    title: "Crime and Punishment",
  },
  {
    author: "Fyodor Dostoevsky",
    title: "The Idiot",
  },
  {
    author: "Fyodor Dostoevsky",
    title: "The Possessed",
  },
  {
    author: "Fyodor Dostoevsky",
    title: "The Brothers Karamazov",
  },
  {
    author: "George Eliot",
    title: "Middlemarch",
  },
  {
    author: "Ralph Ellison",
    title: "Invisible Man",
  },
  {
    author: "Euripides",
    title: "Medea",
  },
  {
    author: "William Faulkner",
    title: "Absalom, Absalom!",
  },
  {
    author: "William Faulkner",
    title: "The Sound and the Fury",
  },
  {
    author: "Gustave Flaubert",
    title: "Madame Bovary",
  },
  {
    author: "Gustave Flaubert",
    title: "Sentimental Education",
  },
  {
    author: "Federico García Lorca",
    title: "Gypsy Ballads",
  },
  {
    author: "Gabriel García Márquez",
    title: "One Hundred Years of Solitude",
  },
  {
    author: "Gabriel García Márquez",
    title: "Love in the Time of Cholera",
  },
  {
    author: "Johann Wolfgang von Goethe",
    title: "Faust",
  },
  {
    author: "Nikolai Gogol",
    title: "Dead Souls",
  },
  {
    author: "Günter Grass",
    title: "The Tin Drum",
  },
  {
    author: "João Guimarães Rosa",
    title: "The Devil to Pay in the Backlands",
  },
  {
    author: "Knut Hamsun",
    title: "Hunger",
  },
  {
    author: "Ernest Hemingway",
    title: "The Old Man and the Sea",
  },
  {
    author: "Homer",
    title: "Iliad",
  },
  {
    author: "Homer",
    title: "Odyssey",
  },
  {
    author: "Henrik Ibsen",
    title: "A Doll's House",
  },
  {
    author: "James Joyce",
    title: "Ulysses",
  },
  {
    author: "Franz Kafka",
    title: "Stories",
  },
  {
    author: "Franz Kafka",
    title: "The Trial",
  },
  {
    author: "Franz Kafka",
    title: "The Castle",
  },
  {
    author: "Kālidāsa",
    title: "The recognition of Shakuntala",
  },
  {
    author: "Yasunari Kawabata",
    title: "The Sound of the Mountain",
  },
  {
    author: "Nikos Kazantzakis",
    title: "Zorba the Greek",
  },
  {
    author: "D. H. Lawrence",
    title: "Sons and Lovers",
  },
  {
    author: "Halldór Laxness",
    title: "Independent People",
  },
  {
    author: "Giacomo Leopardi",
    title: "Poems",
  },
  {
    author: "Doris Lessing",
    title: "The Golden Notebook",
  },
  {
    author: "Astrid Lindgren",
    title: "Pippi Longstocking",
  },
  {
    author: "Lu Xun",
    title: "Diary of a Madman",
  },
  {
    author: "Naguib Mahfouz",
    title: "Children of Gebelawi",
  },
  {
    author: "Thomas Mann",
    title: "Buddenbrooks",
  },
  {
    author: "Thomas Mann",
    title: "The Magic Mountain",
  },
  {
    author: "Herman Melville",
    title: "Moby Dick",
  },
  {
    author: "Michel de Montaigne",
    title: "Essays",
  },
  {
    author: "Elsa Morante",
    title: "History",
  },
  {
    author: "Toni Morrison",
    title: "Beloved",
  },
  {
    author: "Murasaki Shikibu",
    title: "The Tale of Genji",
  },
  {
    author: "Robert Musil",
    title: "The Man Without Qualities",
  },
  {
    author: "Vladimir Nabokov",
    title: "Lolita",
  },
  {
    author: "George Orwell",
    title: "Nineteen Eighty-Four",
  },
  {
    author: "Ovid",
    title: "Metamorphoses",
  },
  {
    author: "Fernando Pessoa",
    title: "The Book of Disquiet",
  },
  {
    author: "Edgar Allan Poe",
    title: "Tales",
  },
  {
    author: "Marcel Proust",
    title: "In Search of Lost Time",
  },
  {
    author: "François Rabelais",
    title: "Gargantua and Pantagruel",
  },
  {
    author: "Juan Rulfo",
    title: "Pedro Páramo",
  },
  {
    author: "Rumi",
    title: "The Masnavi",
  },
  {
    author: "Salman Rushdie",
    title: "Midnight's Children",
  },
  {
    author: "Saadi",
    title: "Bostan",
  },
  {
    author: "Tayeb Salih",
    title: "Season of Migration to the North",
  },
  {
    author: "José Saramago",
    title: "Blindness",
  },
  {
    author: "William Shakespeare",
    title: "Hamlet",
  },
  {
    author: "William Shakespeare",
    title: "King Lear",
  },
  {
    author: "William Shakespeare",
    title: "Othello",
  },
  {
    author: "Sophocles",
    title: "Oedipus the King",
  },
  {
    author: "Stendhal",
    title: "The Red and the Black",
  },
  {
    author: "Laurence Sterne",
    title: "The Life And Opinions of Tristram Shandy",
  },
  {
    author: "Italo Svevo",
    title: "Confessions of Zeno",
  },
  {
    author: "Jonathan Swift",
    title: "Gulliver's Travels",
  },
  {
    author: "Leo Tolstoy",
    title: "War and Peace",
  },
  {
    author: "Leo Tolstoy",
    title: "Anna Karenina",
  },
  {
    author: "Leo Tolstoy",
    title: "The Death of Ivan Ilyich",
  },
  {
    author: "Mark Twain",
    title: "The Adventures of Huckleberry Finn",
  },
  {
    author: "Valmiki",
    title: "Ramayana",
  },
  {
    author: "Virgil",
    title: "The Aeneid",
  },
  {
    author: "Vyasa",
    title: "Mahabharata",
  },
  {
    author: "Walt Whitman",
    title: "Leaves of Grass",
  },
  {
    author: "Virginia Woolf",
    title: "Mrs Dalloway",
  },
  {
    author: "Virginia Woolf",
    title: "To the Lighthouse",
  },
  {
    author: "Marguerite Yourcenar",
    title: "Memoirs of Hadrian",
  },
];

const resolvers = {
  Query: {
    books: async function* (root) {
      for await (const book of books.splice(5)) {
        console.log("yield", book);

        yield book;

        await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(1000);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [GraphQLStreamDirective],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
