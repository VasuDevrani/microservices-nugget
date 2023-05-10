# 🛒Cart Shop
### Event driven microservice with tech blend and CI-CD
> ⚠️ API is not functional right now, to pause the billing of AWS services, but it works

</br>

<img src="https://user-images.githubusercontent.com/101383635/235835542-ca1ff6df-8516-49a0-ac4a-e779ccd9c48b.png" width=700/>
<img src="https://user-images.githubusercontent.com/101383635/236002694-81b05db8-4423-4d9e-ac18-0aa2338729d8.png" width=700/>



## Build details

```yaml
Structure :
  - event driven microservices architecture
  - 3 layer application design
  - loosely coupled microservices
  - database per service
  - RPC and Pub/Sub using Message Broker
  
CI-CD:
  - github actions
  - AWS Elastic Beanstalk
  - Docker-Nodejs environment
  
Tech :
  - Language : typescript
  - App environment : Nodejs
  - Proxy : Nginx
  - Databases : Mongodb and MySQL
  - ORMs : Mongoose and Prisma
  - Containerization : docker, docker-compose
  - EsLint-Prettier-Husky
  - Nodejs best practices
  - Message Broker : RabbitMQ (ampqCloud)
  - RPC and Pub/Sub
  - Jest-Supertest testing (integration only)
  - npm and yarn
  - JWT
  - Error handling
    - Programmer error : Error class and middleware
    - Operational error : [Sentry.io]
 - API tested using Postman

Services :
  - Mysql
  - Mongodb
  - Nginx Proxy
  - application
    - Customer
    - Products
    - Shopping
  - Rabbitmq (cloud)
```

## Run
- git clone `https://github.com/VasuDevrani/cartshop-mcr-svr.git`
- `docker-compose up`
- wait for all services to start

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24770121-448496c5-1d77-4e4c-898c-39da577c3b6a?action=collection%2Ffork&collection-url=entityId%3D24770121-448496c5-1d77-4e4c-898c-39da577c3b6a%26entityType%3Dcollection%26workspaceId%3D1a3ab5e7-5690-4728-a316-dec972dadd6f)
