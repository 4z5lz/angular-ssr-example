# Server-Side Rendering Example based on Angular Universal, includes tips for SEO improvements  
## Why Use Server-Side Rendering?
- Improve Search Engine Optimization (SEO) and ready for Social Media sharing
- Show the first page quickly
- Improve performance for low-powered devices

### Prerequisites
Install all dependencies
```bash
npm install
```

### Run application in classic SPA mode (client-side rendering, aka CSR):
Development of SPA apps with Dev Server
```bash
npm start
```

or 

Run production ready CSR app
```bash
npm run demo-csr
```

### Run application in SSR mode:

Development of SSR apps with Dev Server
```bash
npm run dev:ssr
```

or 

Run production ready SSR app
```bash
npm run build:ssr && npm run serve:ssr
```

### Angular Universal allows prerender web pages
It allows to cache pages as static files, which can then be served to the client via CDN or a simple server
```bash
npm run prerender
```

### For deployment, you can publish SSR app to Amazon Lambda
- You need active AWS account (Free tier is enough)
- Install AWS CLI
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
- Configure the access id and secret key for AWS. Run:
```bash
aws configure 
```

Build application and create package for Lambda:
```bash
npm run build:sls
```

Deploy to AWS Labmda:
```bash
npm run deploy:sls
```

Finaly, you should see your app published, like:
https://wzu32gvx3b.execute-api.us-east-1.amazonaws.com/production/
or
https://d1zys4h7ryi3cv.cloudfront.net/production/ 