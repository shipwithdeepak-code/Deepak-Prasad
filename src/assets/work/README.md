Case study cover images.

Drop one file per case study, named after its slug:

  reshamandi.jpg
  ai-coach.jpg
  subscription.jpg
  performance-score.jpg
  ai-localization.jpg
  behind-ai-copilot.jpg

16:10, 1160x725, under ~250KB each. The card picks a file up automatically
once it is here and shows the study's strongest metric until then.

They live here rather than in public/ on purpose: the build reads this
folder, so a card only requests an image that actually exists. A missing
file under public/ is answered by the SPA with index.html, which cost six
phantom requests and pushed first paint to 13 seconds on a throttled phone.
