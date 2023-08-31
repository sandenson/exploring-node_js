const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
const helper = require('../../../helper');
const db = require('../../../../server/lib/db')

const { config } = helper;
const { UserModel } = helper;

const initApp = require('../../../../server/app');

describe('The /users/registration route', () => {
  let app;

  before(async () => {
    await db.connect(config.database.dsn)
    app = initApp(config)
  })

  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it('should deny uploading a wrong file format', async () => {
    const agent = chai.request.agent(app);
    const res = await agent
      .post('/users/registration')
      .field('username', helper.validUser.username)
      .field('email', helper.validUser.email)
      .field('password', helper.validUser.password)
      .attach('avatar', fs.readFileSync(path.resolve(`${__dirname}/../../../helper/invalid_format.doc`)), 'avatar.doc');
    res.should.have.status(500);
  });
  it('should deny handling too large files', async () => {
    const agent = chai.request.agent(app);
    const res = await agent
      .post('/users/registration')
      .field('username', helper.validUser.username)
      .field('email', helper.validUser.email)
      .field('password', helper.validUser.password)
      .attach('avatar', fs.readFileSync(path.resolve(`${__dirname}/../../../helper/too_large.jpg`)), 'avatar.jpg');
    res.should.have.status(500);
  });
  it('should process JPGs', async () => {
    const agent = chai.request.agent(app);
    const res = await agent
      .post('/users/registration')
      .field('username', helper.validUser.username)
      .field('email', helper.validUser.email)
      .field('password', helper.validUser.password)
      .attach('avatar', fs.readFileSync(path.resolve(`${__dirname}/../../../helper/valid_jpg.jpg`)), 'avatar.jpg');
    res.should.have.status(200);
  });
  it('should process PNGs', async () => {
    const agent = chai.request.agent(app);
    const res = await agent
      .post('/users/registration')
      .field('username', helper.validUser.username)
      .field('email', helper.validUser.email)
      .field('password', helper.validUser.password)
      .attach('avatar', fs.readFileSync(path.resolve(`${__dirname}/../../../helper/valid_png.png`)), 'avatar.png');
    const user = await UserModel.findOne({ email: helper.validUser.email });
    expect(user).to.be.an.instanceOf(UserModel);
    res.should.have.status(200);
  });
});
