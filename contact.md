You can reach me by email at sylvie at 83c dot nl. It's a redirect to my main email, which I'm probably not going to put online.
Thanks to Lance B for sorting that out.

When you contact me, please don't hesitate to encrypt your communications;  my RSA-3072 public key, generated with OpenSSL, is

```
-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA4NNfHCruzr+8k727XZkP
gD58dbyfJvO1vFdfRHoboXRg63Gmpmf4gKPSADf8FsVcdpKaLX8SzE9b5k99rLqV
jPFzQd1TuNz3uM9aTY+YaWAOLtOkMjUCK8wXFXsFkHn8nU9xHG5DlWjj85xQW6jz
Pfg1YWF0d/9mqB90ggRMKcI1QkasS5Gm8R2/Q90HnfHQ4D9IbO0evsXCpeS+/ZiK
8AUJ4dSnLZlv4kcXdU0mhoBVZ45BDXfZsUSUl+zvOuJuOf6P+ohLF9HXhKtdMmE5
LcneZY6aQTECEEhxJasgqTpFXsZYXSV7HMMDqgiuRgCR7RIahH7mcxDnL7cxxv5d
3CuA9zRtdILJMyNdvZSB5oEUQHFEFHpQTA9U7TnRu0Kp8vqQGyKV8RtzzUZNA8S2
KIP095gpDP3mCJjBX0MZci3I1J9vy0W1jXRldZKkFc7E4l1mki56sV6LQxKMKeCi
Whq1RrwdWUZjQMAewM82MhIfNYm96tv7k4qZ5cXu3BsxAgMBAAE=
-----END PUBLIC KEY-----

Fingerprint (SHA-256): fa:e6:7a:61:23:98:fc:4a:90:82:6a:14:cd:bd:f8:be:c9:3a:76:af:3a:de:16:12:97:6e:93:1c:d5:8e:ab:36
```

To directly download the key, for whatever reason, it's [here](certs/rsa3072.pub).

And if you want to ensure I am who I say I am, you can request a digital signature; my ECDSA-320 public key, also generated with OpenSSL, is:

```
-----BEGIN PUBLIC KEY-----
MGowFAYHKoZIzj0CAQYJKyQDAwIIAQEKA1IABBWc5P3lW0owkLooprbDBIo2JzYp
4LnYKhlDc/HviqPCjzgI9EK3YHOK3LpU+KgAOOwjJm5yOIWGqgZubF8SAOF3hzSr
edc4CPVpzqSQ7rOL
-----END PUBLIC KEY-----

Fingerprint (SHA-256): 5d:56:2b:f7:2f:51:ba:30:1a:b2:6a:e2:65:33:15:ce:55:f5:1a:af:8e:f6:84:98:74:ac:24:13:29:61:0d:6f
```

I didn't use the P-xxx curves out of distrust :P 320 bits is a more secure key size anyways (and 521 is overkill). Please do see [this](https://bada55.cr.yp.to/brainpool.html) document though. To directly download the key, it's [here](certs/brainpool320t1.pub).

The ECDSA key has been self-signed for 10 years - not valid after September 23, 2034:

```
-----BEGIN CERTIFICATE-----
MIICazCCAgKgAwIBAgIUWvmAZt77A+B2E6zC0UpOA7U8rAgwCgYIKoZIzj0EAwIw
ezELMAkGA1UEBhMCR0IxFTATBgNVBAoMDFVuYWZmaWxpYXRlZDEXMBUGA1UECwwO
Tm90IEFwcGxpY2FibGUxHjAcBgNVBAMMFUpheWRlIFN5bHZpZSBNYXNzbWFubjEc
MBoGCSqGSIb3DQEJARYNc3lsdmllQDgzYy5ubDAeFw0yNDA5MjUxMjUwMTRaFw0z
NDA5MjMxMjUwMTRaMHsxCzAJBgNVBAYTAkdCMRUwEwYDVQQKDAxVbmFmZmlsaWF0
ZWQxFzAVBgNVBAsMDk5vdCBBcHBsaWNhYmxlMR4wHAYDVQQDDBVKYXlkZSBTeWx2
aWUgTWFzc21hbm4xHDAaBgkqhkiG9w0BCQEWDXN5bHZpZUA4M2MubmwwajAUBgcq
hkjOPQIBBgkrJAMDAggBAQoDUgAEFZzk/eVbSjCQuiimtsMEijYnNingudgqGUNz
8e+Ko8KPOAj0Qrdgc4rculT4qAA47CMmbnI4hYaqBm5sXxIA4XeHNKt51zgI9WnO
pJDus4ujUzBRMB0GA1UdDgQWBBRW+W05Pr3pGoXTnGzsmyLFXk0hgDAfBgNVHSME
GDAWgBRW+W05Pr3pGoXTnGzsmyLFXk0hgDAPBgNVHRMBAf8EBTADAQH/MAoGCCqG
SM49BAMCA1cAMFQCKH0gMRFYbSe4J1ZeaYotApgRS4UJHKkbvTi+zmRDVR4rXrmy
EksExRUCKCoa5VjwluJWkwdydN++1Q//JsRMNzrMuO2jTbVrCN3/O6NxZRvesJM=
-----END CERTIFICATE-----
```

