# GATE CS — PYQ Analysis & 2-Month Roadmap

*Built from 10 attached GATE CS papers (2021 to 2026, 650 questions). Every count below comes from tagging each question in these papers by hand against the GATE 2027 syllabus.*

**How to read the tables:** `2024-S1` = 2024 Set 1. `×2` = two questions from that topic in that paper. Marks = 1-mark and 2-mark weightage. Engineering Mathematics is one syllabus section, so its topics are labelled *Discrete / Linear algebra / Calculus / Probability* inside one table.

## 0. Data Coverage

| Year | Sets analysed | Total questions | Notes |
|---|---|---|---|
| 2021 | 2 (Set 1, Set 2) | 130 | Scanned PDF, read with OCR. Both sets in one file (Set 1 = Session 5, Set 2 = Session 6). CS questions numbered Q1–55 in the paper; stored here as Q11–65. Figure-based options were not readable, but every question stem was, so all were tagged. |
| 2022 | 1 | 65 | Single set (text PDF with answer key). All 65 tagged. |
| 2023 | 1 | 65 | Single set (text PDF, no answer key; MCQ/MSQ/NAT inferred from wording). All 65 tagged. |
| 2024 | 2 (Set 1, Set 2) | 130 | CS1 and CS2 (IISc). All 130 tagged. |
| 2025 | 2 (Set 1, Set 2) | 130 | CS1 and CS2 (IIT Roorkee). All 130 tagged. |
| 2026 | 2 (Set 1, Set 2) | 130 | Files `CS1.pdf` / `CS2.pdf` (organised by IIT Guwahati = GATE 2026). All 130 tagged. |
| **Total** | **10 papers** | **650** | |

**Checks passed:** every paper has exactly 65 questions (Q1–Q10 GA, Q11–Q65 CS) and adds up to 100 marks. The subject totals below add up to the overall total for each paper.

**Not in the attached files:** GATE 2020 and earlier, and the 2022/2023 second sets (those years had one CS paper, so nothing is missing). No count here uses any paper outside the attached files.

## 1. ⭐ Most Important Topics (Cover First)

The 20 technical topics with the most questions across all 10 papers. Together they account for **293 of 550 technical questions (53%)** and **455 of 850 technical marks**. Add General Aptitude (15 marks every paper) on top.

