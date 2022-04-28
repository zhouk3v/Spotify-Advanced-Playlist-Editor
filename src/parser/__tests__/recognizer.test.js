import Recognizer from "../recognizer";

let recognizer;

beforeEach(() => {
  recognizer = new Recognizer();
});

// query types
it("handles simple get query", () => {
  recognizer.parseInput(`get artist:"rammstein"`);
});

it("handles simple add to query", () => {
  recognizer.parseInput(`add to "My Playlist" from album:"Mutter"`);
});

it("handles delete tracks query", () => {
  recognizer.parseInput(`delete from "My Playlist"`);
});

it("handles search query", () => {
  recognizer.parseInput(`search artist "carly rae jepsen"`);
});

it("handles create playlist query", () => {
  recognizer.parseInput(`create playlist "New Playlist"`);
});

it("handle delete playlist query", () => {
  recognizer.parseInput(`delete playlist "New Playlist"`);
});

// primary conditions

it("handles primary conditions with different keywords", () => {
  recognizer.parseInput(`get artist:"Rammstein"`);
  recognizer.parseInput(`get album:"Mutter"`);
  recognizer.parseInput(`get track:"Mein Herz Brennt"`);
  recognizer.parseInput(`get playlist:"My playlist"`);
});

it("handles primary conditions with multiple entrys", () => {
  recognizer.parseInput(`get artist:["Rammstein","Daft Punk"]`);
});

it("handles primary conditions with unions", () => {
  recognizer.parseInput(`get artist:"Rammstein" union album:"Discovery"`);
  recognizer.parseInput(
    `get artist:"Rammstein" union album:["Discovery", "Alive 2007"]`
  );
  recognizer.parseInput(
    `get artist:"Rammstein" union album:["Discovery", "Alive 2007"] union track:"Wonderwall"`
  );
});

// secondary conditions
it("handles simple secondary conditions", () => {
  recognizer.parseInput(`get artist:"Rammstein" where album="Mutter"`);
});

it("handles secondary conditions with one and, or or not terms", () => {
  recognizer.parseInput(
    `get artist:"Rammstein" where album="Mutter" and track="Feuer Frei!"`
  );
  recognizer.parseInput(
    `get artist:"Rammstein" where album="Mutter" or album="Reise Reise"`
  );
  recognizer.parseInput(`get artist:"Rammstein" where not album="Remixes"`);
});

it("handles secondary condtions with brackets", () => {
  recognizer.parseInput(
    `get artist:"Rammstein" where not (album="Remixes" or album="XXI - Klavier")`
  );
});

it("handles secondary condtions with a mix of and, or, not and brackets", () => {
  recognizer.parseInput(
    `get artist:"Rammstein" where (album="Mutter" or album="Reise Reise") and not (album="Reise Reise" and album="Mutter")`
  );
});

// secondary conditions keywords
it("handles all types of secondary conditions keywords", () => {
  recognizer.parseInput(`get artist:"Rammstein" where artist="Rammstein"`);
  recognizer.parseInput(`get artist:"Rammstein" where album="Mutter"`);
  recognizer.parseInput(
    `get artist:"Rammstein" where track="Mein herz brennt"`
  );
});

// secondary condtions RHS
it("handles all types of secondary conditions RHS", () => {
  recognizer.parseInput(`get artist:"Rammstein" where artist="Rammstein"`);
  recognizer.parseInput(
    `get artist:"Rammstein" where album in ("Mutter", "Reise Reise", "Rosenrot")`
  );
  recognizer.parseInput(`get artist:"Rammstein" where track like "a*"`);
});

// Advanced queries
it("handles an advanced query", () => {
  recognizer.parseInput(
    `get artist:["Rammstein", "Daft Punk", "Oasis"] union album:"Discovery" union album:["Hybrid Theory","Meteora","Minutes to Midnight"] union track:"Take on Me" where (not (album like "/live/" or album in ("Discovery", "Homework")) and track="touch") or (album in ("Discovery", "Homework")) and track="Mann Gegen Mann"`
  );
});

// incorrect queries
// TODO: Add in tests with incorrect queries and see if the proper errors are thrown