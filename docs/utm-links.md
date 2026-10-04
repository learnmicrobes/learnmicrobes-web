# Tagged links for social posts

## Why

73% of traffic reports as `(direct) / (none)` in GA4. Some of that is genuinely
direct, but most of it is people arriving from a Facebook post or a Reddit
comment where the link carried nothing to identify it. Once paid traffic starts,
untagged links become a real problem: paid, social and word-of-mouth all land in
the same bucket and there is no way to tell which one produced an account.

Tagging costs nothing — it is three parameters on the end of a URL the owner was
going to post anyway.

## The convention

| Parameter | Value | Why it matters |
|---|---|---|
| `utm_source` | `facebook`, `reddit`, `threads`, `instagram`, `x` | Which platform |
| `utm_medium` | **always `social`** | GA4 only files a visit under "Organic Social" when the medium is exactly `social`. `referral`, `fb`, or `post` all fall back to Unassigned, which is where the noise already lives. |
| `utm_campaign` | `bench_cards`, `practice`, `tools`, `ascp`, `learn`, `general` | Which push the post belongs to |

Lowercase everything. GA4 treats `Facebook` and `facebook` as two different
sources and will split the same channel across two rows.

## Ready to paste — Facebook

Facebook is the main channel today (18 users in the last window, against 1 from
Reddit), so these are written for it. For another platform, change
`utm_source=facebook` to `reddit`, `threads`, `instagram` or `x` and leave the
rest alone.

| Page | Link to paste |
|---|---|
| Visual Atlas index | `https://learnmicrobes.com/visuals?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| ONPG test card | `https://learnmicrobes.com/visuals/onpg-test?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Motility testing card | `https://learnmicrobes.com/visuals/motility-testing?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Urease test card | `https://learnmicrobes.com/visuals/urease-test?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Esculin hydrolysis card | `https://learnmicrobes.com/visuals/esculin-hydrolysis?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Salt tolerance card | `https://learnmicrobes.com/visuals/salt-tolerance?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| TSI card | `https://learnmicrobes.com/visuals/tsi-test?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Catalase card | `https://learnmicrobes.com/visuals/catalase-test?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards` |
| Practice hub | `https://learnmicrobes.com/practice?utm_source=facebook&utm_medium=social&utm_campaign=practice` |
| Biochemical calculator | `https://learnmicrobes.com/biochemical-calculator?utm_source=facebook&utm_medium=social&utm_campaign=tools` |
| Biochemical tests reference | `https://learnmicrobes.com/biochemical-tests?utm_source=facebook&utm_medium=social&utm_campaign=tools` |
| Unknown isolate workup | `https://learnmicrobes.com/unknown-isolate-workup?utm_source=facebook&utm_medium=social&utm_campaign=tools` |
| ASCP review hub | `https://learnmicrobes.com/ascp-microbiology-review?utm_source=facebook&utm_medium=social&utm_campaign=ascp` |
| Gram stain concept page | `https://learnmicrobes.com/learn/gram-stain?utm_source=facebook&utm_medium=social&utm_campaign=learn` |
| Learn index | `https://learnmicrobes.com/learn?utm_source=facebook&utm_medium=social&utm_campaign=learn` |
| Home page | `https://learnmicrobes.com/?utm_source=facebook&utm_medium=social&utm_campaign=general` |

The bench-card links are listed first on purpose. 216 of 448 users opened an
atlas card last month, more than any other part of the site, and those pages
bounce at 0–14% against 40% on the home page. A post about a specific test
should link to that test's card, not to the front door.

## Making a new one

Take any page URL from the sitemap and append:

```
?utm_source=facebook&utm_medium=social&utm_campaign=bench_cards
```

If the URL already has a `?` in it (the biochemical tests page does, when it
deep-links to a specific test), join with `&` instead of `?`.

## Two things not to tag

**Google Ads URLs.** Ads uses auto-tagging (`gclid`) and adding UTM parameters on
top of it overrides the auto-tagged data, which loses keyword, match type and
cost. Put the plain URL in the ad.

**Internal links.** A UTM parameter on a link inside the site starts a brand new
session in GA4 and credits it to the tag — so one visitor reading three pages
would count as three social visits. Tag only links posted somewhere else.

## Where to read the result

GA4 → Reports → Acquisition → Traffic acquisition, then switch the dimension to
**Session source / medium** or **Session campaign**. Give it 24–48 hours; GA4
does not backfill, so a link posted untagged stays untagged forever.
