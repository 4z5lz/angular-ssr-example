# Angular Server Side Rendering Workshop

## Branch: 7-ssr-deploy

**Added serverless framework and added support for deployemnt to AWS lambda**

### Prerequisites
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
