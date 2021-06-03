# Server-Side Rendering Example based on Angular Universal  

## Master branch is a final solution that contains fully worked development and production SSR examples, includes tips for SEO improvements  
Follow branches from the first to the latest, to learn how to upgrade CSR (client-side rendering) application to SSR (server-side rendering). 

### Prerequisites
- Install all dependencies
```bash
npm install
```

- Run development SSR app
```bash
npm run dev:ssr
```

or 

- Run production ready SSR app
```bash
npm run build:ssr && npm run serve:ssr
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