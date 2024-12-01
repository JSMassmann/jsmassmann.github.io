SXBG - the SIMD XOR Bit Generator - is a DRBG (deterministic random bit generator) created by myself. While not cryptographically secure, it provides an alternative to LCGs, the Mersenne Twister and XorShift for a space-efficient (32-byte state, 16 bytes constant data) PRNG which is easy to implement and fast on modern CPUs.

In this exposition, a vector refers to a collection of 16 bytes whose elements are operated on in parallel. This functionality is available on almost all modern x86/x64 CPUs (with MMX, SSE or AVX), as well as ARM CPUs with Neon.

We denote vectors using curly braces. The SXBG internal state consists of vectors `next1` and `next2`. These are initialized to:

```
next1 = {0xbf, 0x17, 0x9f, 0xf5, 0x32, 0x65, 0x3a, 0xb9, 0xc5, 0x15, 0x49, 0xab, 0x84, 0x80, 0xe0, 0x67}
next2 = {0x2c, 0x31, 0x0e, 0xae, 0x0c, 0x86, 0xb5, 0x0d, 0x03, 0x58, 0x22, 0x9f, 0x50, 0x32, 0x15, 0xa9}
```

These values were simply chosen from a source of hardware entropy - `/dev/urandom` - and an implementer may change them if they wish.

Additionally, the following constant vector is used to "mix in" randomness. I challenge the reader to figure out how it was calculated (it is not truly random) - I doubt it will ever be found. Again, an implementer may change it if they wish:

```
global_rand = {0x5c, 0x3f, 0x6e, 0x3f, 0x09, 0x81, 0xee, 0xda, 0xf5, 0xe3, 0x8e, 0x81, 0xd4, 0x59, 0x59, 0x62}
```

The state also consists of a counter `stage`, from 0 to 4, initialized as 0. This is so that the state only needs to be fully updated every 128 bits of data, without compromising security.

To update the state and use it to generate a new random number, when `stage` is 0, the following steps are taken, where `^` denotes XOR and addition, XOR and shift are done componentwise on vectors:

- Store `next1 ^ next2` in some temporary vector `temp`.
- Add `global_rand` to `temp`.
- XOR `(temp >> 1) ^ (next1 << 1)` to `temp`.

Now store the old value of `next2` in `next1`, and store `temp` in `next2`. When `stage` is not 0, simply rotate the vector left by 4 bytes, which on x86 can be accomplished via the `pshufd` instruction. To "squeeze" a number out of the state, treat `next2` now as a vector of 4 32-bit integers `x0, x1, x2, x3` and return `(x0 >>> 1) ^ x1 ^ x2`.

For example, the first value generated will be `0x9fa2ff1c`:

- `temp` starts out as `{0x93, 0x26, 0x91, 0x5b, 0x3e, 0xe3, 0x8f, 0xb4, 0xc6, 0x4d, 0x6b, 0x34, 0xd4, 0xb2, 0xf5, 0xce}`.
- Adding `global_rand` sets it as `{0xef, 0x65, 0xff, 0x9a, 0x47, 0x64, 0x7d, 0x8e, 0xbb, 0x30, 0xf9, 0xb5, 0xa8, 0x0b, 0x4e, 0x30}`.
- XORing `(temp >> 1) ^ (next1 << 1)` gives it its final value of `{0xe6, 0x79, 0xbe, 0x3d, 0x00, 0x9c, 0x37, 0xbb, 0x6c, 0x02, 0x17, 0xb9, 0xf4, 0x0e, 0xa9, 0xe6}`.
- The computation becomes `(0xe679be3d >>> 1) ^ 0x009c37bb ^ 0x6c0217b9 = 0xf33cdf1e ^ 0x009c37bb ^ 0x6c0217b9 = 0x9fa2ff1c`.

The next three values computed are:

- `0x804e1bdd ^ 0x6c0217b9 ^ 0xf40ea9e6 = 0x1842a582`.
- `0xb6010bdc ^ 0xf40ea9e6 ^ 0xe679be3d = 0xa4761c07`.
- `0x7a0754f3 ^ 0xe679be3d ^ 0x009c37bb = 0x9ce2dd75`.

After which `global_rand` is added again.

I'm personally quite proud of this little PRNG! While, as already mentioned, it's not cryptographically secure - unlike ChaCha20, only one round of "hiding" is done, which doesn't involve (more complex) mod 2^32 addition or rotations by more than one bit - it passes TestU01's SmallCrunch and LinearComp with flying colours, beating the Mersenne Twister for the latter. Below are the SmallCrush logs, suitably abridged:

```
p-value of smarsa_BirthdaySpacings    :    0.81
p-value of Collisions                 :    0.58
p-value of sknuth_Gap                 :    0.92
p-value of sknuth_SimpPoker           :    0.05
p-value of sknuth_CouponCollector     :    0.73
p-value of sknuth_MaxOft              :    0.34
p-value of sknuth_MaxOft [second]     :    0.86
p-value of svaria_WeightDistrib       :    0.19
p-value of smarsa_MatrixRank          :    0.04 [ Significant ]
p-value of sstring_HammingIndep       :    0.61
p-value of Statistic H                :    0.23
p-value of Statistic M                :    0.43
p-value of Statistic J                :    0.88
p-value of Statistic R                :    0.05
p-value of Statistic C                :    0.75

========= Summary results of SmallCrush =========

Version:               TestU01 1.2.3
Generator:             sxbg
Number of statistics:  15
Total CPU time:        00:00:03.85

All tests were passed
```

