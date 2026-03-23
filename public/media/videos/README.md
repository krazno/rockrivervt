# Trail tour video (not in Git)

`rock-river-trail-tour-full-hike.mp4` is **ignored by Git** (file is &gt; GitHub’s 100MB limit).

**Local dev:** place the `.mp4` in this folder yourself — the site expects it at  
`/media/videos/rock-river-trail-tour-full-hike.mp4`.

**Production:** upload the same file to your host’s static storage, or use a CDN / object storage and update `data/media.ts` with the public URL.

Optional: use [Git LFS](https://git-lfs.github.com) if you want the asset versioned without storing the blob in normal Git.
