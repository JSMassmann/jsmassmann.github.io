BW is an esolang created by myself, inspired by the language `WHILE` often used to teach computability theory. It's essentially just a binary encoding of it (hence the name, Binary WHILE), making for a fun and compact language.

As in regular `WHILE`, all datatypes are binary trees. All expressions are either:

- A variable.
- `(A, B)`, the binary tree whose two root children are `A` and `B`.
- `hd A`, the left child of `A`'s root.
- `tl A`, the right child of `A`'s root.
- `nil`, the empty binary tree.

All instructions are either:

- Assigning an expression `B` to a variable `A`.
- While a given expression is non-`nil`, do the code in the block.
- If this expression is non-`nil`, do the code in the block (just once).
- The above, but also with an `else` branch.

A program is: take in a value, store it in variable `X`, perform the instructions in this block, then return variable `Y`.

In the binary encoded version, an expression is either:

- `1^(i+1) 0`, for `i > 0`, representing variable `#i`.
- `1000AB`, where `A` and `B` are expressions, representing `(A,B)`.
- `1001A`, where `A` is an expression, representing `hd A`.
- `1010A`, where `A` is an expression, representing `tl A.
- `1011`, representing `nil`.

A command is either:

- `00AB`, where `A` is a variable and `B` is an arbitrary expression.
- `01 1^i 0AB` or `10 1^i 0AB`, where `A` is an expression, and `B` is a block of `i` statements.
- `11 1^i 0 1^j 0ABC`, where `A` is an expression, and `B` and `C` are blocks of `i` and `j` statements, respectively.

These have their obvious respective meanings.

A program is `1^i 0 A 0 1^j` where `A` is a block of instructions, reading to `#i` and writing from `#j`.

Using standard encodings, we can do stuff with this language.

- Booleans: while any non-`nil` tree is truthy, we can explicitly encode `true` as `(nil, nil)`.
- Lists: we encode `[]` as `nil` and `[a1, a2, ..., an]` as `(a1, (a2, (...(an, nil))...))`.
- Numbers: we use unary, with `0` being `nil` and `n+1` being `(nil, n)`.

This implies e.g. `1 = [[]]`, `2 = [[],[]]`, etc. and also implies strange results such as `0 == [] == false`.

Let us write some example programs in BW (we add spaces and new lines for ease of reading). First of all:

This program reads two numbers `n` and `m` from stdin (encoded as `[n, m]`) and writes `n+m` to stdout.

```
10
00 1110 1001 110
00 11110 1001 1010 110
01 110 11110
00 1110 1000 1011 1110
00 11110 1010 11110
011
```

The following is a simpler program, reading `n` from stdin and writing `n+1` to stdout.

```
10
00 110 1000 1011 110
01
```

For multiplication of numbers, we have:

```
10
00 1110 1001 110
00 11110 1001 1010 110
01 11111 0 11110
00 111110 1001 110
01 11 0 111110
00 1110 1000 1011 1110
00 111110 1010 111110
00 11110 1010 11110
011
```

Second-to-last for arithmetic, a program reading `n` from stdin and writing `n-1` to stdout:

```
10
00 110 1010 110
01
```

And lastly, a program reading `n` and `m` from stdin and writing `n-m` (zero if `m > n`) to stdout:

```
10
00 1110 1001 110
00 11110 1001 1010 110
01 110 11110
00 1110 1010 1110
00 11110 1010 11110
011
```

For some operations on booleans, the below reads two booleans `n` and `m` from stdin and prints `n AND m` to stdout:

```
10
11 1 0 1 0 1001 1010 110
00 1110 1001 110
00 1110 1011
011
```

Meanwhile for `OR`:

```
10
11 1 0 1 0 1001 1010 110
00 1110 1000 1011 1011
00 1110 1001 11
011
```

And for `XOR`:

```
10
11 111 0 1 0 1001 1010 110
11 1 0 1 0 1001 110
00 1110 1011
00 1110 1000 1011 1011
00 1110 1001 110
011
```

Lastly, this program reads `n` from stdin and prints `NOT n` to stdout:

```
10
11 1 0 1 0 110
00 110 1011
00 110 1000 1011 1011
01
```