To directly download the certificate, it's [here](certs/rsa3072_cert.crt).

The RSA key has also been self-signed - same expiration date:

```
-----BEGIN CERTIFICATE-----
MIIE1zCCAz+gAwIBAgIUDyjWBScj+Lu9eJxCwr/r0nN3b2wwDQYJKoZIhvcNAQEL
BQAwezELMAkGA1UEBhMCR0IxFTATBgNVBAoMDFVuYWZmaWxpYXRlZDEXMBUGA1UE
CwwOTm90IEFwcGxpY2FibGUxHjAcBgNVBAMMFUpheWRlIFN5bHZpZSBNYXNzbWFu
bjEcMBoGCSqGSIb3DQEJARYNc3lsdmllQDgzYy5ubDAeFw0yNDA5MjUxMjUxNTJa
Fw0zNDA5MjMxMjUxNTJaMHsxCzAJBgNVBAYTAkdCMRUwEwYDVQQKDAxVbmFmZmls
aWF0ZWQxFzAVBgNVBAsMDk5vdCBBcHBsaWNhYmxlMR4wHAYDVQQDDBVKYXlkZSBT
eWx2aWUgTWFzc21hbm4xHDAaBgkqhkiG9w0BCQEWDXN5bHZpZUA4M2MubmwwggGi
MA0GCSqGSIb3DQEBAQUAA4IBjwAwggGKAoIBgQDg018cKu7Ov7yTvbtdmQ+APnx1
vJ8m87W8V19EehuhdGDrcaamZ/iAo9IAN/wWxVx2kpotfxLMT1vmT32supWM8XNB
3VO43Pe4z1pNj5hpYA4u06QyNQIrzBcVewWQefydT3EcbkOVaOPznFBbqPM9+DVh
YXR3/2aoH3SCBEwpwjVCRqxLkabxHb9D3Qed8dDgP0hs7R6+xcKl5L79mIrwBQnh
1KctmW/iRxd1TSaGgFVnjkENd9mxRJSX7O864m45/o/6iEsX0deEq10yYTktyd5l
jppBMQIQSHElqyCpOkVexlhdJXscwwOqCK5GAJHtEhqEfuZzEOcvtzHG/l3cK4D3
NG10gskzI129lIHmgRRAcUQUelBMD1TtOdG7Qqny+pAbIpXxG3PNRk0DxLYog/T3
mCkM/eYImMFfQxlyLcjUn2/LRbWNdGV1kqQVzsTiXWaSLnqxXotDEowp4KJaGrVG
vB1ZRmNAwB7AzzYyEh81ib3q2/uTipnlxe7cGzECAwEAAaNTMFEwHQYDVR0OBBYE
FNvzxY/KTQ/hGcwL7CcEPHWk3jKDMB8GA1UdIwQYMBaAFNvzxY/KTQ/hGcwL7CcE
PHWk3jKDMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggGBAJNMUwFo
onzV9qsjskqsv1+FnVR3g8QDc7OQWmipRUqKiAMPh5p5jVu9ELs0kSSYA2IApLQI
y7ShPNCsGUFbexSZleA6aJD9Go65wopV6J7w6Aoqvylov7YAky1QOBrTV1kpKf6W
grObAXVs0pZyXmRbWxNG2UpTWB1+4vjbFNHTZeXTRS4fzyZQr1SuSgCz/Cs/cAAU
FcQtuyxJT3As/W97GkGqxCij6caA68SE2oUQmPPp9KfaTO/pPlAtKTKol8sjgV7F
EI9mjwQb0u7NeKFOSGD/bFtKKTLcQDcE1fajMVz1Y6af3bewcaYqcmxS9ipt3mv8
PUNBsJyaiarUwLRAXu1b4u6M47tXQkHTB3xVIodx3Sh5zNJ1mkUfxgltv/hR9wTx
HDIkqUfQEwSV4gSZVOpzNIXDpxZkBQwQLF6GVpF/m9Eef+zVg+7A454bRtsq6IcA
5JaWlj5Whx2IKqRyEhAA48sjlxoTQMugy71m1ebOATZtZVCUEFLUPIlzsQ==
-----END CERTIFICATE-----
```

To directly download the certificate, it's [here](certs/brainpool320t1_cert.crt).