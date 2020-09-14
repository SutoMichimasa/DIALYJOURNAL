//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "このウェブサイトは、自分の日々の出来事を記すための日記として使うことができます。。";
const aboutContent = "使い方は至って単純。まず、ナビゲーションのCOMPOSEをクリックし、日記のタイトル、内容を考え記入します。あとは、HOMEで自分が書いた内容を確認するだけ。早速今日の出来事を日記に書こう！！";
const contactContent = "下の twitter,instagramのアイコンをクリックしてDMを送ってください。";



const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  res.render("home", {
    homeDetail:homeStartingContent,
    posts: posts,
  });
});
app.get("/about", function(req,res) {
  res.render("about", {aboutDetail: aboutContent});
});
app.get("/contact", function(req,res) {
  res.render("contact", {contactDetail: contactContent});
});
app.get("/compose", function(req,res) {
  res.render("compose");
});



app.post("/compose", function(req,res) {
  const post = {
    title: req.body.postTitles,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/")
});

app.get("/posts/:postName",function(req,res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if(requestedTitle === storedTitle) {
      res.render("post" ,{
        title: post.title,
        content: post.content,
        detail: req.params.postName
      });
    }
    })
})


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
