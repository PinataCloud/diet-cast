# DietCast.xyz - A Farcaster Lite Client

DietCast is a lite client for Farcaster that includes a channel feed, auth, and sending casts thanks to the Pinata [Farcaster API](https://docs.pinata.cloud/farcaster/farcaster-api/getting-started) and [Auth](https://docs.pinata.cloud/farcaster/farcaster-auth). To learn more how it works check out the blog post [here](https://www.pinata.cloud/blog/how-to-build-a-lite-client-with-the-pinata-farcaster-api)

This client uses the following tech stacks and packages:

- Next.js 14 App Router w/ Tailwind
- [shadcn/ui](https://ui.shadcn.com/)
- [Farcaster Auth-Kit](https://github.com/farcasterxyz/auth-monorepo)
- [Pinata FDK](https://github.com/PinataCloud/pinata-fdk)

## Getting Started

Clone the repo and `cd` into it, then run `npm install`

For an instant channel lite client, edit the `config/site.config.ts` file with your own information.

```typescript
const siteMeta = {
	title: "Diet Cast", // Name of the website
	description: "The only client more lite than /diet-coke", // Website description
  domain: "www.dietcast.xyz", // Website domain
  websiteUrl: "https://www.dietcast.xyz", // Full website url
  channelUrl: "https://warpcast.com/~/channel/diet-coke", // URL for the farcaster channel
  logo: "/logo.svg" // Location of the logo in the public folder
};

export default siteMeta;
```

Then open the `.env.sample` file and fill in your own variables.

#### ℹ️ If you want to enable auth and sending cats you will need a paid [Pinata account](https://pinata.cloud/pricing)

```
# The JWT provided when creating a Pinata API key
PINATA_JWT=
# The mnemonic phrase for your Farcaster App account, e.g. "taco salsa burgers fries..."
DEVELOPER_MNEMONIC=""
# The FID for your Farcaster App account
DEVELOPER_FID=
```

After replacing with your own variables change the name of the file to `.env.local`. Now run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

Pinata is the best choice for Farcaster and IPFS at scale, check out some of our other resources!

- [Pinata Farcaster Channel](https://warpcast.com/~/channel/pinata)
- [Docs](https://docs.pinata.cloud)
- [Blog/Tutorials](https://pinata.cloud/blog)