Below are the LinearComp logs, with sample sizes up to 1,000,000 (whereas the Mersenne Twister reaches p > 0.99 at sample size 50,000):

```
p-values of n = 250                    :    1-eps1, 0.05 *
p-values of n = 500                    :    0.27,   0.66
p-values of n = 1000                   :    0.82,   0.08
p-values of n - 5000                   :    0.40,   0.96 [ Significant ]
p-values of n = 25000                  :    0.13,   0.17
p-values of n = 50000                  :    0.42,   0.32
p-values of n = 75000                  :    0.74,   0.53
p-values of n = 100000                 :    0.16,   0.95
p-values of n = 200000                 :    0.55,   0.02 [ Significant ]
p-values of n = 500000                 :    0.85,   0.64
p-values of n = 1000000                :    0.53,   0.28

* While this is technically a failure, it is completely exonerated by larger n.
```

Furthermore, logs from the entropy measuring tool `ent` on a 32 MiB sample give the following results:

```
Entropy = 7.999994 bits per byte.
Optimum compression would reduce the size of this 33554432 byte file by 0 percent.
Chi square distribution for 33554432 samples is 256.22, and randomly would exceed this value 46.68 percent of the times.
Arithmetic mean value of data bytes is 127.5029 (127.5 = random).
Monte Carlo value for Pi is 3.141550013 (error 0.00 percent).
Serial correlation coefficient is -0.000233 (totally uncorrelated = 0.0).
```

with the cryptographically secure, hardware-seeded `/dev/urandom` for comparison:

```
Entropy = 7.999994 bits per byte.
Optimum compression would reduce the size of this 33554432 byte file by 0 percent.
Chi square distribution for 33554432 samples is 271.58, and randomly would exceed this value 22.71 percent of the times.
Arithmetic mean value of data bytes is 127.4831 (127.5 = random).
Monte Carlo value for Pi is 3.142471262 (error 0.03 percent).
Serial correlation coefficient is -0.000088 (totally uncorrelated = 0.0).
```

Below is a randogram of SXBG, with true randomness, PCG-RS, PCG-RXS-M-XS, the Mersenne Twister, XorShift32, a 32-bit LCG (minstd), and an A5/1-based LFSR for comparison. Almost all, except for the terribly-designed minstd, look similar, but the randograms are in 800 x 800 resolution, so you can zoom in.

![Randograms for true randomness, SXBG, PCG-RS, PCG-RXS-M-XS, MT, XorShift32, minstd and A5/1.](randograms.png "Randograms")

Lastly, regarding performance, the following statistics were obtained on an Intel i3-1215U, utilizing a single core, clocked at 4.4 GHz, with 12 GiB memory:

```
Testing speed...

1073741824 calls to sxbg - 4 GiB random data generated - succeeded in 2.214285 seconds.
1073741824 calls to sxbg - 4 GiB random data generated - succeeded in 2.116545 seconds.
1073741824 calls to sxbg - 4 GiB random data generated - succeeded in 2.216574 seconds.
1073741824 calls to sxbg - 4 GiB random data generated - succeeded in 2.197781 seconds.
Overall, 4294967295 calls to sxbg - 16 GiB random data generated - succeeded in 8.745185 seconds, including printf and clock_gettime overhead.
```

These give measurements of an average cpb of 2.23976176, for an implementation (provided at the bottom of the page) compiled with `gcc -O3`.

I hope you enjoyed this blog post, and might consider using SXBG! When unpredictability *really* is important, I wouldn't advise it; it fails 28/144 tests of the more exhaustive Crunch from TestU01. But I'm quite proud of the performance. Below is my simple implementation, in ANSI C with GNU extensions:

```
#include <stdint.h>
#include <stdio.h>

#include <time.h>

typedef uint8_t m128 __attribute__ ((vector_size (16)));

#define TO32B(x,i) (((x)[i] << 24) + ((x)[i+1] << 16) + ((x)[i+2] << 8) + ((x)[i+3]))

uint32_t ror(const uint32_t value, const uint8_t shift) {
  return (value >> shift) | (value << (32 - shift));
}

m128 global_rand    = {0x5c, 0x3f, 0x6e, 0x3f, 0x09, 0x81, 0xee, 0xda, 0xf5, 0xe3, 0x8e, 0x81, 0xd4, 0x59, 0x59, 0x62};

uint32_t sxbg (void) {
  static uint8_t stage = 0;

  static m128 next1 = {0xbf, 0x17, 0x9f, 0xf5, 0x32, 0x65, 0x3a, 0xb9, 0xc5, 0x15, 0x49, 0xab, 0x84, 0x80, 0xe0, 0x67};
  static m128 next2 = {0x2c, 0x31, 0x0e, 0xae, 0x0c, 0x86, 0xb5, 0x0d, 0x03, 0x58, 0x22, 0x9f, 0x50, 0x32, 0x15, 0xa9};

  m128 temp = {4,5,6,7,8,9,10,11,12,13,14,15,0,1,2,3};

  if (stage % 4 == 0) {
    temp = next1 ^ next2;
    temp += global_rand;
    temp ^= (temp >> 1) ^ (next1 << 1);

    next1 = next2;
    next2 = temp;
  } else {
    next2 = __builtin_shuffle(next2, temp);
  }

  stage = (stage < 4) ? stage + 1 : 0;
  return ror(TO32B(next2, 0), 1) ^ TO32B(next2, 4) ^ TO32B(next2, 8);
}
```
