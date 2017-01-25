"use strict";
const nonterminal_1 = require('./nonterminal');
const terminal_1 = require('./terminal');
const Terminals = {
    Terminal: terminal_1.Terminal, Char: terminal_1.Char, Separator: terminal_1.Separator
};
exports.Terminals = Terminals;
const Nonterminals = {
    Nonterminal: nonterminal_1.Nonterminal, Word: nonterminal_1.Word, Clause: nonterminal_1.Clause, Sentence: nonterminal_1.Sentence, Paragraph: nonterminal_1.Paragraph, Corpus: nonterminal_1.Corpus
};
exports.Nonterminals = Nonterminals;
var expr_1 = require('./expr');
exports.Expr = expr_1.Expr;
var terminal_2 = require('./terminal');
exports.Terminal = terminal_2.Terminal;
exports.Char = terminal_2.Char;
exports.Separator = terminal_2.Separator;
var nonterminal_2 = require('./nonterminal');
exports.Nonterminal = nonterminal_2.Nonterminal;
exports.Word = nonterminal_2.Word;
exports.Clause = nonterminal_2.Clause;
exports.Sentence = nonterminal_2.Sentence;
exports.Paragraph = nonterminal_2.Paragraph;
exports.Corpus = nonterminal_2.Corpus;
var token_1 = require('./token');
exports.Token = token_1.Token;
//# sourceMappingURL=index.js.map