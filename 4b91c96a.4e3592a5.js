(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{67:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return r})),a.d(t,"metadata",(function(){return n})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return l}));var o=a(2),i=a(6),c=(a(0),a(89)),r={id:"doc4",title:"Module Creation"},n={unversionedId:"doc4",id:"doc4",isDocsHomePage:!1,title:"Module Creation",description:"Modules",source:"@site/docs/doc4.md",permalink:"/rehabjs/docs/doc4",editUrl:"https://github.com/wix-incubator/rehabjs/edit/master/website/docs/doc4.md",sidebar:"someSidebar",previous:{title:"Motivation",permalink:"/rehabjs/docs/doc3"}},s=[{value:"Modules",id:"modules",children:[]},{value:"Creating a mock class",id:"creating-a-mock-class",children:[]},{value:"Actions Generator",id:"actions-generator",children:[]},{value:"Collecting effects",id:"collecting-effects",children:[]},{value:"Clearing",id:"clearing",children:[]}],b={rightToc:s};function l(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(c.b)("wrapper",Object(o.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"modules"},"Modules"),Object(c.b)("p",null,"First thing you need to do in your module, for example ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js"}),"react-native-navigation")," is to add mocks to all imports from the module which you want to test, you can do it using ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://jestjs.io/docs/en/mock-functions"}),"jest mock")," like it is done here ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L5"}),"react-native-navigation"),"."),Object(c.b)("hr",null),Object(c.b)("h2",{id:"creating-a-mock-class"},"Creating a mock class"),Object(c.b)("p",null,"Then when you are creating a class, for example ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L13"}),"React Native Navigation Module")," you do need to initialize screen object in which you will record all the arguments with which mock implementations of your methods were called ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L19"}),"screenObj"),". Then you will create a void implementation of your methods, but don't forget also to add a record to your screen object of parameters with which your methods were called ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L28"})),"."),Object(c.b)("hr",null),Object(c.b)("h2",{id:"actions-generator"},"Actions Generator"),Object(c.b)("p",null,"Action generator give you few methods that extends your driver, for example for ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L64"}),"React Native Navigation Module")," you will have few additional methods ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L66"}),"tap"),", ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L69"}),"inspectScreen"),", ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L72"}),"closeScreen"),"."),Object(c.b)("hr",null),Object(c.b)("h2",{id:"collecting-effects"},"Collecting effects"),Object(c.b)("p",null,"The collecting effects method will be called at the end of every test and will provide you an array of log items for your methods calls. At first you need to specify your own key for using in collectEffects methods ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L15"}),"keyExample"),", then you will need to implement collectEffects method, and it can be implemented differently depending on a module that you are testing. Here we have an examples for ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/react-native-navigation.js#L77"}),"react-native-navigation"),", ",Object(c.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rehabjs/blob/master/src/modules/fetch.js#L33"}),"fetch"),"."),Object(c.b)("hr",null),Object(c.b)("h2",{id:"clearing"},"Clearing"),Object(c.b)("p",null,"Please don't forget to clear your screen object at the end of the collect effects method."))}l.isMDXComponent=!0}}]);