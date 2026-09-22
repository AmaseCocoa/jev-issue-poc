import { z } from 'zod'

import rawConfig from '../config.json';

const envSchema = z.object({
  ENABLED: z.enum(['true', 'false']).transform((value) => value === 'true').default(true),
  
  JEV_TOKEN: z.string(),

  APP_ID: z.coerce.number().int(),
  APP_INSTALLATION_ID: z.coerce.number().int(),
  APP_PRIVATE_KEY: z.string(),

  GITHUB_REPO: z.string(),
  GITHUB_REPO_OWNER: z.string(),

  GITHUB_ISSUE: z.coerce.number().int(),

  ISSUE_TITLE: z.string(),
  ISSUE_BODY: z.string(),

  config: z.object({
    priority: z.object({
        low: z.string().default("priority: low"),
        middle: z.string().default("priority: middle"),
        high: z.string().default("priority: high")
    }),
    category: z.object({
        bug: z.string().default("bug"),
        documentation: z.string().default("documentation"),
        features: z.string().default("features")
    })
  })
})

const parsedEnv = envSchema.safeParse({
  ENABLED: process.env.ENABLED,

  JEV_TOKEN: process.env.JEV_TOKEN,

  APP_ID: process.env.APP_ID,
  APP_INSTALLATION_ID: process.env.APP_INSTALLATION_ID,
  APP_PRIVATE_KEY: process.env.APP_PRIVATE_KEY,


  GITHUB_REPO: process.env.GITHUB_REPO,
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,

  GITHUB_ISSUE: process.env.GITHUB_ISSUE,

  ISSUE_TITLE: process.env.ISSUE_TITLE,
  ISSUE_BODY: process.env.ISSUE_BODY,

  config: rawConfig
})

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
