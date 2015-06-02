'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = exports = module.exports = {};

//用户模型
//用户登录，既可以用userName也可以用email或phone
//所以userName或email或phone应该是表内唯一的
//为了防止email或phone number被随便注册，这两个都需要通过认证才可以作为登录名
//email要通过邮件确认
//phone number要通过手机短信确认
//用户的社区属性主要用于激励用户积极使用社区，提升社区活跃程度
var UserRoleSchema = new Schema({
    type: {type: String, enum: ['user', 'orgMember', 'orgOwner', 'admin'], default: 'user'}
});

var UserSchema = new Schema({
    // 基本信息
    uid: {type: String, unique: true, required: true},
    userName: {type: String, unique: true, required: true},
    password: String,
    nickName: String,
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    createOn: {type:Date, default: Date.now},

    role: [UserRoleSchema],
    locked: Boolean, //管理员锁定账号
    // 用户的社区属性
    level: Number,  //等级，通过经验值计算得到    
    points: Number, //经验值    
    coins: Number,  //通过blog活动获取，用于在blog活动消费
});

//会话模型
//用户打开网页时就会创建会话
//用户登录或其他活动，会在会话信息上附加其他信息
var WebSessionSchema = new Schema({
    token: {type: String, unique: true, required: true},
    uid: String,
    userName: String
});


//文章模型
var ArticleSchema = new Schema({
    //创建后不可修改的或由业务逻辑控制修改的
    id: {type: String, unique: true, required: true},
    author: String,         //作者的userid
    createOn: {type:Date, default: Date.now},       //创建日期
    modifyOn: Date,         //最后修改日期
    status: {type: String, enum: ['staged', 'committed', 'locked'], default: 'staged'},
    mark: [String],         //由管理员打的标记，从网站活动中获取
    visits: Number,         //被访问次数

    //可修改的
    title: String,          //文章名
    keywords: [String],     //文章的关键字
    references: [String],   //引用的文章的id
                            //文章可能是本站的文章Id，也可能是其他网站文章的Url
    content: String,        //实际内容，markdown格式
    //附加元素
    topic: String,          //用于首页的分类，topic id
    forks: [String],        //从若干篇文章的副本组合而成，
                            //文章可能是本站的文章Id，也可能是其他网站文章的Url
});

//用户收集的文章集合
var CollectionSchema = new Schema({
    id: {type: String, unique: true, required: true},
    owner: String, //用户id
    name: String,  //集合名
    description: String, //说明
    articles: [String], //文章的ids
});

//评论模型, 评论总是在上一个评论基础上加内容，形成一个队列
var CommentSchema = new Schema({
    id: {type: String, unique: true, required: true},
    author: String,         //作者的userid
    content: String,        //评论内容，markdown格式
    createOn: {type:Date, default: Date.now},       //创建日期
    follow: String,         //上一个comment id
    modifyOn: Date,         //最后修改日期
    locked: Boolean,        //管理员禁用评论
});

//针对一篇文章评论的容器
var CommentsSchema = new Schema({
    id: {type: String, unique: true, required: true},
    commentTo: String,        //评论文章的id
    comments: [CommentSchema],//所有的评论
});

//专题模型，是文章的容器
var SubjectSchema = new Schema({
    id: {type: String, unique: true, required: true},
    creator: String, //uid
    name: String,
    description: String, //说明
    articles: [String], //article id array
    subjects: [String], //subjects id array,子文件夹
    createOn: {type:Date, default: Date.now},
    modifyOn: Date
});

//专题
var TopicSchema = new Schema({
    name: {type: String, unique: true, required: true},
    description: String,
});

//组织模型
var OrgMemberSchema = new Schema({
    memberId: {type: String, unique: true, required: true}, //成员uid
    createSubjectEnabled: Boolean,//组织内写手的权限，还需扩展
    subjectAllowed:[String], //subject ids
});

var OrgSubjectSchema = new Schema({
    subjectId: {type: String, unique: true, required: true}, //id
    own: {type: String, enum: ['private', 'public']},
});

var OrgnizationSchema = new Schema({
    id: {type: String, unique: true, required: true},
    creator: String, //uid
    name: {type: String, unique: true, required: true}, //orgnization name
    createOn: {type:Date, default: Date.now},       //创建日期
    members: [OrgMemberSchema],
    subjects: [String], //id
});

//网站事件,包括页面访问和api调用
var EventSchema = new Schema({
    userId: String, //可能会有匿名访问发生，此项就会为空
    code: String,   //每种不同的访问会对应到唯一的代码
    emitOn: {type: Date, default: Date.now}, //发生时间
});

//表
model.UserModel = mongoose.model('iblog.users', UserSchema);
model.WebSessionModel = mongoose.model('iblog.websession', WebSessionSchema);
model.ArticleModel = mongoose.model('iblog.articles', ArticleSchema);//
model.CollectionModel = mongoose.model('iblog.collecions', CollectionSchema);
model.CommentModel = mongoose.model('iblog.comments', CommentsSchema);
model.SubjectModel = mongoose.model('iblog.subjects', SubjectSchema);
model.TopicModel = mongoose.model('iblog.topics', TopicSchema);
model.OrgnizationModel = mongoose.model('iblog.orgs', OrgnizationSchema);
model.EventModel = mongoose.model('iblog.events', EventSchema);