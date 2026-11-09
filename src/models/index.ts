let users: {[index:number]: {id:string,username:string}} = { 
1:{
    id: '1',
    username: 'Robin Wieruch',
  },
2: {
    id: '2',
    username: 'Dave Davids',
  },
 }

let messages: {[index:number | string]: {id:string, text:string, userId?:string}} = { 
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
 2:{
    id: '2',
    text: 'By World',
    userId: '2',
  },
 }


 export default {
    messages,
    users
 }