| Rank | Topic | Subject | No. of Questions | Total Marks | Years Asked |
|---|---|---|---|---|---|
| 1 | Probability & statistics | Engineering Mathematics | 21 | 34 | 2021-S1×3, 2021-S2×3, 2023, 2024-S1×3, 2024-S2×2, 2025-S1×3, 2025-S2×2, 2026-S1×2, 2026-S2×2 |
| 2 | Programming in C (pointers, arrays, scope, output tracing) | Programming & Data Structures | 21 | 31 | 2021-S1×2, 2021-S2, 2022×3, 2023, 2024-S1×2, 2024-S2×3, 2025-S1×2, 2025-S2×4, 2026-S1, 2026-S2×2 |
| 3 | Linear algebra (matrices, determinants, eigen, systems, LU) | Engineering Mathematics | 20 | 29 | 2021-S1, 2021-S2×2, 2022×3, 2023×2, 2024-S1×2, 2024-S2, 2025-S1×2, 2025-S2×3, 2026-S1×2, 2026-S2×2 |
| 4 | Number representation & arithmetic (2's comp, IEEE 754) | Digital Logic | 18 | 23 | 2021-S1×2, 2021-S2×2, 2022×2, 2023×2, 2024-S1, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S1×2, 2026-S2×2 |
| 5 | Regular expressions & finite automata (DFA/NFA, minimization) | Theory of Computation | 17 | 27 | 2021-S1, 2021-S2×3, 2022, 2023×2, 2024-S1×2, 2024-S2×3, 2025-S1×2, 2025-S2, 2026-S1, 2026-S2 |
| 6 | Memory management & virtual memory (paging, TLB, replacement) | Operating System | 16 | 29 | 2021-S1, 2021-S2, 2022×2, 2023×2, 2024-S1, 2024-S2×2, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2×2 |
| 7 | Cache memory (mapping, AMAT, write policies) | Computer Organization & Architecture | 16 | 28 | 2021-S1, 2021-S2×2, 2022×3, 2023, 2024-S1×2, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2×2 |
| 8 | IPv4: subnetting, CIDR, fragmentation, NAT | Computer Networks | 16 | 25 | 2021-S1, 2022×2, 2023, 2024-S1×3, 2024-S2×3, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2 |
| 9 | Discrete: graph theory (connectivity, matching, colouring) | Engineering Mathematics | 15 | 26 | 2021-S1×2, 2022×5, 2023, 2024-S1×2, 2024-S2×2, 2026-S1×2, 2026-S2 |
| 10 | Parsing (FIRST/FOLLOW, LL, LR, SLR, LALR) | Compiler Design | 15 | 24 | 2021-S1×2, 2021-S2, 2022×2, 2024-S1×3, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S1, 2026-S2 |
| 11 | Keys, integrity constraints, FDs & normal forms | Databases | 14 | 22 | 2021-S1, 2021-S2×2, 2022×2, 2024-S1×2, 2024-S2, 2025-S1, 2025-S2, 2026-S1×3, 2026-S2 |
| 12 | Boolean algebra & minimization (K-map) | Digital Logic | 13 | 21 | 2021-S1, 2021-S2, 2024-S1, 2024-S2, 2025-S1×2, 2025-S2×3, 2026-S1×2, 2026-S2×2 |
| 13 | Asymptotic complexity & solving recurrences | Algorithms | 13 | 18 | 2021-S1×2, 2021-S2, 2022, 2023×2, 2024-S1×2, 2025-S1, 2026-S1, 2026-S2×3 |
| 14 | Calculus (limits, continuity, maxima/minima, integration) | Engineering Mathematics | 13 | 15 | 2021-S1, 2021-S2, 2022, 2023×2, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2×2 |
| 15 | Trees & binary search trees | Programming & Data Structures | 12 | 17 | 2021-S1, 2022, 2023, 2024-S2, 2025-S1, 2025-S2×2, 2026-S1×3, 2026-S2×2 |
| 16 | Graph traversals (BFS/DFS) | Algorithms | 11 | 20 | 2021-S1, 2021-S2×2, 2023, 2024-S1×2, 2025-S1, 2025-S2×2, 2026-S1×2 |
| 17 | Instruction pipelining & hazards | Computer Organization & Architecture | 11 | 18 | 2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2×2, 2025-S2, 2026-S1×2, 2026-S2 |
| 18 | Transactions & concurrency control | Databases | 11 | 16 | 2021-S1×2, 2021-S2, 2022, 2024-S1, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S2 |
| 19 | CFGs & push-down automata | Theory of Computation | 10 | 16 | 2021-S1, 2023×2, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2 |
| 20 | TCP: handshake, flow & congestion control, UDP | Computer Networks | 10 | 16 | 2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2, 2025-S1, 2026-S1×2, 2026-S2 |

## 2. 🧱 Foundation Topics

These are the core concepts most questions depend on. *% of Questions Supported* = share of all 650 questions whose tagged topic builds directly on that foundation (from the topic mapping in column 2). One question can count under more than one foundation.

| Foundation Topic | Subjects/Topics It Supports | % of Questions Supported | Why It Matters |
|---|---|---|---|
| **Binary numbers & powers of 2 (bit-field math)** | Number systems, cache tag/index/offset, opcode bits, paging, disk/blocks, subnetting | 13% (84 Qs) | Splitting an address into bit fields is the core step of most COA/OS/CN numericals. |
| **Finite automata & grammars** | TOC, lexical analysis, parsing, SDT | 11% (70 Qs) | Compiler front-end is applied TOC: DFAs for lexing, CFGs for parsing. |
| **C pointers, arrays & recursion tracing** | All PDS questions, fork() counting, code-output questions | 10% (68 Qs) | Most code questions are 'what does this print?' — needs careful tracing. |
| **Logic, sets & relations** | Logic & sets → Boolean algebra, FDs/closures, relational calculus, decidability | 10% (62 Qs) | Same 'for all / there exists / closure' reasoning appears in 4 subjects. |
| **Graph theory basics** | Graph theory, BFS/DFS, MST, shortest paths, RAG deadlock, precedence-graph serializability | 8% (55 Qs) | One idea (vertices, edges, cycles) scores in Maths, Algo, OS and DBMS. |
| **Counting & probability** | Probability, combinatorics, hashing, GA probability | 6% (41 Qs) | Highest-marks maths topic; also powers hashing and GA questions. |
| **Recurrences & asymptotic growth** | Recurrences, complexity, sorting/searching, DP, recursion tracing | 5% (33 Qs) | Every algorithm question asks 'how fast?' — this answers it. |
| **Matrices & linear algebra** | Linear algebra (eigenvalues, rank, determinants, LU); adjacency-matrix questions | 3% (20 Qs) | 20 questions on its own, almost every paper. |

## 3. General Aptitude — Total Questions: 100 (Marks: 150)

| Topic | No. of Questions | Years Asked |
|---|---|---|
| Spatial / visual reasoning (folding, figures) | 19 | 2021-S1×2, 2021-S2×2, 2022×2, 2023×2, 2024-S1×2, 2024-S2, 2025-S1×2, 2025-S2×2, 2026-S1×2, 2026-S2×2 |
| Verbal: grammar, vocabulary, analogy | 17 | 2021-S1×2, 2021-S2×2, 2022, 2023×2, 2024-S1×2, 2024-S2, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2×2 |
| Quant: arithmetic (%, ratio, averages, profit) | 13 | 2021-S1×2, 2021-S2, 2022, 2024-S1×2, 2024-S2×2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2 |
| Analytical: logical reasoning & puzzles | 12 | 2021-S1, 2021-S2, 2022×2, 2024-S2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2×3 |
| Verbal: passage inference & sentence ordering | 11 | 2021-S1, 2021-S2, 2022×2, 2023×3, 2024-S2, 2025-S1, 2025-S2, 2026-S1 |
| Quant: algebra, sequences, functions | 11 | 2021-S2, 2022, 2023×3, 2024-S1×2, 2024-S2×2, 2025-S2, 2026-S1 |
| Quant: probability & counting | 8 | 2021-S1, 2022, 2024-S2, 2025-S1×2, 2026-S1, 2026-S2×2 |
| Quant: geometry & mensuration | 5 | 2021-S1, 2021-S2, 2024-S1, 2025-S1, 2025-S2 |
| Quant: data interpretation (tables, pie charts) | 4 | 2021-S2, 2024-S1, 2024-S2, 2025-S2 |

## 4. Engineering Mathematics — Total Questions: 100 (Marks: 148)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Probability & statistics | 21 | 8 / 13 | 2021-S1×3, 2021-S2×3, 2023, 2024-S1×3, 2024-S2×2, 2025-S1×3, 2025-S2×2, 2026-S1×2, 2026-S2×2 |
| 2 | Linear algebra (matrices, determinants, eigen, systems, LU) | 20 | 11 / 9 | 2021-S1, 2021-S2×2, 2022×3, 2023×2, 2024-S1×2, 2024-S2, 2025-S1×2, 2025-S2×3, 2026-S1×2, 2026-S2×2 |
| 3 | Discrete: graph theory (connectivity, matching, colouring) | 15 | 4 / 11 | 2021-S1×2, 2022×5, 2023, 2024-S1×2, 2024-S2×2, 2026-S1×2, 2026-S2 |
| 4 | Calculus (limits, continuity, maxima/minima, integration) | 13 | 11 / 2 | 2021-S1, 2021-S2, 2022, 2023×2, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2×2 |
| 5 | Discrete: sets, relations, functions, posets, lattices | 8 | 5 / 3 | 2021-S1, 2021-S2, 2023, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S2 |
| 6 | Discrete: propositional & first-order logic | 7 | 6 / 1 | 2021-S1, 2021-S2, 2023, 2024-S2, 2025-S1, 2025-S2, 2026-S2 |
| 7 | Discrete: monoids & groups | 6 | 1 / 5 | 2021-S1, 2022, 2023, 2024-S1, 2024-S2, 2025-S1 |
| 8 | Discrete: combinatorics (counting) | 6 | 4 / 2 | 2021-S1, 2021-S2, 2022, 2023, 2025-S1, 2026-S1 |
| 9 | Discrete: recurrence relations & generating functions | 4 | 2 / 2 | 2022×2, 2023, 2024-S2 |

## 5. Programming & Data Structures — Total Questions: 59 (Marks: 91)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Programming in C (pointers, arrays, scope, output tracing) | 21 | 11 / 10 | 2021-S1×2, 2021-S2, 2022×3, 2023, 2024-S1×2, 2024-S2×3, 2025-S1×2, 2025-S2×4, 2026-S1, 2026-S2×2 |
| 2 | Trees & binary search trees | 12 | 7 / 5 | 2021-S1, 2022, 2023, 2024-S2, 2025-S1, 2025-S2×2, 2026-S1×3, 2026-S2×2 |
| 3 | Binary heaps / priority queues | 8 | 4 / 4 | 2021-S2, 2023×2, 2024-S1×2, 2025-S1, 2025-S2, 2026-S1 |
| 4 | Stacks & queues | 6 | 1 / 5 | 2021-S1, 2022, 2023, 2024-S2, 2025-S2, 2026-S2 |
| 5 | Recursion | 6 | 2 / 4 | 2021-S2×2, 2024-S1, 2025-S1, 2026-S1, 2026-S2 |
| 6 | Linked lists | 5 | 2 / 3 | 2021-S2, 2022, 2023, 2025-S1, 2026-S1 |
| 7 | Arrays | 1 | 0 / 1 | 2024-S2 |

## 6. Operating System — Total Questions: 53 (Marks: 86)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Memory management & virtual memory (paging, TLB, replacement) | 16 | 3 / 13 | 2021-S1, 2021-S2, 2022×2, 2023×2, 2024-S1, 2024-S2×2, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2×2 |
| 2 | CPU scheduling | 9 | 5 / 4 | 2021-S1, 2021-S2, 2022, 2023, 2024-S2, 2025-S1, 2025-S2, 2026-S1, 2026-S2 |
| 3 | System calls, processes, threads (fork, states) | 9 | 7 / 2 | 2021-S1, 2023×2, 2024-S1×3, 2024-S2, 2025-S1, 2026-S1 |
| 4 | Concurrency & synchronization (semaphores) | 7 | 1 / 6 | 2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2, 2026-S2 |
| 5 | File systems & disk | 7 | 1 / 6 | 2021-S1, 2022, 2024-S1, 2024-S2, 2025-S1, 2026-S1, 2026-S2 |
| 6 | Deadlock | 5 | 3 / 2 | 2021-S2, 2022, 2025-S2, 2026-S1×2 |

## 7. Algorithms — Total Questions: 53 (Marks: 82)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Asymptotic complexity & solving recurrences | 13 | 8 / 5 | 2021-S1×2, 2021-S2, 2022, 2023×2, 2024-S1×2, 2025-S1, 2026-S1, 2026-S2×3 |
| 2 | Graph traversals (BFS/DFS) | 11 | 2 / 9 | 2021-S1, 2021-S2×2, 2023, 2024-S1×2, 2025-S1, 2025-S2×2, 2026-S1×2 |
| 3 | Minimum spanning trees | 9 | 3 / 6 | 2021-S1, 2021-S2, 2022, 2024-S2×2, 2025-S1×2, 2025-S2, 2026-S1 |
| 4 | Searching & sorting | 7 | 6 / 1 | 2021-S1×2, 2021-S2, 2025-S1, 2025-S2×2, 2026-S2 |
| 5 | Hashing | 6 | 4 / 2 | 2021-S1, 2022, 2023, 2025-S1, 2026-S1, 2026-S2 |
| 6 | Shortest paths | 3 | 0 / 3 | 2021-S2, 2026-S1, 2026-S2 |
| 7 | Dynamic programming | 3 | 1 / 2 | 2021-S1, 2024-S2, 2026-S2 |
| 8 | Greedy algorithms | 1 | 0 / 1 | 2021-S2 |
| 9 | Divide & conquer | 0 questions — not asked in attached papers | – | – |

## 8. Computer Networks — Total Questions: 52 (Marks: 81)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | IPv4: subnetting, CIDR, fragmentation, NAT | 16 | 7 / 9 | 2021-S1, 2022×2, 2023, 2024-S1×3, 2024-S2×3, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2 |
| 2 | TCP: handshake, flow & congestion control, UDP | 10 | 4 / 6 | 2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2, 2025-S1, 2026-S1×2, 2026-S2 |
| 3 | Switching, delays & flow control (stop-and-wait, sliding window) | 8 | 2 / 6 | 2021-S1, 2022, 2023, 2024-S1, 2025-S2, 2026-S1, 2026-S2×2 |
| 4 | MAC, Ethernet, ARP | 5 | 3 / 2 | 2021-S1, 2021-S2, 2024-S2×2, 2025-S2 |
| 5 | Application layer (DNS, HTTP, DHCP) | 5 | 4 / 1 | 2022, 2023, 2024-S1, 2026-S1, 2026-S2 |
| 6 | Routing (distance vector, link state) | 4 | 2 / 2 | 2021-S2, 2022, 2023, 2025-S2 |
| 7 | Data link: error detection (CRC, checksum) | 3 | 0 / 3 | 2021-S1, 2021-S2, 2026-S2 |
| 8 | Principles of layering (OSI/TCP-IP) | 1 | 1 / 0 | 2025-S1 |

## 9. Computer Organization & Architecture — Total Questions: 48 (Marks: 77)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Cache memory (mapping, AMAT, write policies) | 16 | 4 / 12 | 2021-S1, 2021-S2×2, 2022×3, 2023, 2024-S1×2, 2025-S1×2, 2025-S2×2, 2026-S1, 2026-S2×2 |
| 2 | Instruction pipelining & hazards | 11 | 4 / 7 | 2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2×2, 2025-S2, 2026-S1×2, 2026-S2 |
| 3 | Instruction set & addressing modes | 9 | 3 / 6 | 2021-S1, 2023, 2024-S2×2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2 |
| 4 | I/O interface (interrupt, DMA, polling) | 7 | 7 / 0 | 2021-S2, 2022, 2023, 2024-S1, 2024-S2, 2025-S1, 2026-S2 |
| 5 | Memory interfacing & hierarchy | 2 | 0 / 2 | 2021-S2, 2023 |
| 6 | CPU performance (CPI, speedup, Amdahl) | 2 | 0 / 2 | 2024-S1, 2025-S2 |
| 7 | ALU & datapath design | 1 | 1 / 0 | 2025-S1 |

## 10. Databases — Total Questions: 48 (Marks: 73)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Keys, integrity constraints, FDs & normal forms | 14 | 6 / 8 | 2021-S1, 2021-S2×2, 2022×2, 2024-S1×2, 2024-S2, 2025-S1, 2025-S2, 2026-S1×3, 2026-S2 |
| 2 | Transactions & concurrency control | 11 | 6 / 5 | 2021-S1×2, 2021-S2, 2022, 2024-S1, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S2 |
| 3 | Relational algebra & tuple calculus | 8 | 4 / 4 | 2021-S1×2, 2022, 2023, 2024-S1, 2024-S2, 2025-S1, 2026-S1 |
| 4 | File organization & indexing (B/B+ trees) | 7 | 4 / 3 | 2021-S2, 2023, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S2 |
| 5 | SQL | 5 | 0 / 5 | 2021-S2, 2022, 2023, 2025-S1, 2025-S2 |
| 6 | ER model & data models | 3 | 3 / 0 | 2024-S1, 2024-S2, 2026-S2 |

## 11. Theory of Computation — Total Questions: 47 (Marks: 74)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Regular expressions & finite automata (DFA/NFA, minimization) | 17 | 7 / 10 | 2021-S1, 2021-S2×3, 2022, 2023×2, 2024-S1×2, 2024-S2×3, 2025-S1×2, 2025-S2, 2026-S1, 2026-S2 |
| 2 | CFGs & push-down automata | 10 | 4 / 6 | 2021-S1, 2023×2, 2024-S1, 2024-S2, 2025-S1, 2025-S2, 2026-S1×2, 2026-S2 |
| 3 | Context-free languages: closure & identification | 9 | 4 / 5 | 2021-S1, 2021-S2×2, 2022×2, 2023, 2025-S1, 2025-S2, 2026-S2 |
| 4 | Turing machines & undecidability | 6 | 4 / 2 | 2021-S1×2, 2022×2, 2025-S2, 2026-S2 |
| 5 | Regular languages: closure & pumping lemma | 5 | 1 / 4 | 2021-S2, 2024-S1, 2025-S1, 2025-S2, 2026-S1 |

## 12. Digital Logic — Total Questions: 46 (Marks: 70)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Number representation & arithmetic (2's comp, IEEE 754) | 18 | 13 / 5 | 2021-S1×2, 2021-S2×2, 2022×2, 2023×2, 2024-S1, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S1×2, 2026-S2×2 |
| 2 | Boolean algebra & minimization (K-map) | 13 | 5 / 8 | 2021-S1, 2021-S2, 2024-S1, 2024-S2, 2025-S1×2, 2025-S2×3, 2026-S1×2, 2026-S2×2 |
| 3 | Sequential circuits (flip-flops, counters, FSM) | 8 | 2 / 6 | 2021-S1, 2021-S2, 2023×2, 2025-S1×2, 2025-S2, 2026-S1 |
| 4 | Combinational circuits (MUX, decoder, adders) | 7 | 2 / 5 | 2021-S2, 2022, 2023, 2024-S1×2, 2024-S2, 2026-S2 |

## 13. Compiler Design — Total Questions: 44 (Marks: 68)

| Rank | Topic | No. of Questions | 1-mark / 2-mark | Years Asked |
|---|---|---|---|---|
| 1 | Parsing (FIRST/FOLLOW, LL, LR, SLR, LALR) | 15 | 6 / 9 | 2021-S1×2, 2021-S2, 2022×2, 2024-S1×3, 2024-S2×2, 2025-S1, 2025-S2×2, 2026-S1, 2026-S2 |
| 2 | Syntax-directed translation | 7 | 2 / 5 | 2021-S1, 2022, 2023, 2024-S1, 2024-S2, 2025-S2, 2026-S1 |
| 3 | Lexical analysis, compiler phases & symbol table | 7 | 7 / 0 | 2021-S2, 2023×2, 2024-S2, 2025-S1, 2026-S1, 2026-S2 |
| 4 | Data-flow analysis (liveness, CSE, constant propagation) | 6 | 1 / 5 | 2021-S2×2, 2023, 2025-S1, 2026-S1, 2026-S2 |
| 5 | Basic blocks & local optimisation | 3 | 0 / 3 | 2021-S1, 2024-S1, 2025-S1 |
| 6 | Runtime environments (activation records, heap/stack) | 3 | 2 / 1 | 2021-S1, 2023, 2026-S2 |
| 7 | Intermediate code generation | 3 | 2 / 1 | 2021-S2, 2024-S2, 2025-S2 |

## Subject Weightage Summary

Trend compares average marks per paper in 2021–2023 (4 papers) with 2024–2026 (6 papers): **rising** / **falling** = change of more than 1 mark per paper, otherwise **stable**.

| Subject | Total Questions | Total Marks | Avg Marks per Paper | 2021–23 avg → 2024–26 avg | Trend |
|---|---|---|---|---|---|
| General Aptitude | 100 | 150 | 15.0 | 15.0 → 15.0 | stable |
| Engineering Mathematics | 100 | 148 | 14.8 | 16.8 → 13.5 | falling |
| Programming & Data Structures | 59 | 91 | 9.1 | 7.8 → 10.0 | rising |
| Operating System | 53 | 86 | 8.6 | 8.0 → 9.0 | stable |
| Algorithms | 53 | 82 | 8.2 | 8.2 → 8.2 | stable |
| Computer Networks | 52 | 81 | 8.1 | 8.5 → 7.8 | stable |
| Computer Organization & Architecture | 48 | 77 | 7.7 | 7.0 → 8.2 | rising |
| Databases | 48 | 73 | 7.3 | 7.0 → 7.5 | stable |
| Theory of Computation | 47 | 74 | 7.4 | 8.2 → 6.8 | falling |
| Digital Logic | 46 | 70 | 7.0 | 6.5 → 7.3 | stable |
| Compiler Design | 44 | 68 | 6.8 | 7.0 → 6.7 | stable |
| **Total** | **650** | **1000** | **100.0** | | |
## 🗓️ 2-Month Roadmap

**Assumptions:** 3 hours a day, 7 days a week, 8 weeks (56 days). Weeks 1–6 cover the syllabus; weeks 7–8 are for mocks and revision.

**Daily split (weeks 1–6):** about 1 h 45 min learning the day's topic → 55 min solving PYQs of that topic → 20 min General Aptitude.

**Hold back 3 papers as mocks:** do **not** practise from **2025-S2, 2026-S1 and 2026-S2** during weeks 1–6. They are the newest papers and the closest to the GATE 2027 pattern, so keep them unseen and use them as Mocks 1–3. The *PYQ Target* column counts only questions from the other 7 papers (2021-S1, 2021-S2, 2022, 2023, 2024-S1, 2024-S2, 2025-S1).

**Order used:** Foundations (weeks 1–2) → highest-frequency subjects and topics → lower-frequency ones. Inside each week, topics run from most asked to least asked (counts in brackets = questions across all 10 papers).

**General Aptitude slot (20 min every day, rotating):** Mon – verbal grammar/vocabulary (17 Qs) · Tue – spatial/visual reasoning (19) · Wed – arithmetic: %, ratio, profit (13) · Thu – logical reasoning & puzzles (12) · Fri – passage inference & sentence ordering (11) · Sat – algebra/sequences (11) + probability & counting (8) · Sun – geometry (5) + data interpretation (4). Solve the 70 GA questions from the 7 practice papers across weeks 1–6 (about 2 per day).

### Week 1 — Foundation I: Discrete Maths & Probability

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 1 | D1–D2 | Probability & statistics (21) + combinatorics (6) | Conditional probability, Bayes, random variables, expectation, the 5 distributions; permutations and combinations, inclusion–exclusion | 53 Qs this week (all Discrete Maths + Probability Qs in the 7 practice papers) | D7: re-solve every wrong Q, make a formula sheet |
| 1 | D3–D4 | Graph theory (15) | Degree sum, connectivity, planarity (Euler), colouring/chromatic number, matching, independent sets, adjacency matrix tricks | ↑ | ↑ |
| 1 | D5 | Sets, relations, functions, posets, lattices (8) + logic (7) | Equivalence relations, counting relations/functions, partial orders, lattices; tautology checks, translating English to predicate logic | ↑ | ↑ |
| 1 | D6 | Groups & monoids (6) + recurrences & generating functions (4) | Group axioms, abelian groups, subgroup orders (Lagrange), self-inverse elements; solving linear recurrences, closed-form generating functions | ↑ | ↑ |
| 1 | D7 | Revision | Re-attempt the week's PYQs without notes | – | Full week |

### Week 2 — Foundation II: Linear Algebra, Calculus & Digital Logic

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 2 | D1–D2 | Linear algebra (20) | Determinant properties, rank & null space, systems of equations (unique/none/infinite), eigenvalues (trace = sum, det = product), LU decomposition | 51 Qs this week | D7 + 30 min Week 1 formula sheet |
| 2 | D3 | Calculus (13) | Limits (L'Hôpital), continuity & differentiability (piecewise functions), maxima/minima, definite integrals | ↑ | ↑ |
| 2 | D4 | Number representation (18) | Base conversion, 2's complement & overflow, sign-magnitude, IEEE 754 single precision (encode/decode/add), Booth's algorithm | ↑ | ↑ |
| 2 | D5 | Boolean algebra & K-maps (13) | Boolean identities, SOP/POS, 4-variable K-map, minimal expressions, minterm/maxterm conversions | ↑ | ↑ |
| 2 | D6 | Sequential (8) + combinational circuits (7) | Flip-flops (D, T, JK), counters, FSM state minimisation; MUX-based function realisation, decoders | ↑ | ↑ |
| 2 | D7 | Revision | Re-attempt wrong Qs from weeks 1–2 | – | Weeks 1–2 |

### Week 3 — Programming & Data Structures + Algorithms

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 3 | D1 | C programming (21) | Pointers & pointer arithmetic, 2-D arrays, static/scope rules, strings, operator precedence, tracing output by hand | 73 Qs this week | D7 |
| 3 | D2 | Trees & BST (12) + binary heaps (8) | Traversals (pre/in/post), BST insertion, complete/full tree counts, heap array indexing, heapify, insert/extract costs | ↑ | ↑ |
| 3 | D3 | Stacks & queues (6), recursion (6), linked lists (5), arrays (1) | Stack/queue simulation, recursive call tracing, list manipulation code | ↑ | ↑ |
| 3 | D4 | Asymptotic complexity & recurrences (13), searching & sorting (7), hashing (6) | Master theorem, growth-rate ordering, comparisons in sorting/min-max, binary search, linear probing, chaining, double hashing | ↑ | ↑ |
| 3 | D5 | Graph traversals BFS/DFS (11) | DFS edge classification, discovery/finish times, BFS tree properties, connected components, articulation points | ↑ | ↑ |
| 3 | D6 | MST (9), shortest paths (3), DP (3), greedy (1), divide & conquer (0) | Kruskal/Prim, cut and cycle properties, counting MSTs, Dijkstra, DAG shortest path, rod cutting/LIS, Huffman coding | ↑ | ↑ |
| 3 | D7 | Revision | Re-solve all code-tracing Qs again (speed drill) | – | Weeks 1–3 (top 20 list only) |

### Week 4 — Computer Organization & Architecture + Operating System

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 4 | D1 | Cache memory (16) + memory hierarchy (2) | Tag/index/offset bits for direct-mapped and set-associative caches, hit/miss tracing, AMAT (1- and 2-level), write-back vs write-through | 71 Qs this week | D7 |
| 4 | D2 | Pipelining (11) + CPU performance (2) | Pipeline time with latch delay, stalls & speedup, RAW/WAR/WAW hazards, forwarding, CPI and Amdahl | ↑ | ↑ |
| 4 | D3 | Instruction set & addressing modes (9), I/O: interrupts & DMA (7), ALU/datapath (1) | Opcode-bit counting, addressing modes, DMA transfer rate (cycle stealing), vectored interrupts | ↑ | ↑ |
| 4 | D4 | Memory management & virtual memory (16) | Page table size, multi-level paging, TLB, LRU/FIFO/Optimal page faults, row-major array page faults | ↑ | ↑ |
| 4 | D5 | CPU scheduling (9) + processes & fork (9) | FCFS/SJF/SRTF/RR/priority waiting times, fork() print counting, user/kernel mode, threads | ↑ | ↑ |
| 4 | D6 | Synchronization (7), file systems & disk (7), deadlock (5) | Semaphore traces, deadlock conditions & Banker's, RAG, disk access time, linked/contiguous allocation | ↑ | ↑ |
| 4 | D7 | Revision | Bit-field numericals drill (cache + paging + opcode) | – | Weeks 2–4 |

### Week 5 — Databases + Computer Networks

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 5 | D1 | Keys, FDs & normal forms (14) | Attribute closure, candidate keys, superkey counting, 2NF/3NF/BCNF tests, lossless and dependency-preserving decomposition | 71 Qs this week | D7 |
| 5 | D2 | Transactions & concurrency control (11) | Conflict serializability (precedence graph), recoverability, 2PL, ACID | ↑ | ↑ |
| 5 | D3 | Relational algebra/TRC (8), file organisation & B+ trees (7), SQL (5), ER model (3) | Division and joins, TRC ↔ RA, nested/correlated SQL, B+ tree insert/split, index block-access counts | ↑ | ↑ |
| 5 | D4 | IPv4: subnetting, CIDR, fragmentation, NAT (16) | Longest-prefix match, aggregation, host counts, fragment counts/offsets, header fields changed by routers/NAT | ↑ | ↑ |
| 5 | D5 | TCP (10) + delays & flow control (8) | 3-way handshake, slow start/congestion avoidance windows, sequence-number bits; transmission/propagation delay, stop-and-wait and sliding-window utilisation | ↑ | ↑ |
| 5 | D6 | MAC/Ethernet/ARP (5), application layer (5), routing (4), error detection (3), layering (1) | CSMA/CD minimum frame, ALOHA, DNS/HTTP RTT counting, distance vector/link state, CRC and Hamming | ↑ | ↑ |
| 5 | D7 | Revision | Re-solve all DB + CN numericals | – | Weeks 3–5 |

### Week 6 — Theory of Computation + Compiler Design

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 6 | D1 | Regular expressions & finite automata (17) + regular-language closure/pumping (5) | DFA ↔ RE, minimal DFA state counts, NFA → DFA, string counting, closure properties | 66 Qs this week | D7 |
| 6 | D2 | CFG & PDA (10) + CFL identification/closure (9) | Language of a grammar/PDA, CNF derivation steps, ambiguity, is it regular / CFL / not CFL | ↑ | ↑ |
| 6 | D3 | Turing machines & undecidability (6) + lexical analysis & compiler phases (7) | Rice's theorem, decidable vs RE, which phase catches which error, token counting | ↑ | ↑ |
| 6 | D4 | Parsing (15) | FIRST/FOLLOW, LL(1) tables, LR(0)/SLR/LALR/CLR item sets and conflicts, GOTO item counts | ↑ | ↑ |
| 6 | D5 | SDT (7), intermediate code (3), runtime environments (3) | Evaluate SDT on input, S- vs L-attributed, three-address code/triples, activation trees | ↑ | ↑ |
| 6 | D6 | Data-flow analysis (6) + basic blocks & local optimisation (3) | Liveness at block exits, common subexpressions, counting basic blocks, DAG nodes | ↑ | ↑ |
| 6 | D7 | Revision | Re-attempt every wrong TOC/CD Q | – | Weeks 1–6 top 20 list |

### Weeks 7–8 — Mock Tests & Revision (final 2 weeks)

| Week | Days | Subjects/Topics | Daily Tasks | PYQ Target | Revision |
|---|---|---|---|---|---|
| 7 | D1 | **Mock 1 = GATE 2025 Set 2** | Full 3-hour paper, timed, in one sitting | 65 Qs | – |
| 7 | D2 | Mock 1 analysis | Mark every error as concept / calculation / time; list weak topics | – | Weak topics |
| 7 | D3–D5 | Revise Most Important Topics 1–10 (Section 1) | 1 hour notes + 1 hour mixed PYQs + 1 hour weak-topic fixes (from Mock 1) | Re-solve wrong PYQs | Ranks 1–10 |
| 7 | D6 | **Mock 2 = GATE 2026 Set 1** | Full 3-hour paper, timed | 65 Qs | – |
| 7 | D7 | Mock 2 analysis | Same error log; compare marks per subject with Mock 1 | – | Weak topics |
| 8 | D1–D3 | Revise Most Important Topics 11–20 + foundation formula sheets | Rapid review of formula sheets; GA mixed set of 10 Qs each day | Re-solve wrong PYQs | Ranks 11–20 |
| 8 | D4 | **Mock 3 = GATE 2026 Set 2** | Full 3-hour paper, timed | 65 Qs | – |
| 8 | D5 | Mock 3 analysis | Fix the 3 weakest topics only | – | Weak topics |
| 8 | D6 | Lowest-frequency topics, quick pass | One skim each: ER model, layering, ALU, greedy, divide & conquer, CPU performance | – | Low-frequency list |
| 8 | D7 | Light revision | Formula sheets + error log only; no new material | – | Everything |

**If you have more than 8 weeks:** add more mocks from a test series and older PYQs (2015–2020) in weeks 7–8, and keep the same topic order.

## Unclassified Questions

**None.** All 650 questions (10 papers × 65) were tagged with a subject and topic.

Points to note about tagging accuracy:

- **2021 (both sets):** The PDF is scanned, so it was read with OCR. Some options that were only figures (GA Q2, Q4, Q7 and the DFA diagrams in CS Q38) were not readable, but every question stem was clear enough to tag the topic. MCQ/MSQ/NAT types and marks come from the answer key at the end of the file.
- **2023:** No answer key in the file, so question types were taken from the wording ("which one" = MCQ, "one or more / is/are" = MSQ, blank = NAT).
- **Questions covering two topics** were placed under their main topic only, so each question is counted once. Examples: 2022 Q15, reversing a linked list (Linked lists, also complexity); 2024-S1 Q33, operator precedence (Parsing, also C expressions); 2024-S2 Q56, counting useful FDs (FDs, also combinatorics); 2025-S2 Q16, ARP plus TCP piggybacking (MAC/ARP, also TCP).
