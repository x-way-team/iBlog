'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@localhost/iblogdb');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Users = new Schema({
    uid: ObjectId
  , userName: String
  , password: String
  , status: Boolean
  , createDate: Date
});