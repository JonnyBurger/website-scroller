# Remotion video

Turn a URL into a video that scrolls the website to the top and gives a video. Inspired by

This is how you could turn ping.gg into a video:

```bash
set -e
sudo npm i -g puppeteer-screenshot-cli
puppeteer-screenshot --width 1920 --fullPage 'https://ping.gg/' > screenshot.jpg
export SCREENSHOT=$(curl --upload-file ./screenshot.jpg https://transfer.sh/screenshot.jpg)
rm screenshot.jpg
sudo npm i -g @remotion/cli@4.0.102
remotion render https://website-scroller.vercel.app/ --codec=prores --props="{\"url\": \"$SCREENSHOT\", \"duration\": 5}" website.mov
```

## Customize

Fork and customize the `Composition.tsx` file. [Deploy the Remotion Studio](https://www.remotion.dev/docs/studio/deploy-static) for example to Vercel. Replace the URL in the `render` command.

## Commands

**Install Dependencies**

```console
bun i
```

**Start Preview**

```console
bun start
```

**Render video**

```console
bun run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
