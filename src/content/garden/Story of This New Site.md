---
created: 2023-01-01
updated: 2023-01-06
cover: "https://res.cloudinary.com/dhmwreddz/image/upload/v1673076025/digital-garden/cover/moving-forward.jpg"
abstract: "Reasons behind my redesign decision. What's new and what's changed."
---

Ever since I started web development, I've been through so many blogging platforms. Most of them I deployed to learn the ins and outs of deploying something. I think I started with WordPress. After a while, I moved to Ghost on the cloud, which I spent using lunch money. Then Medium arrived, I secured a domain `blog.pix7.me` while it was free to do so. But I've never written anything routinely.

There's always something about writing that deter me from doing so. I always find myself wanting to add more ideas and improve what I write. Basically, I never think of my blog post as being perfect, ready for printing press kinda thing. It feels more like a note to me, a note that I wanted to publish for people to read. All the blogs that I used felt like that.

But I think I know how to start writing and "publishing" again.

…

I've been using [Obsidian](https://obsidian.md/) for normal note-taking (ideas, journaling.) I migrated from Bear Notes, Notion, and Day One, and put everything in just this app. For those who aren't familiar with Obsidian, it is a note-taking app that uses a native file system (you know, folder, files, Windows Explorer, macOS Finder, all of that) to store your notes as a Markdown. I really liked the idea of all my notes in files, that way I can move them around without restricting myself to a proprietary format that others note-taking apps may have (imagine trying to export your notes from Notion or Evernote.)

After using it as a note-taking app for a while, I learned the concept of a second brain, the idea of putting knowledge into digital notes with links between each note to help fortify the relationship between knowledge. And that's when I got my will to write back.

And here we are, a new place, all customized and personalized to how I liked it. I will add an explanation of the garden concept and how I build this site below. (That's how comfortable I am to "publish" a non-finish note :P)

# What's New

## Rebranding(?)

I've been using the old favicon for the longest time, I did the redesign in a short time frame, just putting stuff where it felt right. And it is now on the top-left of the page, representing `P` and `7`. By the way, these "initials" came a long way from `PixelArt7`, one of my first online in-game names (there were several more, but let that be history :P). Then it became `PIX7`, I just wanted a shorter version, and that's also my domain name. `P7` in the logo is just that. I just like the number 7 and the light-blue color.

Unlike the previous site where I used system font (to speed a lot of things up,) this time I picked fonts for my site. The fonts I used here are:
- Epilogue – for display, headings
- Inter – for body text in sans serif
- Lora – for long-form text in my notes, this one is a serif
- Several Thai fonts, just in case I feel like writing in Thai: IBM Plex Sans Thai and Noto Serif Thai

## Dark Mode and Decrease Primary Color

My previous site is blasted (and blessed, in my personal opinion :P) with light-blue color. Well… I'm so sorry for hurting visitors' eyes, no more bright light blue. There's a dark mode toggle on the top-right, just to help those night owls browsing in the night!

## Digital Garden

As I mentioned earlier, I will use this space to share my thoughts. Previously, my thoughts have nowhere to go because I was afraid of publishing a non-perfect article. But no more, I adopt the idea of evergreen notes to help me ease those fear. Read more on this at [[Stages of My Note]] and [[I Finally Understand Obsidian (My Takes on Second Brain and Digital Garden)]]. In the future, I want to share more on [[My Writing Flow]], how I consume content, and write something in Obsidian.

Ps. You may notice that some of those links aren't working (leads to the Not Found page) because I haven't written/created those pages yet. But it is a signal for me to write them in the future.

# Technical Things

Some of the technical aspects of my previous site and this one.

![Comparison of my old and new website](https://res.cloudinary.com/dhmwreddz/image/upload/v1673076027/digital-garden/attachments/old-vs-new.jpg)

## Old Site

A simple single page with who I am, and what I did.

- Build on Vue 3 with Vite
- Repository on GitHub
- Build with GitHub Actions
- Host on GitHub Pages

## This New Site

A place for me to publish content and a small corner for my personal information.

- Build on Astro and Svelte
- Repository on GitHub
- Build with Cloudflare Pages
- Host on Cloudflare Pages