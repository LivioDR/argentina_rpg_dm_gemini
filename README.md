# TermoArgenta RPG

TermoArgenta RPG is a [Next.js](https://nextjs.org/) application developed by Livio Reinoso and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies

This RPG takes advantage of Gemini-1.5-Flash generative-AI capabilities to act as a Dungeon Master to guide the user's campaign and provide real-time interactive choices based on the user's input to move the story forward.

The Authentication of users and their game logs are being managed with [Firebase](https://firebase.google.com/).

A loading spinner has been added to the Display component. This spinner is part of the [react-spinners library](https://www.npmjs.com/package/react-spinners)

## Getting Started locally

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

## Deployment

This Next App has been deployed on Vercel, through the built-in CI/CD pipeline with this [GitHub repository](https://github.com/LivioDR/argentina_rpg_dm_gemini).

---

## Run dockerized image locally

You need to build first the docker image of the app `rpgdm`.

Once this has been done, assuming it will run on port number 3000, it needs to run with the environmental variables for the custom APIs to work.

This can be done by running the following command

```bash
docker run -p 3000:3000 --env-file .env rpgdm
```

Make sure to include all required variables on your .env file in the root folder.

---

## Disclaimer & acknowledgement 

This app was created only with educational purposes.

Icosahedron icons created by [Freepik - Flaticon](https://www.flaticon.com/free-icons/icosahedron)

Background image generated by [Bing Image Generator](https://www.bing.com/images/create)