This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Press_Start_2P, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

This app has been deployed on Vercel, and is tracking performance data with the use of [Vercel's SpeedInsights](https://vercel.com/docs/speed-insights/quickstart#add-the-speedinsights-component-to-your-app)

---

## Run dockerized image

You need to build first the docker image of the app `rpgdm`.

Once this has been done, assuming it will run on port number 3000, it needs to run with the environmental variables for the custom APIs to work.

This can be done by running the following command

```bash
docker run -p 3000:3000 --env-file .env rpgdm
```

Make sure to include all required variables on your .env file in the root folder.
